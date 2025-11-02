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
}

export default function PrizeWheel({ prizes, onClose, competitionTitle }: PrizeWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [columnOffsets, setColumnOffsets] = useState([0, 0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const columnRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
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

    // Calculate positions for each column to land on the winning prize
    const prizeHeight = 120; // Height of each prize item
    const prizeIndex = prizes.indexOf(selectedPrize);
    const repetitions = 15; // Number of times we repeat the prize list

    // Create different spin amounts for each column (they'll stop at different times)
    const newOffsets = columnRefs.map((_, colIndex) => {
      // Base spins: vary spins for each column (5-9 full rotations)
      const baseSpins = 5 + colIndex;
      // Land on a prize in the middle repetition to ensure it's visible
      const landingPosition = (repetitions / 2) * prizes.length + prizeIndex;
      const totalOffset = (baseSpins * prizes.length + landingPosition) * prizeHeight;
      return totalOffset;
    });

    setColumnOffsets(newOffsets);

    // Staggered completion times for columns (1.8s, 2.2s, 2.6s, 3.0s, 3.4s)
    const stopTimes = [1800, 2200, 2600, 3000, 3400];

    // Show result after last column stops
    setTimeout(() => {
      setWonPrize(selectedPrize);
      setIsSpinning(false);
    }, stopTimes[stopTimes.length - 1] + 500);
  };

  const handlePlayAgain = () => {
    setWonPrize(null);
    setColumnOffsets([0, 0, 0, 0, 0]);
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
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

      {!wonPrize ? (
        <div
          className={`flex flex-col items-center space-y-8 max-w-5xl w-full transition-all duration-500 ${
            isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Title */}
          <div
            className={`text-center space-y-2 transition-all duration-500 delay-100 ${
              isVisible && !isExiting ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            <h2 className="text-3xl font-bold text-white">{competitionTitle}</h2>
            <p className="text-gray-400">Spin the slots to win your prize!</p>
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
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border-8 border-yellow-500/50">
              {/* Top Decoration */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-2 rounded-full text-white font-bold text-xl shadow-lg">
                JACKPOT
              </div>

              {/* Selection Indicator */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <div className="mx-8 border-4 border-red-500 rounded-lg h-[120px] bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.5)]"></div>
              </div>

              {/* Slot Columns */}
              <div className="flex gap-4 relative">
                {columnRefs.map((ref, colIndex) => (
                  <div key={colIndex} className="flex-1">
                    {/* Column Container */}
                    <div className="bg-gray-950 rounded-xl p-2 h-[360px] overflow-hidden relative shadow-inner border-4 border-gray-700">
                      {/* Scrolling Column */}
                      <div
                        ref={ref}
                        className="relative"
                        style={{
                          transform: `translateY(-${columnOffsets[colIndex]}px)`,
                          transition: isSpinning
                            ? `transform ${1.8 + colIndex * 0.4}s cubic-bezier(0.25, 0.1, 0.25, 1)`
                            : 'none',
                        }}
                      >
                        {/* Repeat prizes 15 times for smooth scrolling */}
                        {Array(15).fill(prizes).flat().map((prize, idx) => (
                          <div
                            key={idx}
                            className={`h-[120px] flex items-center justify-center border-b-2 border-gray-800 bg-gradient-to-br ${rarityGradients[prize.rarity]}`}
                          >
                            <div className="text-center px-2">
                              <div className="text-white font-bold text-sm mb-1">{prize.name}</div>
                              <div className="text-xs text-white/80 capitalize">{prize.rarity}</div>
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
            className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed duration-500 delay-300 ${
              isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN THE SLOTS'}
          </Button>

          {/* Prize List */}
          <div
            className={`w-full max-w-3xl transition-all duration-500 delay-[400ms] ${
              isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">All Prizes</h3>
            <div className="grid grid-cols-3 gap-2">
              {prizes.map((prize, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 transition-all hover:scale-105 hover:bg-gray-800/70"
                >
                  <div className="text-sm font-medium text-white">{prize.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{prize.rarity} • {prize.probability}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-8 max-w-2xl w-full animate-[fadeIn_0.5s_ease-out]">
          {/* Celebration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-green-500/20 animate-pulse"></div>
          </div>

          {/* Winner Content */}
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-5xl font-bold text-white animate-[bounceIn_0.6s_ease-out]">🎉 YOU WON! 🎉</h2>

            {/* Prize Display */}
            <div className={`relative p-8 bg-gradient-to-br ${rarityGradients[wonPrize.rarity]} rounded-3xl shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-all animate-[scaleIn_0.5s_ease-out_0.2s_both]`}>
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
            <div className="flex gap-4 justify-center animate-[fadeIn_0.5s_ease-out_0.5s_both]">
              <Button
                onClick={handlePlayAgain}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-transform"
              >
                Spin Again
              </Button>
              <Button
                onClick={handleClose}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-transform"
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
