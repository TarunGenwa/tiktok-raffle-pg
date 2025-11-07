'use client';

import { useState } from 'react';

interface Winner {
  id: string;
  username: string;
  prize: string;
  competition: string;
  prizeValue: string;
  timeAgo: string;
  imageUrl: string;
}

const recentWinners: Winner[] = [
  {
    id: '1',
    username: 'Sarah M.',
    prize: '£500 Cash',
    competition: 'Mega Cash Jackpot',
    prizeValue: '£500',
    timeAgo: '2m ago',
    imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20fiat%20500_JTVt-vBTr.png?updatedAt=1762502836555'
  },
  {
    id: '2',
    username: 'John D.',
    prize: 'iPhone 15 Pro',
    competition: 'Tech Spin',
    prizeValue: '£1,199',
    timeAgo: '15m ago',
    imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20apple%20voucher%201_VLIk15GsSs.png?updatedAt=1762502837149'
  },
  {
    id: '3',
    username: 'Emma R.',
    prize: '£100 BTC',
    competition: 'Crypto Mystery Box',
    prizeValue: '£100',
    timeAgo: '23m ago',
    imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%203_MwUvn7y34.png?updatedAt=1762502836841'
  },
  {
    id: '4',
    username: 'Mike T.',
    prize: 'Gaming Console',
    competition: 'Gaming Spin',
    prizeValue: '£450',
    timeAgo: '1h ago',
    imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%2020gbp_Mx0lH6PXI.png?updatedAt=1762502837310'
  },
  {
    id: '5',
    username: 'Lisa K.',
    prize: '£1,000 Credit',
    competition: 'Daily Jackpot',
    prizeValue: '£1,000',
    timeAgo: '2h ago',
    imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20credit%201000gbp_jSoTSkL0PW.png?updatedAt=1762502837311'
  },
  {
    id: '6',
    username: 'David P.',
    prize: '£25 ETH',
    competition: 'Crypto Mystery Box',
    prizeValue: '£25',
    timeAgo: '3h ago',
    imageUrl: 'https://ik.imagekit.io/slamseven/tr:w-300,h-300/competition-town/Prizes/CTSP%20cash%202_7pNvz-mAQ.png?updatedAt=1762502837508'
  }
];

export default function WinnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < recentWinners.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="w-full overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-2xl">🏆</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">
              Recent Winners
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-400 font-semibold">LIVE</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-all ${
              currentIndex === 0
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === recentWinners.length - 1}
            className={`p-2 rounded-full transition-all ${
              currentIndex === recentWinners.length - 1
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden px-2">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {recentWinners.map((winner) => (
              <div
                key={winner.id}
                className="flex-shrink-0 w-full"
              >
                {/* Winner Card */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                  <div className="p-4 sm:p-6 space-y-4">
                    {/* Header with username and time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                          {winner.username.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-base">{winner.username}</div>
                          <div className="text-sm text-gray-400">{winner.timeAgo}</div>
                        </div>
                      </div>
                      <div className="text-3xl">🎉</div>
                    </div>

                    {/* Prize Image */}
                    <div className="relative h-32 sm:h-40 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg overflow-hidden border border-yellow-500/20">
                      <img
                        src={winner.imageUrl}
                        alt={winner.prize}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>

                    {/* Prize Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Prize Value</span>
                        <span className="text-xl font-bold text-yellow-400">{winner.prizeValue}</span>
                      </div>
                      <div className="text-white font-semibold text-lg">
                        {winner.prize}
                      </div>
                      <div className="text-sm text-gray-400">
                        from <span className="text-gray-300 font-medium">{winner.competition}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {recentWinners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-yellow-400 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-center gap-2 text-sm px-2">
        <span className="text-gray-400">Total paid out today:</span>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-lg">
          £127,450
        </span>
      </div>
    </div>
  );
}
