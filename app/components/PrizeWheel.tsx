'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PixiSlotMachine, { PixiSlotMachineRef } from './PixiSlotMachine';

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
  onResetTrigger?: (resetFn: () => void) => void;
  onPrizesStateChange?: (hasWonPrizes: boolean) => void;
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
  onSpinTrigger,
  onResetTrigger,
  onPrizesStateChange
}: PrizeWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrizes, setWonPrizes] = useState<Prize[] | null>(null);
  const [bulkPrizes, setBulkPrizes] = useState<BulkPrize[] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const pixiSlotMachineRef = useRef<PixiSlotMachineRef>(null);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Expose spin trigger to parent (update when numberOfTickets changes)
  useEffect(() => {
    if (onSpinTrigger) {
      onSpinTrigger(handleSpin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfTickets, onSpinTrigger]);

  // Expose reset trigger to parent
  useEffect(() => {
    if (onResetTrigger) {
      onResetTrigger(handlePlayAgain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onResetTrigger]);

  // Notify parent when prizes state changes (only for bulk prizes now)
  useEffect(() => {
    if (onPrizesStateChange) {
      onPrizesStateChange(bulkPrizes !== null);
    }
  }, [bulkPrizes, onPrizesStateChange]);

  // Reset when numberOfTickets changes
  useEffect(() => {
    setBulkPrizes(null);
    if (pixiSlotMachineRef.current) {
      pixiSlotMachineRef.current.reset();
    }
  }, [numberOfTickets]);

  const rarityGradients = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-600'
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setBulkPrizes(null);

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

    // If bulk mode (totalTickets > 5), skip spinning and reveal prizes immediately
    if (totalTickets && totalTickets > 5) {
      setIsSpinning(true);
      const allSelectedPrizes = Array(totalTickets).fill(null).map(() => selectPrize());

      // Show bulk prizes immediately
      const bulkPrizesData: BulkPrize[] = allSelectedPrizes.map(prize => ({
        name: prize.name,
        rarity: prize.rarity,
        image: prize.imageUrl
      }));

      // Small delay for UI feedback
      setTimeout(() => {
        setIsSpinning(false);
        setBulkPrizes(bulkPrizesData);
      }, 300);
      return;
    }

    // Normal mode: use PixiJS slot machine
    setIsSpinning(true);
    if (pixiSlotMachineRef.current) {
      pixiSlotMachineRef.current.spin();
    }
  };

  const handlePlayAgain = () => {
    setBulkPrizes(null);
    if (pixiSlotMachineRef.current) {
      pixiSlotMachineRef.current.reset();
    }
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

      {/* Show slot machine or bulk prizes */}
      {!bulkPrizes ? (
        // Slot machine or Bulk Mode Indicator
        <div
          className={`flex flex-col items-center ${isInline ? 'space-y-2 sm:space-y-3 md:space-y-4' : 'space-y-4 sm:space-y-6 md:space-y-8'} w-full px-2 transition-all duration-500 ${
            isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Only show slot machine in normal mode (not bulk mode) */}
          {!(totalTickets && totalTickets > 5) && (
            <div
              className={`relative w-full flex justify-center transition-all duration-500 delay-200 ${
                isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <PixiSlotMachine
                ref={pixiSlotMachineRef}
                prizes={prizes}
                numberOfReels={numberOfTickets}
                onSpinStart={() => setIsSpinning(true)}
                onSpinComplete={(selectedPrizes) => {
                  setIsSpinning(false);
                  // Don't set wonPrizes - let the slot machine show the winners with highlights
                }}
              />
            </div>
          )}

          {/* Bulk Play Mode Indicator */}
          {totalTickets && totalTickets > 5 && !isSpinning && (
            <div
              className={`w-full flex flex-col items-center gap-3 sm:gap-4 py-4 sm:py-6 transition-all duration-500 delay-300 ${
                isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 animate-bounce">🎰</div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Bulk Play Mode
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mb-1">
                  Ready to play {totalTickets} tickets
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Click the button below to reveal all prizes
                </p>
              </div>
            </div>
          )}

          {/* Loading state for bulk mode */}
          {totalTickets && totalTickets > 5 && isSpinning && (
            <div
              className={`w-full flex flex-col items-center gap-3 sm:gap-4 py-4 sm:py-6 transition-all duration-500`}
            >
              <div className="text-center">
                <svg className="animate-spin w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Revealing Prizes...
                </h2>
              </div>
            </div>
          )}

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
      ) : bulkPrizes ? (
        // Bulk Prizes Display - Grouped by type inline
        <div
          className={`flex flex-col items-center ${isInline ? 'space-y-3 sm:space-y-4' : 'space-y-4 sm:space-y-6'} w-full px-2 transition-all duration-500`}
        >
          {/* Celebration Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          {/* Bulk Winner Content */}
          <div className={`relative z-10 text-center ${isInline ? 'space-y-3 sm:space-y-4' : 'space-y-4 sm:space-y-6'}`}>
            <div>
              <h2 className={`${isInline ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-white animate-[bounceIn_0.6s_ease-out]`}>
                🎉 Your Prizes! 🎉
              </h2>
              <p className={`${isInline ? 'text-sm' : 'text-base'} text-gray-300 mt-2`}>
                {bulkPrizes.length} ticket{bulkPrizes.length !== 1 ? 's' : ''} played
              </p>
            </div>

            {/* Grouped Prizes Display */}
            <div className={`flex flex-wrap justify-center ${isInline ? 'gap-3' : 'gap-4'} w-full max-w-2xl mx-auto px-4`}>
              {(() => {
                // Group prizes by name
                const grouped = bulkPrizes.reduce((acc, prize) => {
                  if (!acc[prize.name]) {
                    acc[prize.name] = { prize, count: 0 };
                  }
                  acc[prize.name].count++;
                  return acc;
                }, {} as Record<string, { prize: BulkPrize; count: number }>);

                return Object.values(grouped).map(({ prize, count }, index) => (
                  <div
                    key={prize.name}
                    className={`relative flex-shrink-0 ${isInline ? 'w-[110px] sm:w-[130px]' : 'w-[140px] sm:w-[160px]'}`}
                  >
                    {/* Prize card with count */}
                    <div className={`bg-gradient-to-br ${rarityGradients[prize.rarity]} rounded-xl ${isInline ? 'p-3 sm:p-4' : 'p-3 sm:p-4'} shadow-2xl transition-all transform hover:scale-105 border-2 border-white/30`}>
                      {prize.image ? (
                        <div className={`${isInline ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-20 h-20'} mx-auto mb-2 relative`}>
                          <img
                            src={prize.image}
                            alt={prize.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                          />
                        </div>
                      ) : (
                        <div className={`${isInline ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-16 h-16'} mx-auto mb-2 flex items-center justify-center`}>
                          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      )}
                      <div className="text-center">
                        <p className={`text-white font-bold ${isInline ? 'text-xs sm:text-sm' : 'text-sm'} mb-1 leading-tight`}>
                          {prize.name}
                        </p>
                        <span className={`${isInline ? 'text-[9px] sm:text-[10px]' : 'text-xs'} text-white/70 capitalize block mb-2`}>
                          {prize.rarity}
                        </span>
                        {/* Count badge */}
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 inline-flex items-center gap-1">
                          <span className={`text-white font-bold ${isInline ? 'text-[10px]' : 'text-xs'}`}>
                            ×{count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
