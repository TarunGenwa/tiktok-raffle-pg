'use client';

import { useState, useRef } from 'react';
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
}

export default function PrizeWheel({ prizes, onClose, competitionTitle }: PrizeWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const rarityColors = {
    common: 'bg-gray-600',
    rare: 'bg-blue-600',
    epic: 'bg-purple-600',
    legendary: 'bg-yellow-600'
  };

  const rarityGradients = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-600'
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Select prize based on probability
    const random = Math.random() * 100;
    let cumulative = 0;
    let selectedPrize = prizes[0];

    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        selectedPrize = prize;
        break;
      }
    }

    // Calculate rotation
    const prizeIndex = prizes.indexOf(selectedPrize);
    const degreesPerSlice = 360 / prizes.length;
    const targetRotation = 360 * 5 + (360 - (prizeIndex * degreesPerSlice + degreesPerSlice / 2)); // 5 full spins + land on prize

    setRotation(rotation + targetRotation);

    // Show result after animation
    setTimeout(() => {
      setWonPrize(selectedPrize);
      setIsSpinning(false);
    }, 4000);
  };

  const handlePlayAgain = () => {
    setWonPrize(null);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {!wonPrize ? (
        <div className="flex flex-col items-center space-y-8 max-w-2xl w-full">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">{competitionTitle}</h2>
            <p className="text-gray-400">Spin the wheel to win your prize!</p>
          </div>

          {/* Wheel Container */}
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500 drop-shadow-2xl"></div>
            </div>

            {/* Wheel */}
            <div className="relative w-96 h-96">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-2xl"></div>

              {/* Wheel */}
              <div
                ref={wheelRef}
                className="relative w-full h-full rounded-full shadow-2xl border-8 border-white/20 overflow-hidden"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
                }}
              >
                {prizes.map((prize, index) => {
                  const degreesPerSlice = 360 / prizes.length;
                  const startAngle = index * degreesPerSlice;

                  return (
                    <div
                      key={index}
                      className={`absolute w-full h-full ${rarityColors[prize.rarity]}`}
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((startAngle * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((startAngle + degreesPerSlice) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((startAngle + degreesPerSlice) * Math.PI) / 180)}%)`,
                      }}
                    >
                      <div
                        className="absolute left-1/2 top-1/2 w-full text-center text-white font-bold text-sm"
                        style={{
                          transform: `rotate(${startAngle + degreesPerSlice / 2}deg) translateY(-120px)`,
                          transformOrigin: '0 0',
                        }}
                      >
                        <div className="transform -rotate-90">{prize.name}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
          </Button>

          {/* Prize List */}
          <div className="w-full max-w-md">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">All Prizes</h3>
            <div className="grid grid-cols-2 gap-2">
              {prizes.map((prize, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700"
                >
                  <div className="text-sm font-medium text-white">{prize.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{prize.rarity} • {prize.probability}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-8 max-w-2xl w-full">
          {/* Celebration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          {/* Winner Content */}
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-5xl font-bold text-white animate-bounce">🎉 YOU WON! 🎉</h2>

            {/* Prize Display */}
            <div className={`relative p-8 bg-gradient-to-br ${rarityGradients[wonPrize.rarity]} rounded-3xl shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-transform`}>
              <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <svg className="w-32 h-32 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div>
                    <div className="text-3xl font-bold text-white">{wonPrize.name}</div>
                    <div className="text-xl text-white/80 capitalize mt-2">{wonPrize.rarity} Prize</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white text-black px-6 py-2 rounded-full text-sm font-bold uppercase shadow-lg">
                {wonPrize.rarity}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handlePlayAgain}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full"
              >
                Spin Again
              </Button>
              <Button
                onClick={onClose}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 font-bold px-8 py-4 rounded-full"
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
