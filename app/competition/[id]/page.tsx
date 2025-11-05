'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PrizeWheel from '@/app/components/PrizeWheel';
import InteractionSidebar from '@/app/components/InteractionSidebar';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
  imageUrl?: string;
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

  // Find the competition by ID
  const competition = competitions.find(c => c.id === competitionId);

  const incrementTickets = () => {
    if (ticketCount < 5) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrementTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
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
      <main className="flex-1 flex flex-col items-center justify-start relative overflow-y-auto py-16 md:py-8">
        {/* Interaction Buttons - Prizes Tickets Tab */}
        <div className="w-full flex justify-center mb-4 z-10">
          <InteractionSidebar
            prizes={competition.prizes}
            competitionTitle={competition.title}
          />
        </div>

        {/* Ticket Counter */}
        <div className="w-full flex justify-center mb-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-white/20 px-6 py-4 shadow-xl">
            <div className="flex items-center gap-4">
              <button
                onClick={decrementTickets}
                disabled={ticketCount <= 1}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-xl transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg"
              >
                -
              </button>
              <div className="text-center min-w-[120px]">
                <div className="text-3xl font-bold text-white">{ticketCount}</div>
                <div className="text-sm text-gray-400 mt-1">Ticket{ticketCount !== 1 ? 's' : ''}</div>
              </div>
              <button
                onClick={incrementTickets}
                disabled={ticketCount >= 5}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-xl transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* PrizeWheel Container */}
        <div className="w-full max-w-md mx-auto relative px-2 md:px-0 flex items-center">
          <PrizeWheel
            prizes={competition.prizes}
            onClose={() => router.back()}
            competitionTitle={competition.title}
            isInline={true}
            hideCloseButton={true}
            numberOfTickets={ticketCount}
          />
        </div>
      </main>
    </div>
  );
}
