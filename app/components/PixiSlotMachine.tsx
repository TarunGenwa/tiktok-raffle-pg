'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as PIXI from 'pixi.js';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
  imageUrl?: string;
}

interface PixiSlotMachineProps {
  prizes: Prize[];
  numberOfReels: number;
  onSpinComplete?: (wonPrizes: Prize[]) => void;
  onSpinStart?: () => void;
}

export interface PixiSlotMachineRef {
  spin: () => void;
  reset: () => void;
}

const SYMBOL_SIZE = 100;
const SYMBOL_GAP = 10;

const PixiSlotMachine = forwardRef<PixiSlotMachineRef, PixiSlotMachineProps>(
  ({ prizes, numberOfReels, onSpinComplete, onSpinStart }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);
    const reelsRef = useRef<any[]>([]);
    const tweening = useRef<any[]>([]);
    const [isReady, setIsReady] = useState(false);
    const runningRef = useRef(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const tickingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Expose spin and reset methods
    useImperativeHandle(ref, () => ({
      spin: handleSpin,
      reset: handleReset,
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      let isMounted = true;

      // Initialize Pixi Application
      const initApp = async () => {
        const app = new PIXI.Application();

        const containerWidth = containerRef.current?.clientWidth || 600;
        const rowHeight = SYMBOL_SIZE + SYMBOL_GAP;
        const totalHeight = numberOfReels * rowHeight + 40;

        await app.init({
          background: 'transparent',
          width: containerWidth,
          height: totalHeight,
          antialias: true,
        });

        if (!isMounted || !containerRef.current) {
          app.destroy(true);
          return;
        }

        containerRef.current.appendChild(app.canvas);
        appRef.current = app;

        // Now load assets and initialize
        await loadAssets(app);
      };

      initApp();

      // Load prize images
      const loadAssets = async (app: PIXI.Application) => {
        const imagesToLoad = prizes
          .filter(p => p.imageUrl)
          .map(p => p.imageUrl as string);

        if (imagesToLoad.length > 0) {
          try {
            await Promise.all(
              imagesToLoad.map(url => PIXI.Assets.load(url))
            );
          } catch (error) {
            console.error('Error loading assets:', error);
          }
        }

        if (!isMounted) return;
        initializeSlotMachine(app);
      };

      const initializeSlotMachine = (app: PIXI.Application) => {
        if (!app) return;

        const slotTextures = prizes.map(prize => {
          if (prize.imageUrl) {
            return PIXI.Texture.from(prize.imageUrl);
          } else {
            // Create a simple colored rectangle as fallback
            const graphics = new PIXI.Graphics();
            const color = getRarityColor(prize.rarity);
            graphics.beginFill(color);
            graphics.drawRoundedRect(0, 0, SYMBOL_SIZE, SYMBOL_SIZE, 10);
            graphics.endFill();
            return app.renderer.generateTexture(graphics);
          }
        });

        // Build the horizontal reels (rows)
        const reels: any[] = [];
        const reelContainer = new PIXI.Container();

        const rowHeight = SYMBOL_SIZE + SYMBOL_GAP;

        for (let i = 0; i < numberOfReels; i++) {
          const rc = new PIXI.Container();
          rc.y = i * rowHeight + 20; // Position each row vertically
          reelContainer.addChild(rc);

          const reel = {
            container: rc,
            symbols: [] as PIXI.Sprite[],
            position: 2, // Start at 3rd symbol (0-indexed) for centered feel
            previousPosition: 2,
            blur: new PIXI.BlurFilter(),
          };

          reel.blur.blurX = 0;
          reel.blur.blurY = 0;
          rc.filters = [reel.blur];

          // Build many symbols horizontally for smooth scrolling (50 repetitions)
          const totalSymbols = 50 * prizes.length;
          for (let j = 0; j < totalSymbols; j++) {
            const symbol = new PIXI.Sprite(
              slotTextures[j % prizes.length]
            );
            symbol.x = j * (SYMBOL_SIZE + SYMBOL_GAP);
            symbol.scale.x = symbol.scale.y = Math.min(
              SYMBOL_SIZE / symbol.width,
              SYMBOL_SIZE / symbol.height
            );
            symbol.y = Math.round((SYMBOL_SIZE - symbol.height) / 2);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
          }
          reels.push(reel);
        }

        app.stage.addChild(reelContainer);
        reelsRef.current = reels;

        // Create center selection indicators for each row
        const centerX = app.screen.width / 2;
        const selectionIndicators: PIXI.Graphics[] = [];

        for (let i = 0; i < numberOfReels; i++) {
          const indicator = new PIXI.Graphics();
          const y = i * rowHeight + 20;

          // Draw selection box in center
          indicator.rect(
            centerX - SYMBOL_SIZE / 2 - 5,
            y - 5,
            SYMBOL_SIZE + 10,
            SYMBOL_SIZE + 10
          );
          indicator.stroke({ width: 3, color: 0xFFFFFF, alpha: 0.5 });

          app.stage.addChild(indicator);
          selectionIndicators.push(indicator);
        }

        // Store for later use in highlighting winners
        (reelContainer as any).selectionIndicators = selectionIndicators;

        // Create edge fade effects using simple rectangles
        const fadeWidth = 60;

        const leftFade = new PIXI.Graphics();
        leftFade.rect(0, 0, fadeWidth, app.screen.height);
        leftFade.fill({ color: 0x000000, alpha: 0.7 });

        const rightFade = new PIXI.Graphics();
        rightFade.rect(app.screen.width - fadeWidth, 0, fadeWidth, app.screen.height);
        rightFade.fill({ color: 0x000000, alpha: 0.7 });

        app.stage.addChild(leftFade);
        app.stage.addChild(rightFade);

        // Function to update reel positions
        const updateReelPositions = () => {
          for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const symbolWidth = SYMBOL_SIZE + SYMBOL_GAP;
            const centerX = app.screen.width / 2;
            const centerOffset = centerX - (SYMBOL_SIZE / 2);
            r.container.x = -r.position * symbolWidth + centerOffset;
          }
        };

        // Initial positioning
        updateReelPositions();

        // Listen for animate update
        app.ticker.add(() => {
          // Update the slots (horizontal scrolling)
          for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            // Horizontal blur based on movement
            r.blur.blurX = Math.abs(r.position - r.previousPosition) * 8;
            r.blur.blurY = 0;
            r.previousPosition = r.position;
          }

          // Update positions
          updateReelPositions();

          // Update tweening
          const now = Date.now();
          const remove: any[] = [];

          for (let i = 0; i < tweening.current.length; i++) {
            const t = tweening.current[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
              t.object[t.property] = t.target;
              if (t.complete) t.complete(t);
              remove.push(t);
            }
          }

          for (let i = 0; i < remove.length; i++) {
            tweening.current.splice(tweening.current.indexOf(remove[i]), 1);
          }
        });

        setIsReady(true);
      };

      // Cleanup
      return () => {
        isMounted = false;
        stopTickingSound();
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (appRef.current) {
          appRef.current.destroy(true);
          appRef.current = null;
        }
      };
    }, [numberOfReels, prizes]);

    // Generate ticking sound using Web Audio API
    const playTickingSound = () => {
      // Initialize audio context if not already created
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const tickInterval = 50; // Tick every 50ms for fast ticking sound

      const playTick = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800; // Higher pitch for tick sound
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.02);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.02);
      };

      // Clear any existing interval
      if (tickingIntervalRef.current) {
        clearInterval(tickingIntervalRef.current);
      }

      // Play tick sound repeatedly
      tickingIntervalRef.current = setInterval(playTick, tickInterval);
    };

    const stopTickingSound = () => {
      if (tickingIntervalRef.current) {
        clearInterval(tickingIntervalRef.current);
        tickingIntervalRef.current = null;
      }
    };

    const playStopSound = () => {
      // Initialize audio context if not already created
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // Create a punchy "thud" sound using multiple frequencies
      const playPunchySound = () => {
        // Low frequency for the "thud"
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Start with a low frequency for punch
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        // Drop to even lower for impact
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
        oscillator.type = 'sine';

        // Punchy envelope - quick attack and decay
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);

        // Add a higher frequency click for the "snap"
        const clickOsc = audioContext.createOscillator();
        const clickGain = audioContext.createGain();

        clickOsc.connect(clickGain);
        clickGain.connect(audioContext.destination);

        clickOsc.frequency.value = 1200;
        clickOsc.type = 'square';

        clickGain.gain.setValueAtTime(0.15, audioContext.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);

        clickOsc.start(audioContext.currentTime);
        clickOsc.stop(audioContext.currentTime + 0.03);
      };

      playPunchySound();
    };

    const getRarityColor = (rarity: string): number => {
      switch (rarity) {
        case 'common': return 0x6B7280; // gray
        case 'rare': return 0x3B82F6; // blue
        case 'epic': return 0x9333EA; // purple
        case 'legendary': return 0xF59E0B; // orange/gold
        default: return 0x6B7280;
      }
    };

    const handleSpin = () => {
      if (runningRef.current || !isReady) return;
      runningRef.current = true;

      if (onSpinStart) onSpinStart();

      // Play ticking sound
      playTickingSound();

      const reels = reelsRef.current;
      const selectedPrizes: Prize[] = [];

      // Reset indicators to normal state
      const indicators = (reels[0]?.container.parent as any)?.selectionIndicators;
      if (indicators && appRef.current) {
        const centerX = appRef.current.screen.width / 2;
        const rowHeight = SYMBOL_SIZE + SYMBOL_GAP;
        indicators.forEach((indicator: PIXI.Graphics, index: number) => {
          indicator.clear();
          const y = index * rowHeight + 20;

          indicator.rect(
            centerX - SYMBOL_SIZE / 2 - 5,
            y - 5,
            SYMBOL_SIZE + 10,
            SYMBOL_SIZE + 10
          );
          indicator.stroke({ width: 3, color: 0xFFFFFF, alpha: 0.5 });
        });
      }

      // Select a prize for each reel
      const selectPrize = () => {
        const random = Math.random() * 100;
        let cumulative = 0;
        for (const prize of prizes) {
          cumulative += prize.probability;
          if (random <= cumulative) {
            return prize;
          }
        }
        return prizes[0];
      };

      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const prize = selectPrize();
        selectedPrizes.push(prize);

        // Calculate target position for horizontal scrolling
        const prizeIndex = prizes.indexOf(prize);
        const baseSpins = 10 + i * 2; // Base number of full cycles
        const extra = Math.floor(Math.random() * 3);

        // Target position should land on the winning prize
        // Add enough spins to make it dramatic + land on specific prize
        // Account for starting position of 2
        const target = 2 + baseSpins * prizes.length + prizeIndex;
        const time = 2500 + i * 300 + extra * 300;

        tweenTo(
          r,
          'position',
          target,
          time,
          backout(0.5),
          null,
          i === reels.length - 1
            ? () => {
                stopTickingSound();
                playStopSound(); // Single stop sound at the end
                runningRef.current = false;
                highlightWinners(selectedPrizes);
                if (onSpinComplete) onSpinComplete(selectedPrizes);
              }
            : null
        );
      }
    };

    const highlightWinners = (selectedPrizes: Prize[]) => {
      const reels = reelsRef.current;
      const indicators = (reels[0]?.container.parent as any)?.selectionIndicators;

      if (!indicators || !appRef.current) return;

      const centerX = appRef.current.screen.width / 2;
      const rowHeight = SYMBOL_SIZE + SYMBOL_GAP;

      selectedPrizes.forEach((prize, index) => {
        const indicator = indicators[index];
        if (indicator) {
          indicator.clear();
          const y = index * rowHeight + 20;

          // Irish green for all highlights
          const glowColor = 0x009A49; // Irish green

          // Draw outer glow
          indicator.rect(
            centerX - SYMBOL_SIZE / 2 - 8,
            y - 8,
            SYMBOL_SIZE + 16,
            SYMBOL_SIZE + 16
          );
          indicator.stroke({ width: 2, color: glowColor, alpha: 0.5 });

          // Draw main selection box on top
          indicator.rect(
            centerX - SYMBOL_SIZE / 2 - 5,
            y - 5,
            SYMBOL_SIZE + 10,
            SYMBOL_SIZE + 10
          );
          indicator.stroke({ width: 4, color: glowColor, alpha: 1 });
        }
      });
    };

    const handleReset = () => {
      const reels = reelsRef.current;
      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        r.position = 2; // Reset to 3rd symbol
        r.previousPosition = 2;
      }

      // Reset indicators to normal state
      const indicators = (reels[0]?.container.parent as any)?.selectionIndicators;
      if (indicators && appRef.current) {
        const centerX = appRef.current.screen.width / 2;
        const rowHeight = SYMBOL_SIZE + SYMBOL_GAP;
        indicators.forEach((indicator: PIXI.Graphics, index: number) => {
          indicator.clear();
          const y = index * rowHeight + 20;

          indicator.rect(
            centerX - SYMBOL_SIZE / 2 - 5,
            y - 5,
            SYMBOL_SIZE + 10,
            SYMBOL_SIZE + 10
          );
          indicator.stroke({ width: 3, color: 0xFFFFFF, alpha: 0.5 });
        });
      }

      tweening.current = [];
      runningRef.current = false;
    };

    const tweenTo = (
      object: any,
      property: string,
      target: number,
      time: number,
      easing: (t: number) => number,
      onchange: any,
      oncomplete: any
    ) => {
      const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
      };

      tweening.current.push(tween);
      return tween;
    };

    const lerp = (a1: number, a2: number, t: number) => {
      return a1 * (1 - t) + a2 * t;
    };

    const backout = (amount: number) => {
      return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
    };

    return (
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center"
        style={{ minHeight: numberOfReels * (SYMBOL_SIZE + SYMBOL_GAP) + 40 }}
      />
    );
  }
);

PixiSlotMachine.displayName = 'PixiSlotMachine';

export default PixiSlotMachine;
