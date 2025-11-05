'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PrizeWheel from '@/app/components/PrizeWheel';
import InteractionSidebar from '@/app/components/InteractionSidebar';
import BulkPlayModal from '@/app/components/BulkPlayModal';
import BulkScratchCardsView from '@/app/components/BulkScratchCardsView';
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

interface CompetitionType {
  id: string;
  title: string;
  category: 'crypto' | 'gaming' | 'luxury' | 'electronics';
  description: string;
  entryPrice: number;
  prizePool: number;
  participants: number;
  timeRemaining: string;
  prizes: Prize[];
  sponsored?: boolean;
  videoUrl?: string;
}

// Competition data - in a real app, this would come from an API or database
const competitions: CompetitionType[] = [
  {
    id: '0',
    title: 'Lennie Special',
    category: 'gaming',
    description: 'Exclusive gaming prizes with special video showcase!',
    entryPrice: 2.50,
    prizePool: 15000,
    participants: 9876,
    timeRemaining: '4h 10m',
    sponsored: true,
    videoUrl: '/lennie.mp4',
    prizes: [
      { name: 'Gaming Headset', rarity: 'common', probability: 35, imageUrl: '/CTSP credit 1gbp.png' },
      { name: 'RGB Keyboard', rarity: 'rare', probability: 30, imageUrl: '/CTSP credit 5gbp.png' },
      { name: 'Gaming Chair', rarity: 'epic', probability: 20, imageUrl: '/CTSP credit 20gbp.png' },
      { name: 'RTX 4090', rarity: 'legendary', probability: 15, imageUrl: '/CTSP credit 1000gbp.png' }
    ]
  },
  {
    id: '1',
    title: 'Bitcoin Bonanza',
    category: 'crypto',
    description: 'Win up to 1 BTC in crypto prizes!',
    entryPrice: 5.00,
    prizePool: 50000,
    participants: 12543,
    timeRemaining: '2h 15m',
    sponsored: true,
    prizes: [
      { name: '$10 BTC', rarity: 'common', probability: 40, imageUrl: '/CTSP cash 1.png' },
      { name: '$50 ETH', rarity: 'common', probability: 25, imageUrl: '/CTSP cash 1.png' },
      { name: '$100 BTC', rarity: 'rare', probability: 20, imageUrl: '/CTSP cash 2.png' },
      { name: '$500 ETH', rarity: 'epic', probability: 10, imageUrl: '/CTSP cash 3.png' },
      { name: '1 BTC', rarity: 'legendary', probability: 5, imageUrl: '/CTSP credit 1000gbp.png' }
    ]
  },
  {
    id: '2',
    title: 'Gaming Legends',
    category: 'gaming',
    description: 'Rare skins and gaming gear up for grabs!',
    entryPrice: 3.00,
    prizePool: 25000,
    participants: 8921,
    timeRemaining: '5h 30m',
    prizes: [
      { name: 'Common Skin', rarity: 'common', probability: 45, imageUrl: '/CTSP credit 1gbp.png' },
      { name: 'Rare Emote', rarity: 'rare', probability: 30, imageUrl: '/CTSP credit 5gbp.png' },
      { name: 'Epic Bundle', rarity: 'epic', probability: 15, imageUrl: '/CTSP credit 20gbp.png' },
      { name: 'PS5 Console', rarity: 'legendary', probability: 10, imageUrl: '/CTSP fiat 500.png' }
    ]
  },
  {
    id: '3',
    title: 'Luxury Collection',
    category: 'luxury',
    description: 'Premium watches and jewelry await!',
    entryPrice: 10.00,
    prizePool: 100000,
    participants: 5432,
    timeRemaining: '1h 45m',
    prizes: [
      { name: 'Designer Watch', rarity: 'rare', probability: 35, imageUrl: '/CTSP credit 5gbp.png' },
      { name: 'Gold Chain', rarity: 'rare', probability: 30, imageUrl: '/CTSP credit 20gbp.png' },
      { name: 'Diamond Ring', rarity: 'epic', probability: 20, imageUrl: '/CTSP credit 20gbp.png' },
      { name: 'Rolex Watch', rarity: 'legendary', probability: 15, imageUrl: '/CTSP credit 1000gbp.png' }
    ]
  },
  {
    id: '4',
    title: 'Tech Paradise',
    category: 'electronics',
    description: 'Latest gadgets and electronics!',
    entryPrice: 4.00,
    prizePool: 35000,
    participants: 15678,
    timeRemaining: '3h 20m',
    prizes: [
      { name: 'AirPods', rarity: 'common', probability: 40, imageUrl: '/CTSP apple voucher 1.png' },
      { name: 'iPad', rarity: 'rare', probability: 30, imageUrl: '/CTSP apple voucher 1.png' },
      { name: 'MacBook', rarity: 'epic', probability: 20, imageUrl: '/CTSP apple voucher 1.png' },
      { name: 'iPhone 15 Pro', rarity: 'legendary', probability: 10, imageUrl: '/CTSP apple voucher 1.png' }
    ]
  }
];

export default function CompetitionPage() {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.id as string;
  const [ticketCount, setTicketCount] = useState(1);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [isBulkPlayMode, setIsBulkPlayMode] = useState(false);
  const [bulkPrizes, setBulkPrizes] = useState<BulkPrize[]>([]);
  const MAX_TICKETS = 100;

  // Find the competition by ID
  const competition = competitions.find(c => c.id === competitionId);

  const incrementTickets = () => {
    if (ticketCount < 5) {
      setTicketCount(ticketCount + 1);
    } else if (ticketCount === 5) {
      // Show bulk play modal when trying to go above 5
      setShowBulkModal(true);
    } else if (ticketCount < MAX_TICKETS) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrementTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleBulkPlayConfirm = () => {
    setShowBulkModal(false);
    setTicketCount(6); // Start at 6 tickets
    setIsBulkPlayMode(true);
  };

  const handleBulkPlayCancel = () => {
    setShowBulkModal(false);
  };

  const handleStartBulkPlay = () => {
    if (!competition) return;

    // Generate prizes for all tickets based on probabilities
    const prizes: BulkPrize[] = [];
    for (let i = 0; i < ticketCount; i++) {
      const randomValue = Math.random() * 100;
      let cumulativeProbability = 0;

      for (const prize of competition.prizes) {
        cumulativeProbability += prize.probability;
        if (randomValue <= cumulativeProbability) {
          prizes.push({
            name: prize.name,
            rarity: prize.rarity,
            image: prize.imageUrl,
          });
          break;
        }
      }
    }

    setBulkPrizes(prizes);
  };

  const handleCloseBulkView = () => {
    setBulkPrizes([]);
    setIsBulkPlayMode(false);
    setTicketCount(1);
  };

  if (!competition) {
    return (
      <div className="flex h-screen bg-black items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Competition Not Found</h1>
          <Button onClick={() => router.push('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  // If showing bulk scratch cards view
  if (bulkPrizes.length > 0) {
    return (
      <BulkScratchCardsView
        prizes={bulkPrizes}
        onAllRevealed={() => {}}
        onClose={handleCloseBulkView}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Bulk Play Modal */}
      <BulkPlayModal
        isOpen={showBulkModal}
        onClose={handleBulkPlayCancel}
        onConfirm={handleBulkPlayConfirm}
        ticketCount={ticketCount}
      />
      {/* Back Button - Top Left */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20 shadow-xl"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main Content Area - Centered Slide Layout */}
      <main className="h-full flex flex-col items-center justify-start overflow-y-auto py-4 md:py-8 pb-20 md:pb-8">
        {/* Interaction Buttons - Prizes Tickets Tab */}
        <div className="w-full flex justify-center mb-4 z-10">
          <InteractionSidebar
            prizes={competition.prizes}
            competitionTitle={competition.title}
          />
        </div>

        {/* Ticket Counter */}
        <div className="w-full max-w-md mx-auto px-1 md:px-0 mb-4 z-10">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700 px-6 py-4 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={decrementTickets}
                disabled={ticketCount <= 1}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-2xl transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:opacity-50"
              >
                -
              </button>
              <div className="flex items-center gap-3 flex-1 justify-center">
                <span className="text-4xl font-bold text-white">{ticketCount}</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Ticket{ticketCount !== 1 ? 's' : ''}</span>
                  <span className="text-xs text-gray-500">
                    (max {isBulkPlayMode ? MAX_TICKETS : 5})
                  </span>
                </div>
              </div>
              <button
                onClick={incrementTickets}
                disabled={isBulkPlayMode ? ticketCount >= MAX_TICKETS : false}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-2xl transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:opacity-50"
              >
                +
              </button>
            </div>

            {/* Slider and quick increment buttons for bulk mode */}
            {isBulkPlayMode && (
              <div className="mt-3 space-y-3">
                {/* Slider */}
                <div className="px-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Slide to adjust:</span>
                    <span className="text-xs text-gray-500">{ticketCount} / {MAX_TICKETS}</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max={MAX_TICKETS}
                    value={ticketCount}
                    onChange={(e) => setTicketCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, rgb(5, 150, 105) 0%, rgb(5, 150, 105) ${((ticketCount - 6) / (MAX_TICKETS - 6)) * 100}%, rgb(55, 65, 81) ${((ticketCount - 6) / (MAX_TICKETS - 6)) * 100}%, rgb(55, 65, 81) 100%)`
                    }}
                  />
                </div>

                {/* Quick add buttons */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-gray-400 mr-2">Quick add:</span>
                  <button
                    onClick={() => setTicketCount(Math.min(ticketCount + 5, MAX_TICKETS))}
                    disabled={ticketCount >= MAX_TICKETS}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => setTicketCount(Math.min(ticketCount + 10, MAX_TICKETS))}
                    disabled={ticketCount >= MAX_TICKETS}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => setTicketCount(Math.min(ticketCount + 25, MAX_TICKETS))}
                    disabled={ticketCount >= MAX_TICKETS}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50"
                  >
                    +25
                  </button>
                  <button
                    onClick={() => setTicketCount(MAX_TICKETS)}
                    disabled={ticketCount >= MAX_TICKETS}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50"
                  >
                    Max
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Container */}
        <div className="w-full max-w-md mx-auto relative px-1 md:px-0 flex flex-col items-center gap-4">
          {!isBulkPlayMode ? (
            // Show slot machine in normal mode (1-5 tickets)
            <PrizeWheel
              prizes={competition.prizes}
              onClose={() => router.back()}
              competitionTitle={competition.title}
              isInline={true}
              hideCloseButton={true}
              numberOfTickets={ticketCount}
            />
          ) : (
            // Show bulk play button in bulk mode (6+ tickets)
            <div className="w-full flex flex-col items-center gap-6 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bulk Play Mode Active
                </h2>
                <p className="text-gray-400 mb-1">
                  Ready to play {ticketCount} tickets at once
                </p>
                <p className="text-sm text-gray-500">
                  Scratch cards will appear in a circular animation
                </p>
              </div>

              <button
                onClick={handleStartBulkPlay}
                className="group relative px-8 py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 hover:from-emerald-400 hover:via-green-400 hover:to-lime-400 text-white shadow-2xl transition-all transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  PLAY ALL
                </span>
              </button>

              <button
                onClick={() => {
                  setIsBulkPlayMode(false);
                  setTicketCount(1);
                }}
                className="text-gray-400 hover:text-white transition-colors text-sm underline"
              >
                Exit bulk mode
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
