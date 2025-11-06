'use client';

import { useState, useEffect, useRef } from 'react';
import PromoSlide from './components/PromoSlide';
import CategorySection from './components/CategorySection';

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

  // Category-based competitions
  const categories = [
    {
      title: 'Mystery Boxes',
      icon: '🎁',
      gradient: 'from-purple-500 to-pink-500',
      competitions: [
        {
          id: 'mb-1',
          title: 'Crypto Mystery Box',
          category: 'crypto' as const,
          description: 'Unlock crypto rewards!',
          entryPrice: 2.50,
          prizePool: 15000,
          participants: 3421,
          timeRemaining: '4h 30m',
          prizes: [
            { name: '$5 BTC', rarity: 'common' as const, probability: 50, imageUrl: '/CTSP cash 1.png' },
            { name: '$25 ETH', rarity: 'rare' as const, probability: 30, imageUrl: '/CTSP cash 2.png' },
            { name: '$100 BTC', rarity: 'epic' as const, probability: 15, imageUrl: '/CTSP cash 3.png' },
            { name: '$500 Crypto', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP credit 1000gbp.png' }
          ]
        },
        {
          id: 'mb-2',
          title: 'Luxury Mystery Box',
          category: 'luxury' as const,
          description: 'Surprise luxury items!',
          entryPrice: 8.00,
          prizePool: 40000,
          participants: 2134,
          timeRemaining: '6h 15m',
          prizes: [
            { name: 'Designer Item', rarity: 'rare' as const, probability: 40, imageUrl: '/CTSP credit 5gbp.png' },
            { name: 'Luxury Watch', rarity: 'epic' as const, probability: 35, imageUrl: '/CTSP credit 20gbp.png' },
            { name: 'Diamond Jewelry', rarity: 'legendary' as const, probability: 25, imageUrl: '/CTSP credit 1000gbp.png' }
          ]
        }
      ]
    },
    {
      title: 'Prize Spins',
      icon: '🎡',
      gradient: 'from-orange-500 to-yellow-500',
      competitions: [
        {
          id: 'ps-1',
          title: 'Gaming Spin',
          category: 'gaming' as const,
          description: 'Spin for gaming prizes!',
          entryPrice: 1.50,
          prizePool: 10000,
          participants: 6789,
          timeRemaining: '2h 45m',
          prizes: [
            { name: 'Game Credit', rarity: 'common' as const, probability: 45, imageUrl: '/CTSP credit 1gbp.png' },
            { name: 'Premium Skin', rarity: 'rare' as const, probability: 30, imageUrl: '/CTSP credit 5gbp.png' },
            { name: 'Gaming Bundle', rarity: 'epic' as const, probability: 20, imageUrl: '/CTSP credit 20gbp.png' },
            { name: 'Console', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP fiat 500.png' }
          ]
        },
        {
          id: 'ps-2',
          title: 'Tech Spin',
          category: 'electronics' as const,
          description: 'Win tech gadgets!',
          entryPrice: 3.50,
          prizePool: 20000,
          participants: 4567,
          timeRemaining: '5h 10m',
          prizes: [
            { name: 'Tech Accessory', rarity: 'common' as const, probability: 40, imageUrl: '/CTSP apple voucher 1.png' },
            { name: 'Tablet', rarity: 'rare' as const, probability: 35, imageUrl: '/CTSP apple voucher 1.png' },
            { name: 'Laptop', rarity: 'epic' as const, probability: 20, imageUrl: '/CTSP apple voucher 1.png' },
            { name: 'iPhone Pro', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP apple voucher 1.png' }
          ]
        }
      ]
    },
    {
      title: 'Instant Wins',
      icon: '💥',
      gradient: 'from-blue-500 to-cyan-500',
      competitions: [
        {
          id: 'iw-1',
          title: 'Quick Cash',
          category: 'crypto' as const,
          description: 'Instant cash prizes!',
          entryPrice: 1.00,
          prizePool: 5000,
          participants: 9876,
          timeRemaining: '1h 20m',
          prizes: [
            { name: '$2 Cash', rarity: 'common' as const, probability: 60, imageUrl: '/CTSP cash 1.png' },
            { name: '$10 Cash', rarity: 'rare' as const, probability: 25, imageUrl: '/CTSP cash 2.png' },
            { name: '$50 Cash', rarity: 'epic' as const, probability: 10, imageUrl: '/CTSP cash 3.png' },
            { name: '$200 Cash', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP credit 1000gbp.png' }
          ]
        },
        {
          id: 'iw-2',
          title: 'Flash Wins',
          category: 'gaming' as const,
          description: 'Win prizes instantly!',
          entryPrice: 2.00,
          prizePool: 8000,
          participants: 7654,
          timeRemaining: '3h 05m',
          prizes: [
            { name: 'Small Prize', rarity: 'common' as const, probability: 50, imageUrl: '/CTSP credit 1gbp.png' },
            { name: 'Medium Prize', rarity: 'rare' as const, probability: 30, imageUrl: '/CTSP credit 5gbp.png' },
            { name: 'Big Prize', rarity: 'epic' as const, probability: 15, imageUrl: '/CTSP credit 20gbp.png' },
            { name: 'Mega Prize', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP fiat 500.png' }
          ]
        }
      ]
    },
    {
      title: 'Daily Prizes',
      icon: '🏆',
      gradient: 'from-green-500 to-emerald-500',
      competitions: [
        {
          id: 'dp-1',
          title: 'Daily Jackpot',
          category: 'luxury' as const,
          description: 'New jackpot daily!',
          entryPrice: 5.50,
          prizePool: 30000,
          participants: 4321,
          timeRemaining: '8h 40m',
          prizes: [
            { name: 'Daily Reward', rarity: 'common' as const, probability: 40, imageUrl: '/CTSP credit 5gbp.png' },
            { name: 'Premium Item', rarity: 'rare' as const, probability: 35, imageUrl: '/CTSP credit 20gbp.png' },
            { name: 'Luxury Prize', rarity: 'epic' as const, probability: 20, imageUrl: '/CTSP credit 1000gbp.png' },
            { name: 'Grand Prize', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP fiat 500.png' }
          ]
        },
        {
          id: 'dp-2',
          title: 'Daily Tech Drop',
          category: 'electronics' as const,
          description: 'New tech every day!',
          entryPrice: 4.50,
          prizePool: 25000,
          participants: 5678,
          timeRemaining: '7h 25m',
          prizes: [
            { name: 'Tech Voucher', rarity: 'common' as const, probability: 45, imageUrl: '/CTSP apple voucher 1.png' },
            { name: 'Smart Device', rarity: 'rare' as const, probability: 30, imageUrl: '/CTSP apple voucher 1.png' },
            { name: 'Premium Tech', rarity: 'epic' as const, probability: 20, imageUrl: '/CTSP apple voucher 1.png' },
            { name: 'Latest Flagship', rarity: 'legendary' as const, probability: 5, imageUrl: '/CTSP apple voucher 1.png' }
          ]
        }
      ]
    }
  ];

  return (
    <div ref={scrollContainerRef} className="h-screen bg-black overflow-y-auto overflow-x-hidden">
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
      <main className="w-full flex justify-center">
        <div className="w-full max-w-md mx-auto px-1 md:px-0 pt-4 pb-32 mb-8 space-y-4 overflow-x-hidden">
          {/* Promo Slide */}
          <div className="w-full overflow-hidden">
            <PromoSlide />
          </div>

          {/* Category Sections */}
          {categories.map((category) => (
            <div key={category.title} className="w-full overflow-hidden">
              <CategorySection
                title={category.title}
                icon={category.icon}
                gradient={category.gradient}
                competitions={category.competitions}
              />
            </div>
          ))}

          <div className='h-4'></div>
        </div>
      </main>
    </div>
  );
}
