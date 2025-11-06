'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
  imageUrl?: string;
}

interface BulkPrize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image?: string;
}

interface PrizeWheelProps {
  prizes: Prize[];
  onClose: () => void;
  competitionTitle: string;
  isInline?: boolean;
  hideCloseButton?: boolean;
  numberOfTickets?: number;
  totalTickets?: number;
  onBulkPrizesGenerated?: (prizes: BulkPrize[]) => void;
  hideSpinButton?: boolean;
  onSpinTrigger?: (spinFn: () => void) => void;
}

export default function PrizeWheel({
  prizes,
  onClose,
  competitionTitle,
  isInline = false,
  hideCloseButton = false,
  numberOfTickets = 5,
  totalTickets,
  onBulkPrizesGenerated,
  hideSpinButton = false,
  onSpinTrigger
}: PrizeWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrizes, setWonPrizes] = useState<Prize[] | null>(null);
  // Always maintain 5 offsets, only use first numberOfTickets
  const [rowOffsets, setRowOffsets] = useState([0, 0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Always create 5 refs (maximum), but only use the first numberOfTickets
  const rowRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tickingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    // Cleanup on unmount
    return () => {
      stopTickingSound();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Expose spin trigger to parent (update when numberOfTickets changes)
  useEffect(() => {
    if (onSpinTrigger) {
      onSpinTrigger(handleSpin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfTickets, onSpinTrigger]);

  // Reset when numberOfTickets changes
  useEffect(() => {
    setWonPrizes(null);
    setRowOffsets([0, 0, 0, 0, 0]);
  }, [numberOfTickets]);

  const rarityGradients = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-600'
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrizes(null);

    // Play ticking sound
    playTickingSound();

    // Select prizes based on probability (one for each row)
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

    // If bulk mode (totalTickets > 5), generate all prizes but only show 1 row
    const ticketsToGenerate = totalTickets && totalTickets > 5 ? totalTickets : numberOfTickets;
    const allSelectedPrizes = Array(ticketsToGenerate).fill(null).map(() => selectPrize());

    // For display, only show first row in bulk mode
    const selectedPrizes = totalTickets && totalTickets > 5 ? [allSelectedPrizes[0]] : allSelectedPrizes;

    // Calculate positions for each row to land on its specific winning prize
    // Updated widths for full-width horizontal design (card width + gap)
    const prizeWidth = isInline ? 85 + 8 : 100 + 8; // Width of each prize card + 8px gap (average of responsive widths)
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 16 : 400; // Full viewport width minus 8px padding on each side
    const repetitions = 50; // Repetitions for smooth circular loop

    // Create different spin amounts for each row (staggered stopping)
    const displayRows = selectedPrizes.length; // Number of rows to display (1 in bulk mode, numberOfTickets in normal mode)
    const newOffsets = rowRefs.slice(0, displayRows).map((_, rowIndex) => {
      const selectedPrize = selectedPrizes[rowIndex];
      const prizeIndex = prizes.indexOf(selectedPrize);

      // Base spins: 10-15 full rotations for dramatic effect
      const baseSpins = 10 + rowIndex * 1.5;
      // Land on a prize in the middle repetitions
      const landingPosition = (repetitions / 2) * prizes.length + prizeIndex;

      // Center the winning prize in the selection indicator
      const centeringOffset = containerWidth / 2 - prizeWidth / 2;
      const totalOffset = (baseSpins * prizes.length + landingPosition) * prizeWidth - centeringOffset;

      return totalOffset;
    });

    // Pad with zeros to always have 5 elements
    const paddedOffsets = [...newOffsets, ...Array(5 - displayRows).fill(0)];
    setRowOffsets(paddedOffsets);

    // Staggered completion times for rows (2.5s base + 0.3s per row for smoother effect)
    const stopTimes = Array(selectedPrizes.length).fill(0).map((_, i) => 2500 + i * 300);

    // Stop ticking sound after last row stops
    setTimeout(() => {
      stopTickingSound();
    }, stopTimes[stopTimes.length - 1]);

    // Show result after last row stops
    setTimeout(() => {
      setIsSpinning(false);

      // If in bulk mode, call the callback with all prizes
      if (totalTickets && totalTickets > 5 && onBulkPrizesGenerated) {
        const bulkPrizes: BulkPrize[] = allSelectedPrizes.map(prize => ({
          name: prize.name,
          rarity: prize.rarity,
          image: prize.imageUrl
        }));
        onBulkPrizesGenerated(bulkPrizes);
      } else {
        // Normal mode: show prizes in place
        setWonPrizes(selectedPrizes);
      }
    }, stopTimes[stopTimes.length - 1] + 500);
  };

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

  const handlePlayAgain = () => {
    setWonPrizes(null);
    setRowOffsets([0, 0, 0, 0, 0]);
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`${hideCloseButton ? 'relative w-full h-full' : isInline ? 'relative w-full h-full' : 'fixed inset-0 z-50'} ${hideCloseButton ? 'bg-transparent' : 'bg-black/95 backdrop-blur-md'} flex items-center justify-center ${hideCloseButton ? 'p-0' : 'p-4'} transition-all duration-300 ${
        isVisible && !isExiting ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Close Button */}
      {!hideCloseButton && (
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 z-10 ${
            isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Show slot machine or prizes based on state */}
      {!wonPrizes ? (
        // Slot machine
        <div
          className={`flex flex-col items-center ${isInline ? 'space-y-2 sm:space-y-3 md:space-y-4' : 'space-y-4 sm:space-y-6 md:space-y-8'} w-full px-2 transition-all duration-500 ${
            isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Horizontal Spinner Container - Native Feel */}
          <div
            className={`relative w-full flex justify-center transition-all duration-500 delay-200 ${
              isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Horizontal Spinner Rows */}
            <div className={`flex flex-col ${isInline ? 'gap-3 sm:gap-4' : 'gap-4 sm:gap-5'} relative w-full`}>
                {rowRefs.slice(0, totalTickets && totalTickets > 5 ? 1 : numberOfTickets).map((ref, rowIndex) => (
                  <div key={rowIndex} className="flex-1 flex justify-center">
                    {/* Horizontal Strip Container - Full Width */}
                    <div className="w-full overflow-hidden relative">
                      {/* Edge fade effects */}
                      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

                      {/* Scrolling Strip */}
                      <div
                        ref={ref}
                        className="relative flex items-center gap-2"
                        style={{
                          transform: `translateX(-${rowOffsets[rowIndex]}px)`,
                          transition: isSpinning
                            ? `transform ${2.5 + rowIndex * 0.3}s cubic-bezier(0.17, 0.67, 0.35, 0.99)`
                            : 'none',
                          filter: isSpinning ? 'blur(1px)' : 'none',
                        }}
                      >
                        {/* Repeat prizes 50 times for smooth scrolling */}
                        {(Array(50).fill(prizes).flat() as Prize[]).map((prize, idx) => (
                          <div
                            key={idx}
                            className={`${isInline ? 'w-[75px] xs:w-[85px] sm:w-[95px]' : 'w-[85px] sm:w-[100px] md:w-[125px]'} ${isInline ? 'h-[75px] xs:h-[85px] sm:h-[95px]' : 'h-[85px] sm:h-[100px] md:h-[125px]'} flex-shrink-0 flex items-center justify-center relative`}
                          >
                            {/* Prize card - Minimal design */}
                            <div className={`w-full h-full bg-gradient-to-br ${rarityGradients[prize.rarity]} rounded-xl ${isInline ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-3'} shadow-2xl transition-all`}>
                              {prize.imageUrl ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <img
                                    src={prize.imageUrl}
                                    alt={prize.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                  <div className={`text-white font-bold ${isInline ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs'} text-center leading-tight mb-1`}>{prize.name}</div>
                                  <div className={`${isInline ? 'text-[7px] sm:text-[8px]' : 'text-[8px] sm:text-[9px]'} text-white/70 capitalize px-1 py-0.5 bg-black/30 rounded`}>{prize.rarity}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Spin Button - Conditionally hidden */}
          {!hideSpinButton && (
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              size="lg"
              className={`relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 hover:from-emerald-400 hover:via-green-400 hover:to-lime-400 text-white font-bold ${isInline ? 'text-sm sm:text-base px-6 sm:px-12 py-3 sm:py-4' : 'text-base sm:text-lg md:text-xl px-8 sm:px-16 md:px-20 py-4 sm:py-5 md:py-6'} rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] transform transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 duration-500 delay-300 border-2 border-white/20 ${
                isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

              <span className="relative flex items-center gap-2">
                {isSpinning ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SPINNING...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    SPIN NOW
                  </>
                )}
              </span>
            </Button>
          )}

          {/* Prize List - Hide in inline mode to save space */}
          {!isInline && (
            <div
              className={`w-full max-w-3xl px-4 transition-all duration-500 delay-[400ms] ${
                isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wide text-center mb-2 sm:mb-3">All Prizes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {prizes.map((prize, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-gray-700 transition-all hover:scale-105 hover:bg-gray-800/70"
                >
                  <div className="text-xs sm:text-sm font-medium text-white truncate">{prize.name}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 capitalize">{prize.rarity} • {prize.probability}%</div>
                </div>
              ))}
            </div>
            </div>
          )}
        </div>
      ) : (
        // Prizes Display - In place of slot machine
        <div
          className={`flex flex-col items-center ${isInline ? 'space-y-2 sm:space-y-3 md:space-y-4' : 'space-y-4 sm:space-y-6 md:space-y-8'} w-full px-2 transition-all duration-500`}
        >
          {/* Celebration Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          {/* Winner Content */}
          <div className={`relative z-10 text-center ${isInline ? 'space-y-3 sm:space-y-4' : 'space-y-4 sm:space-y-6'}`}>
            <h2 className={`${isInline ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-white animate-[bounceIn_0.6s_ease-out]`}>
              🎉 YOU WON {wonPrizes.length} PRIZE{wonPrizes.length !== 1 ? 'S' : ''}! 🎉
            </h2>

            {/* Prizes Display */}
            <div className={`flex flex-wrap justify-center ${isInline ? 'gap-3' : 'gap-3 sm:gap-4'} w-full`}>
              {wonPrizes.map((prize, index) => (
                <div
                  key={index}
                  className={`relative ${isInline ? 'p-3 sm:p-4' : 'p-3 sm:p-4'} bg-gradient-to-br ${rarityGradients[prize.rarity]} rounded-xl sm:rounded-2xl shadow-xl border-2 border-white/30 transform hover:scale-105 transition-all ${isInline ? 'w-[120px] sm:w-[140px]' : 'w-[140px] sm:w-[160px]'} flex-shrink-0`}
                >
                  <div className={`bg-white/10 backdrop-blur-sm rounded-lg ${isInline ? 'p-2 sm:p-3' : 'p-3 sm:p-4'}`}>
                    <div className={`text-center ${isInline ? 'space-y-2' : 'space-y-2'}`}>
                      {prize.imageUrl ? (
                        <div className={`${isInline ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16'} flex items-center justify-center mx-auto`}>
                          <img
                            src={prize.imageUrl}
                            alt={prize.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <svg className={`${isInline ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-16 sm:h-16'} text-white mx-auto`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                      <div>
                        <div className={`${isInline ? 'text-sm sm:text-base' : 'text-sm sm:text-base md:text-lg'} font-bold text-white`}>{prize.name}</div>
                        <div className={`${isInline ? 'text-xs' : 'text-xs sm:text-sm'} text-white/80 capitalize mt-1`}>{prize.rarity}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute -top-2 -right-2 bg-white text-black ${isInline ? 'px-2 py-0.5 text-[10px]' : 'px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs'} rounded-full font-bold uppercase shadow-lg`}>
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex justify-center w-full sm:w-auto mt-6">
              <Button
                onClick={handlePlayAgain}
                size={isInline ? "default" : "lg"}
                className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold ${isInline ? 'px-6 sm:px-8 py-3 sm:py-4 text-base' : 'px-6 sm:px-8 py-3 sm:py-4'} rounded-full transform hover:scale-105 transition-transform`}
              >
                Spin Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
