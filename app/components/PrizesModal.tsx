'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
}

interface PrizesModalProps {
  prizes: Prize[];
  competitionTitle: string;
  onClose: () => void;
}

export default function PrizesModal({ prizes, competitionTitle, onClose }: PrizesModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed top-0 right-0 bottom-0 z-[100] flex items-center justify-end transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop overlay only on left side */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" onClick={handleClose}></div>

      <div
        className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-l-2xl shadow-2xl w-[85vw] sm:w-[320px] md:w-[360px] max-w-[360px] h-full overflow-hidden border-l-2 border-y-2 border-gray-700 transition-all duration-300 mr-16 sm:mr-20 md:mr-28 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">{competitionTitle}</h2>
              <p className="text-xs text-gray-400 mt-1">Prize Pool</p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Prizes List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${rarityColors[prize.rarity]} rounded-lg p-3 border-2 ${rarityBorders[prize.rarity]} shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  {/* Prize Icon */}
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>

                  {/* Prize Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{prize.name}</h3>
                    <p className="text-xs text-white/80 capitalize mt-0.5">{prize.rarity}</p>

                    {/* Probability */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-white/70">Win Rate</div>
                      <div className="text-lg font-bold text-white">{prize.probability}%</div>
                    </div>

                    {/* Probability Bar */}
                    <div className="mt-2 h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/50 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${prize.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Info */}
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Total Prizes</span>
              <span className="text-white font-bold">{prizes.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-400">Total Probability</span>
              <span className="text-white font-bold">
                {prizes.reduce((sum, prize) => sum + prize.probability, 0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-800 to-gray-900 p-3 border-t border-gray-700">
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 rounded-full text-sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
