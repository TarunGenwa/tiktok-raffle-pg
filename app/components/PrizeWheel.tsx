'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
}

interface PrizeWheelProps {
  prizes: Prize[];
  onClose: () => void;
  competitionTitle: string;
  isInline?: boolean;
}

export default function PrizeWheel({ prizes, onClose, competitionTitle, isInline = false }: PrizeWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrizes, setWonPrizes] = useState<Prize[] | null>(null);
  const [rowOffsets, setRowOffsets] = useState([0, 0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

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

    // Select 5 prizes based on probability (one for each row)
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

    const selectedPrizes = [
      selectPrize(),
      selectPrize(),
      selectPrize(),
      selectPrize(),
      selectPrize()
    ];

    // Calculate positions for each row to land on its specific winning prize
    const prizeWidth = isInline ? 110 : 130; // Width of each prize item (matching the actual rendered width)
    const containerWidth = isInline ? 360 : 480; // Container width (matching the actual rendered width)
    const repetitions = 50; // Increased repetitions for proper circular loop

    // Create different spin amounts for each row (they'll stop at different times)
    const newOffsets = rowRefs.map((_, rowIndex) => {
      const selectedPrize = selectedPrizes[rowIndex];
      const prizeIndex = prizes.indexOf(selectedPrize);

      // Base spins: vary spins for each row (8-12 full rotations for more excitement)
      const baseSpins = 8 + rowIndex;
      // Land on a prize well within the middle repetitions to ensure it's always visible
      const landingPosition = (repetitions / 2) * prizes.length + prizeIndex;

      // Calculate offset to center the prize in the selection indicator
      // Prize center should align with container center
      const centeringOffset = containerWidth / 2 - prizeWidth / 2;
      const totalOffset = (baseSpins * prizes.length + landingPosition) * prizeWidth - centeringOffset;

      return totalOffset;
    });

    setRowOffsets(newOffsets);

    // Staggered completion times for rows (1.8s, 2.2s, 2.6s, 3.0s, 3.4s)
    const stopTimes = [1800, 2200, 2600, 3000, 3400];

    // Stop ticking sound after last row stops
    setTimeout(() => {
      stopTickingSound();
    }, stopTimes[stopTimes.length - 1]);

    // Show result after last row stops
    setTimeout(() => {
      setWonPrizes(selectedPrizes);
      setIsSpinning(false);
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
      className={`${isInline ? 'relative w-full h-full' : 'fixed inset-0 z-50'} bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible && !isExiting ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Close Button */}
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

      {!wonPrizes ? (
        <div
          className={`flex flex-col items-center ${isInline ? 'space-y-2 sm:space-y-3 md:space-y-4' : 'space-y-4 sm:space-y-6 md:space-y-8'} ${isInline ? 'max-w-md' : 'max-w-5xl'} w-full transition-all duration-500 ${
            isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Title */}
          <div
            className={`text-center space-y-1 transition-all duration-500 delay-100 ${
              isVisible && !isExiting ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            <h2 className={`${isInline ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'} font-bold text-white px-4`}>{competitionTitle}</h2>
            <p className={`${isInline ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-gray-400 px-4`}>Spin the slots to win your prize!</p>
          </div>

          {/* Slot Machine Container */}
          <div
            className={`relative transition-all duration-500 delay-200 ${
              isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl blur-3xl"></div>

            {/* Slot Machine Frame */}
            <div className={`relative bg-gradient-to-b from-gray-800 to-gray-900 ${isInline ? 'p-2 sm:p-4' : 'p-4 sm:p-8'} rounded-2xl sm:rounded-3xl shadow-2xl ${isInline ? 'border-2 sm:border-4' : 'border-4 sm:border-8'} border-yellow-500/50`}>
              {/* Top Decoration */}
              <div className={`absolute ${isInline ? '-top-3 sm:-top-4' : '-top-4 sm:-top-6'} left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 ${isInline ? 'px-3 sm:px-6 py-0.5 sm:py-1' : 'px-4 sm:px-8 py-1 sm:py-2'} rounded-full text-white font-bold ${isInline ? 'text-xs sm:text-base' : 'text-sm sm:text-xl'} shadow-lg`}>
                JACKPOT
              </div>

              {/* Selection Indicator */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <div className={`${isInline ? 'my-2 sm:my-4' : 'my-4 sm:my-8'} ${isInline ? 'border-2' : 'border-2 sm:border-4'} border-red-500 rounded-lg ${isInline ? 'w-[110px] sm:w-[130px]' : 'w-[130px] sm:w-[150px]'} h-full bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.5)]`}></div>
              </div>

              {/* Slot Rows */}
              <div className={`flex flex-col ${isInline ? 'gap-1 sm:gap-2' : 'gap-2 sm:gap-4'} relative`}>
                {rowRefs.map((ref, rowIndex) => (
                  <div key={rowIndex} className={`flex-1 ${rowIndex >= 3 ? 'hidden sm:block' : ''}`}>
                    {/* Row Container */}
                    <div className={`bg-gray-950 rounded-xl p-1 sm:p-2 ${isInline ? 'w-[360px] sm:w-[420px]' : 'w-[480px] sm:w-[600px]'} overflow-hidden relative shadow-inner border-2 sm:border-4 border-gray-700`}>
                      {/* Scrolling Row */}
                      <div
                        ref={ref}
                        className="relative flex"
                        style={{
                          transform: `translateX(-${rowOffsets[rowIndex]}px)`,
                          transition: isSpinning
                            ? `transform ${1.8 + rowIndex * 0.4}s cubic-bezier(0.25, 0.1, 0.25, 1)`
                            : 'none',
                        }}
                      >
                        {/* Repeat prizes 50 times for proper circular loop */}
                        {(Array(50).fill(prizes).flat() as Prize[]).map((prize, idx) => (
                          <div
                            key={idx}
                            className={`${isInline ? 'w-[110px] sm:w-[130px]' : 'w-[130px] sm:w-[150px]'} flex-shrink-0 flex items-center justify-center border-r-2 border-gray-800 bg-gradient-to-br ${rarityGradients[prize.rarity]}`}
                          >
                            <div className="text-center px-1 sm:px-2 py-2">
                              <div className={`text-white font-bold ${isInline ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'} mb-1 leading-tight`}>{prize.name}</div>
                              <div className={`${isInline ? 'text-[8px] sm:text-[10px]' : 'text-[10px] sm:text-xs'} text-white/80 capitalize`}>{prize.rarity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            size="lg"
            className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold ${isInline ? 'text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-4' : 'text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6'} rounded-full shadow-2xl transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed duration-500 delay-300 ${
              isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN THE SLOTS'}
          </Button>

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
        <div className={`flex flex-col items-center ${isInline ? 'space-y-2 sm:space-y-3' : 'space-y-4 sm:space-y-6 md:space-y-8'} ${isInline ? 'max-w-md' : 'max-w-4xl'} w-full px-4 animate-[fadeIn_0.5s_ease-out]`}>
          {/* Celebration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          {/* Winner Content */}
          <div className={`relative z-10 text-center ${isInline ? 'space-y-2 sm:space-y-3' : 'space-y-4 sm:space-y-6'}`}>
            <h2 className={`${isInline ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-white animate-[bounceIn_0.6s_ease-out]`}>🎉 YOU WON 5 PRIZES! 🎉</h2>

            {/* Prizes Display - All 5 with fixed width and wrapping */}
            <div className={`flex flex-wrap justify-center ${isInline ? 'gap-2' : 'gap-3 sm:gap-4'} w-full`}>
              {wonPrizes.map((prize, index) => (
                <div
                  key={index}
                  className={`relative ${isInline ? 'p-2 sm:p-3' : 'p-3 sm:p-4'} bg-gradient-to-br ${rarityGradients[prize.rarity]} rounded-xl sm:rounded-2xl shadow-xl border-2 border-white/30 transform hover:scale-105 transition-all animate-[scaleIn_0.5s_ease-out_${0.2 + index * 0.1}s_both] ${isInline ? 'w-[100px] sm:w-[120px]' : 'w-[140px] sm:w-[160px]'} flex-shrink-0`}
                >
                  <div className={`bg-white/10 backdrop-blur-sm rounded-lg ${isInline ? 'p-2' : 'p-3 sm:p-4'}`}>
                    <div className={`text-center ${isInline ? 'space-y-1' : 'space-y-2'}`}>
                      <svg className={`${isInline ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-12 h-12 sm:w-16 sm:h-16'} text-white mx-auto`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <div>
                        <div className={`${isInline ? 'text-xs sm:text-sm' : 'text-sm sm:text-base md:text-lg'} font-bold text-white`}>{prize.name}</div>
                        <div className={`${isInline ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'} text-white/80 capitalize mt-1`}>{prize.rarity}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute -top-2 -right-2 bg-white text-black ${isInline ? 'px-1.5 py-0.5 text-[8px] sm:text-[10px]' : 'px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs'} rounded-full font-bold uppercase shadow-lg`}>
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row ${isInline ? 'gap-2' : 'gap-3 sm:gap-4'} justify-center animate-[fadeIn_0.5s_ease-out_0.7s_both] w-full sm:w-auto`}>
              <Button
                onClick={handlePlayAgain}
                size={isInline ? "default" : "lg"}
                className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold ${isInline ? 'px-4 sm:px-6 py-2 sm:py-3 text-sm' : 'px-6 sm:px-8 py-3 sm:py-4'} rounded-full transform hover:scale-105 transition-transform w-full sm:w-auto`}
              >
                Spin Again
              </Button>
              <Button
                onClick={handleClose}
                size={isInline ? "default" : "lg"}
                variant="outline"
                className={`bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 font-bold ${isInline ? 'px-4 sm:px-6 py-2 sm:py-3 text-sm' : 'px-6 sm:px-8 py-3 sm:py-4'} rounded-full transform hover:scale-105 transition-transform w-full sm:w-auto`}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
