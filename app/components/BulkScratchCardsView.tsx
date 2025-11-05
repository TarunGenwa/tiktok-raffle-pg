'use client';

import { useState, useEffect } from 'react';
import ScratchCard from './ScratchCard';

interface Prize {
  name: string;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BulkScratchCardsViewProps {
  prizes: Prize[];
  onAllRevealed?: () => void;
  onClose?: () => void;
}

export default function BulkScratchCardsView({
  prizes,
  onAllRevealed,
  onClose
}: BulkScratchCardsViewProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [isEntering, setIsEntering] = useState(true);
  const [autoRevealAll, setAutoRevealAll] = useState(false);

  // Entrance animation - cards appear in circular pattern
  useEffect(() => {
    const totalCards = prizes.length;
    const duration = 1500; // 1.5 seconds for all cards to appear
    const delayPerCard = duration / totalCards;

    prizes.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * delayPerCard);
    });

    setTimeout(() => {
      setIsEntering(false);
    }, duration + 500);
  }, [prizes]);

  const handleCardReveal = (index: number) => {
    setRevealedCards((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);

      // Check if all cards are revealed
      if (newSet.size === prizes.length) {
        setTimeout(() => {
          onAllRevealed?.();
        }, 1000);
      }

      return newSet;
    });
  };

  // Calculate card position in circular pattern
  const getCardStyle = (index: number) => {
    if (!visibleCards.includes(index)) {
      return { opacity: 0, transform: 'scale(0) rotate(0deg)' };
    }

    const totalCards = prizes.length;
    const angle = (index / totalCards) * 360;
    const radius = 100; // percentage

    // Calculate position in a spiral/circular pattern
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return {
      opacity: 1,
      transform: `translate(${x}px, ${y}px) scale(1) rotate(${angle}deg)`,
      transitionDelay: `${index * 0.05}s`,
    };
  };

  const allRevealed = revealedCards.size === prizes.length;

  return (
    <div className="fixed inset-0 md:left-20 z-50 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/10 animate-pulse"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            Scratch Your Prizes
          </h2>
          <p className="text-gray-300">
            {revealedCards.size} / {prizes.length} revealed
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Circular entrance animation container */}
      <div className="relative h-[calc(100vh-120px)] overflow-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`relative transition-all duration-1000 ${
              isEntering ? 'scale-50' : 'scale-100'
            }`}
          >
            {/* Cards grid - appears from center then settles into grid */}
            <div
              className={`grid gap-4 p-8 transition-all duration-1000 ${
                prizes.length <= 6
                  ? 'grid-cols-2 md:grid-cols-3'
                  : prizes.length <= 12
                  ? 'grid-cols-3 md:grid-cols-4'
                  : prizes.length <= 30
                  ? 'grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
                  : 'grid-cols-5 md:grid-cols-6 lg:grid-cols-8'
              }`}
            >
              {prizes.map((prize, index) => (
                <div
                  key={index}
                  className="transition-all duration-500 ease-out"
                  style={{
                    ...(isEntering ? getCardStyle(index) : {}),
                    width: prizes.length <= 12 ? '180px' : prizes.length <= 30 ? '140px' : '120px',
                    height: prizes.length <= 12 ? '240px' : prizes.length <= 30 ? '200px' : '160px',
                  }}
                >
                  <ScratchCard
                    prize={prize}
                    onReveal={() => handleCardReveal(index)}
                    autoReveal={autoRevealAll && !revealedCards.has(index)}
                    autoRevealDelay={index * 50}
                    cardNumber={index + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with progress */}
      <div className="relative z-10 p-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${(revealedCards.size / prizes.length) * 100}%` }}
            />
          </div>

          {/* Summary */}
          {allRevealed && (
            <div className="text-center animate-bounce">
              <p className="text-xl font-bold text-white mb-2">
                🎉 All prizes revealed!
              </p>
              <p className="text-gray-300">
                Check your inventory for your new prizes
              </p>
            </div>
          )}

          {!allRevealed && (
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-sm">
                Scratch the cards to reveal your prizes
              </p>
              {!autoRevealAll && (
                <button
                  onClick={() => setAutoRevealAll(true)}
                  className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 hover:from-emerald-400 hover:via-green-400 hover:to-lime-400 text-white shadow-lg transition-all transform hover:scale-105"
                >
                  Reveal All
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confetti effect when all revealed */}
      {allRevealed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
