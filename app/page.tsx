'use client';

import { useState, useEffect, useRef } from 'react';
import Competition from './components/Competition';
import PromoSlide from './components/PromoSlide';

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

export default function Home() {
  const [showHeader, setShowHeader] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollTop;
        setShowHeader(scrollPosition > 150);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);
  const competitions: CompetitionType[] = [
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

  return (
    <div ref={scrollContainerRef} className="flex h-screen bg-black overflow-y-auto">
      {/* Sticky Header - Shows on Scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-center items-center py-2 px-4">
          <img
            src="/logo.png"
            alt="Competition Town Logo"
            className="h-12 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-md mx-auto px-1 md:px-0 py-4 space-y-4">
          {/* Promo Slide */}
          <div className="w-full">
            <PromoSlide />
          </div>

          {/* Competition Cards */}
          {competitions.map((competition) => (
            <div key={competition.id} className="w-full h-[40vh] px-2">
              <Competition
                id={competition.id}
                title={competition.title}
                category={competition.category}
                description={competition.description}
                entryPrice={competition.entryPrice}
                prizePool={competition.prizePool}
                participants={competition.participants}
                timeRemaining={competition.timeRemaining}
                prizes={competition.prizes}
                sponsored={competition.sponsored}
                videoUrl={competition.videoUrl}
                isActive={true}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
