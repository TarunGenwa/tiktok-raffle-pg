'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image?: string;
}

interface MysteryBoxProps {
  id: string;
  title: string;
  description: string;
  price: number;
  prizes: Prize[];
  image?: string;
}

export default function MysteryBox({
  title,
  description,
  price,
  prizes,
  image = '/mystery-box-placeholder.png'
}: MysteryBoxProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedPrize, setRevealedPrize] = useState<Prize | null>(null);

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-600'
  };

  const rarityBorders = {
    common: 'border-gray-500',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-yellow-500'
  };

  const handleOpen = () => {
    setIsRevealing(true);
    // Simulate opening animation
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setRevealedPrize(randomPrize);
    }, 1500);
  };

  const handleReset = () => {
    setIsRevealing(false);
    setRevealedPrize(null);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {!revealedPrize ? (
        <div className="relative h-full flex flex-col items-center justify-center p-6 space-y-6">
          {/* Mystery Box Image/Icon */}
          <div className={`relative transition-all duration-500 ${isRevealing ? 'animate-bounce scale-110' : ''}`}>
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl transform rotate-6 opacity-70 blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm10 16H4V9h16v11z"/>
                  <circle cx="12" cy="15" r="2"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Box Info */}
          <div className="text-center space-y-3 max-w-md">
            <h2 className="text-4xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-lg text-gray-300">{description}</p>
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-yellow-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              ${price}
            </div>
          </div>

          {/* Possible Prizes Preview */}
          <div className="w-full max-w-md space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide text-center">Possible Prizes</h3>
            <div className="grid grid-cols-2 gap-2">
              {prizes.slice(0, 4).map((prize, idx) => (
                <div
                  key={idx}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border-2 ${rarityBorders[prize.rarity]} border-opacity-50`}
                >
                  <div className="text-sm font-medium text-white truncate">{prize.name}</div>
                  <div className={`text-xs font-semibold bg-gradient-to-r ${rarityColors[prize.rarity]} bg-clip-text text-transparent capitalize`}>
                    {prize.rarity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Button */}
          <Button
            onClick={handleOpen}
            disabled={isRevealing}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRevealing ? 'Opening...' : 'Open Mystery Box'}
          </Button>
        </div>
      ) : (
        <div className="relative h-full flex flex-col items-center justify-center p-6 space-y-8">
          {/* Celebration Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          {/* Revealed Prize */}
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-white text-center animate-bounce">You Won!</h2>

            <div className={`relative p-8 bg-gradient-to-br ${rarityColors[revealedPrize.rarity]} rounded-3xl shadow-2xl border-4 ${rarityBorders[revealedPrize.rarity]} transform hover:scale-105 transition-transform`}>
              <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="absolute -top-3 -right-3 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                {revealedPrize.rarity}
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">{revealedPrize.name}</h3>
              <p className={`text-lg font-semibold bg-gradient-to-r ${rarityColors[revealedPrize.rarity]} bg-clip-text text-transparent capitalize`}>
                {revealedPrize.rarity} Prize
              </p>
            </div>

            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 font-bold px-8 py-4 rounded-full"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
