'use client';

import { useState } from 'react';
import NavSidebar from '../components/NavSidebar';
import CompetitionCard from '../components/CompetitionCard';

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

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    },
    {
      id: '5',
      title: 'NFT Megadrop',
      category: 'crypto',
      description: 'Rare NFTs and exclusive digital collectibles!',
      entryPrice: 7.50,
      prizePool: 75000,
      participants: 11234,
      timeRemaining: '6h 45m',
      prizes: [
        { name: 'Common NFT', rarity: 'common', probability: 40, imageUrl: '/CTSP credit 1gbp.png' },
        { name: 'Rare NFT', rarity: 'rare', probability: 30, imageUrl: '/CTSP credit 5gbp.png' },
        { name: 'Epic Collection', rarity: 'epic', probability: 20, imageUrl: '/CTSP credit 20gbp.png' },
        { name: 'Legendary NFT', rarity: 'legendary', probability: 10, imageUrl: '/CTSP credit 1000gbp.png' }
      ]
    },
    {
      id: '6',
      title: 'Esports Champions',
      category: 'gaming',
      description: 'Championship gaming peripherals and tournament entries!',
      entryPrice: 5.50,
      prizePool: 40000,
      participants: 13567,
      timeRemaining: '7h 30m',
      prizes: [
        { name: 'Pro Mouse', rarity: 'common', probability: 35, imageUrl: '/CTSP credit 1gbp.png' },
        { name: 'Gaming Monitor', rarity: 'rare', probability: 30, imageUrl: '/CTSP credit 5gbp.png' },
        { name: 'Full Setup', rarity: 'epic', probability: 20, imageUrl: '/CTSP credit 20gbp.png' },
        { name: 'Tournament Entry', rarity: 'legendary', probability: 15, imageUrl: '/CTSP disneyland ticket.png' }
      ]
    },
    {
      id: '7',
      title: 'Designer Dreams',
      category: 'luxury',
      description: 'High-end fashion and luxury accessories!',
      entryPrice: 12.00,
      prizePool: 120000,
      participants: 6789,
      timeRemaining: '4h 55m',
      prizes: [
        { name: 'Designer Bag', rarity: 'rare', probability: 35, imageUrl: '/CTSP credit 5gbp.png' },
        { name: 'Luxury Wallet', rarity: 'rare', probability: 30, imageUrl: '/CTSP credit 20gbp.png' },
        { name: 'Premium Sunglasses', rarity: 'epic', probability: 20, imageUrl: '/CTSP credit 20gbp.png' },
        { name: 'Limited Edition Watch', rarity: 'legendary', probability: 15, imageUrl: '/CTSP credit 1000gbp.png' }
      ]
    },
    {
      id: '8',
      title: 'Smart Home Hub',
      category: 'electronics',
      description: 'Transform your home with cutting-edge tech!',
      entryPrice: 6.00,
      prizePool: 45000,
      participants: 14321,
      timeRemaining: '8h 15m',
      prizes: [
        { name: 'Smart Speaker', rarity: 'common', probability: 40, imageUrl: '/CTSP apple voucher 1.png' },
        { name: 'Smart Display', rarity: 'rare', probability: 30, imageUrl: '/CTSP apple voucher 1.png' },
        { name: 'Home Security Kit', rarity: 'epic', probability: 20, imageUrl: '/CTSP apple voucher 1.png' },
        { name: 'Full Smart Home', rarity: 'legendary', probability: 10, imageUrl: '/CTSP fiat 500.png' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'crypto', label: 'Crypto', icon: '🔐' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'luxury', label: 'Luxury', icon: '💎' },
    { id: 'electronics', label: 'Tech', icon: '📱' }
  ];

  const filteredCompetitions = competitions.filter((comp) => {
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Left Sidebar - Navigation (Desktop Only) */}
      <aside className="hidden md:block w-20 bg-black border-r border-gray-800 flex-shrink-0">
        <NavSidebar />
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <NavSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Header */}
          {/* <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Competitions</h1>
            <p className="text-gray-400 text-sm md:text-base">Discover and enter exciting raffles to win amazing prizes!</p>
          </div> */}

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search competitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6 md:mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {cat.id === 'all' ? competitions.length : competitions.filter(c => c.category === cat.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-400 text-sm">
            Showing {filteredCompetitions.length} {filteredCompetitions.length === 1 ? 'competition' : 'competitions'}
          </div>

          {/* Competition Grid */}
          {filteredCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCompetitions.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  {...competition}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No competitions found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
