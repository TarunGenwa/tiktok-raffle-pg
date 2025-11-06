'use client';

import { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PrizeWheel from '@/app/components/PrizeWheel';
import InteractionSidebar from '@/app/components/InteractionSidebar';
import PrizeColumnsView from '@/app/components/PrizeColumnsView';
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
  const [showBulkPlayModal, setShowBulkPlayModal] = useState(false);
  const [showPrizeColumns, setShowPrizeColumns] = useState(false);
  const [columnPrizes, setColumnPrizes] = useState<BulkPrize[]>([]);
  const MAX_TICKETS = 100;

  // Find the competition by ID
  const competition = competitions.find(c => c.id === competitionId);

  const incrementTickets = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setTicketCount(prev => prev < MAX_TICKETS ? prev + 1 : prev);
  }, [MAX_TICKETS]);

  const decrementTickets = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setTicketCount(prev => prev > 1 ? prev - 1 : prev);
  }, []);

  const handleStartBulkPlay = () => {
    setShowBulkPlayModal(true);
  };

  const handleBulkPrizesWon = (prizes: BulkPrize[]) => {
    setColumnPrizes(prizes);
    setShowBulkPlayModal(false);
    setShowPrizeColumns(true);
  };

  const handleClosePrizeColumns = () => {
    setColumnPrizes([]);
    setShowPrizeColumns(false);
    setTicketCount(1);
  };

  const handleCloseBulkModal = () => {
    setShowBulkPlayModal(false);
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

  // If showing prize columns view
  if (showPrizeColumns) {
    return (
      <PrizeColumnsView
        prizes={columnPrizes}
        onClose={handleClosePrizeColumns}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative flex flex-col">
      {/* Header with Back Button and Competition Name */}
      <div className="flex items-center px-4 py-4 z-50 relative">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20 shadow-xl flex-shrink-0 absolute left-4"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-white truncate text-center flex-1 px-14">{competition.title}</h1>
      </div>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 flex flex-col items-center overflow-y-auto pb-[240px] md:pb-32">
        {/* Interaction Buttons - Prizes Tickets Tab */}
        <div className="w-full flex justify-center mb-4 px-4">
          <InteractionSidebar
            prizes={competition.prizes}
            competitionTitle={competition.title}
          />
        </div>

        {/* Game Container */}
        <div className="w-full max-w-md mx-auto relative px-1 md:px-0 flex flex-col items-center gap-4">
          {ticketCount <= 5 ? (
            // Show slot machine for 1-5 tickets
            <PrizeWheel
              prizes={competition.prizes}
              onClose={() => router.back()}
              competitionTitle={competition.title}
              isInline={true}
              hideCloseButton={true}
              numberOfTickets={ticketCount}
            />
          ) : (
            // Show bulk play button for 6+ tickets
            <div className="w-full flex flex-col items-center gap-6 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bulk Play Mode
                </h2>
                <p className="text-gray-400 mb-1">
                  Ready to play {ticketCount} tickets
                </p>
                <p className="text-sm text-gray-500">
                  Click below to spin and reveal all prizes
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
                  PLAY ALL {ticketCount} TICKETS
                </span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Ticket Counter - Fixed Above Bottom Nav */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent backdrop-blur-sm z-30 px-4 pb-4 pt-6">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700 px-6 py-4 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onPointerDown={decrementTickets}
                disabled={ticketCount <= 1}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-2xl transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:opacity-50 select-none touch-none"
              >
                -
              </button>
              <div className="flex items-center gap-3 flex-1 justify-center">
                <span className="text-4xl font-bold text-white select-none">{ticketCount}</span>
              </div>
              <button
                type="button"
                onPointerDown={incrementTickets}
                disabled={ticketCount >= MAX_TICKETS}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-2xl transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:opacity-50 select-none touch-none"
              >
                +
              </button>
            </div>

            {/* Slider and quick increment buttons */}
            <div className="mt-3 space-y-3">
              {/* Slider */}
              <div className="px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Slide to adjust:</span>
                  <span className="text-xs text-gray-500">{ticketCount} / {MAX_TICKETS}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={MAX_TICKETS}
                  value={ticketCount}
                  onChange={(e) => {
                    const newCount = parseInt(e.target.value);
                    setTicketCount(newCount);
                  }}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, rgb(5, 150, 105) 0%, rgb(5, 150, 105) ${((ticketCount - 1) / (MAX_TICKETS - 1)) * 100}%, rgb(55, 65, 81) ${((ticketCount - 1) / (MAX_TICKETS - 1)) * 100}%, rgb(55, 65, 81) 100%)`
                  }}
                />
              </div>

              {/* Quick add buttons */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400 mr-2">Quick add:</span>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTicketCount(prev => Math.min(prev + 5, MAX_TICKETS));
                  }}
                  disabled={ticketCount >= MAX_TICKETS}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50 select-none touch-none"
                >
                  +5
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTicketCount(prev => Math.min(prev + 10, MAX_TICKETS));
                  }}
                  disabled={ticketCount >= MAX_TICKETS}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50 select-none touch-none"
                >
                  +10
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTicketCount(prev => Math.min(prev + 25, MAX_TICKETS));
                  }}
                  disabled={ticketCount >= MAX_TICKETS}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white transition-colors disabled:opacity-50 select-none touch-none"
                >
                  +25
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTicketCount(MAX_TICKETS);
                  }}
                  disabled={ticketCount >= MAX_TICKETS}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none touch-none"
                >
                  Max
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Play Modal */}
      {showBulkPlayModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <PrizeWheel
              prizes={competition.prizes}
              onClose={handleCloseBulkModal}
              competitionTitle={competition.title}
              isInline={true}
              hideCloseButton={false}
              numberOfTickets={1}
              totalTickets={ticketCount}
              onBulkPrizesGenerated={handleBulkPrizesWon}
            />
          </div>
        </div>
      )}
    </div>
  );
}
