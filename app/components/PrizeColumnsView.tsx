'use client';

import { useState, useEffect } from 'react';

interface Prize {
  name: string;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface PrizeColumnsViewProps {
  prizes: Prize[];
  onClose?: () => void;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
};

const rarityGlow = {
  common: 'shadow-gray-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/50',
};

export default function PrizeColumnsView({
  prizes,
  onClose
}: PrizeColumnsViewProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Group prizes by name
  const groupedPrizes = prizes.reduce((acc, prize) => {
    if (!acc[prize.name]) {
      acc[prize.name] = {
        prize,
        count: 0
      };
    }
    acc[prize.name].count++;
    return acc;
  }, {} as Record<string, { prize: Prize; count: number }>);

  const prizeGroups = Object.values(groupedPrizes);

  return (
    <div className="fixed inset-0 md:left-20 z-50 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-emerald-400/10 animate-pulse"
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
            Your Prizes
          </h2>
          <p className="text-gray-300">
            {prizes.length} ticket{prizes.length !== 1 ? 's' : ''} played
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

      {/* Prize Columns Container */}
      <div className="relative z-10 h-[calc(100vh-180px)] overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center gap-6">
            {prizeGroups.map(({ prize, count }, groupIndex) => (
              <div
                key={prize.name}
                className={`transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${groupIndex * 100}ms`
                }}
              >
                {/* Column */}
                <div className="flex flex-col items-center gap-3">
                  {/* Prize Type Header */}
                  <div className={`bg-gradient-to-br ${rarityColors[prize.rarity]} rounded-xl p-4 shadow-2xl ${rarityGlow[prize.rarity]} min-w-[160px] text-center`}>
                    {prize.image && (
                      <div className="w-20 h-20 mx-auto mb-3 relative">
                        <img
                          src={prize.image}
                          alt={prize.name}
                          className="w-full h-full object-contain drop-shadow-lg"
                        />
                      </div>
                    )}
                    <p className="text-white font-bold text-lg mb-1">{prize.name}</p>
                    <span className="text-sm text-white/80 capitalize block">
                      {prize.rarity}
                    </span>
                  </div>

                  {/* Stacked Tickets */}
                  <div className="relative flex flex-col items-center gap-2">
                    {Array.from({ length: count }).map((_, ticketIndex) => (
                      <div
                        key={ticketIndex}
                        className={`bg-gradient-to-br ${rarityColors[prize.rarity]} rounded-lg p-3 shadow-lg ${rarityGlow[prize.rarity]} w-32 text-center transition-all duration-300 hover:scale-105 hover:z-10`}
                        style={{
                          animationDelay: `${groupIndex * 100 + ticketIndex * 50}ms`
                        }}
                      >
                        <div className="text-white font-bold text-sm">
                          Ticket #{ticketIndex + 1}
                        </div>
                      </div>
                    ))}

                    {/* Count Badge */}
                    <div className="absolute -top-3 -right-3 bg-white text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-xl border-4 border-emerald-500">
                      {count}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl font-bold text-white mb-2">
            🎉 All prizes revealed!
          </p>
          <p className="text-gray-300">
            Check your inventory for your new prizes
          </p>
        </div>
      </div>
    </div>
  );
}
