'use client';

import { useState } from 'react';
import WinnerPost from '../components/WinnerPost';

interface WinnerPostType {
  id: string;
  username: string;
  avatar: string;
  competitionTitle: string;
  prize: string;
  prizeRarity: 'common' | 'rare' | 'epic' | 'legendary';
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: string;
  likes: number;
  comments: number;
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<'all' | 'legendary' | 'epic' | 'rare'>('all');

  const winnerPosts: WinnerPostType[] = [
    {
      id: '1',
      username: '@cryptoking_23',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cryptoking',
      competitionTitle: 'Bitcoin Bonanza',
      prize: '1 BTC',
      prizeRarity: 'legendary',
      content: 'OMG! I can\'t believe I just won 1 FULL BITCOIN! 🚀 This is absolutely insane! Thank you so much @SpinWin! My hands were literally shaking when I saw the result. Dreams do come true! 💎🙌',
      mediaUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop',
      mediaType: 'image',
      timestamp: '2 hours ago',
      likes: 15234,
      comments: 892
    },
    {
      id: '2',
      username: '@gamer_girl_pro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamergirl',
      competitionTitle: 'Gaming Legends',
      prize: 'PS5 Console',
      prizeRarity: 'legendary',
      content: 'YESSSS! Finally got my PS5! 🎮 Been trying to get one for months and SpinWin came through! Already set it up and playing Spider-Man 2. This thing is a BEAST! Thank you!! 🕷️💙',
      timestamp: '5 hours ago',
      likes: 8432,
      comments: 456
    },
    {
      id: '3',
      username: '@luxlife_sarah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      competitionTitle: 'Luxury Collection',
      prize: 'Rolex Watch',
      prizeRarity: 'legendary',
      content: 'Still in disbelief... Just won a ROLEX WATCH! ⌚✨ This is my first luxury watch and I\'m absolutely speechless. The craftsmanship is incredible. SpinWin is legit guys! 💫',
      mediaUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=600&fit=crop',
      mediaType: 'image',
      timestamp: '8 hours ago',
      likes: 12567,
      comments: 734
    },
    {
      id: '4',
      username: '@tech_enthusiast',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techenthusiast',
      competitionTitle: 'Tech Paradise',
      prize: 'iPhone 15 Pro',
      prizeRarity: 'legendary',
      content: 'New iPhone 15 Pro just arrived! 📱 The camera on this thing is absolutely incredible. Titanium finish looks so premium. Shoutout to SpinWin for making this possible! 🔥',
      timestamp: '12 hours ago',
      likes: 9876,
      comments: 543
    },
    {
      id: '5',
      username: '@nft_collector',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nftcollector',
      competitionTitle: 'NFT Megadrop',
      prize: 'Legendary NFT',
      prizeRarity: 'legendary',
      content: 'Just scored a legendary NFT from the megadrop! 🎨 Floor price is already at 5 ETH! This is the best day ever. SpinWin changing lives out here! 🚀💎',
      mediaUrl: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&h=600&fit=crop',
      mediaType: 'image',
      timestamp: '1 day ago',
      likes: 11234,
      comments: 678
    },
    {
      id: '6',
      username: '@setup_master',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=setupmaster',
      competitionTitle: 'Esports Champions',
      prize: 'Full Setup',
      prizeRarity: 'epic',
      content: 'My new gaming setup just arrived!! 🖥️⌨️🖱️ RTX 4080, 240Hz monitor, mechanical keyboard, gaming mouse... This is a complete game changer! My KD is about to go crazy 📈',
      timestamp: '1 day ago',
      likes: 7654,
      comments: 432
    },
    {
      id: '7',
      username: '@crypto_degen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cryptodegen',
      competitionTitle: 'Bitcoin Bonanza',
      prize: '$500 ETH',
      prizeRarity: 'epic',
      content: 'Won $500 in ETH! 💰 Not the 1 BTC but still amazing! Already staked it for some passive income. SpinWin stays winning! 📊',
      timestamp: '2 days ago',
      likes: 5432,
      comments: 287
    },
    {
      id: '8',
      username: '@fashion_queen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fashionqueen',
      competitionTitle: 'Designer Dreams',
      prize: 'Designer Bag',
      prizeRarity: 'rare',
      content: 'OMG the designer bag is even more beautiful in person! 👜✨ Perfect for the holiday season. Thank you SpinWin! 💕',
      mediaUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop',
      mediaType: 'image',
      timestamp: '3 days ago',
      likes: 6789,
      comments: 345
    },
    {
      id: '9',
      username: '@smart_home_guy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smarthome',
      competitionTitle: 'Smart Home Hub',
      prize: 'Home Security Kit',
      prizeRarity: 'epic',
      content: 'Just installed my new home security system! 🏠🔒 Cameras, sensors, smart locks - the whole package. My house is now Fort Knox! Thanks SpinWin! 🛡️',
      timestamp: '3 days ago',
      likes: 4567,
      comments: 234
    },
    {
      id: '10',
      username: '@gaming_legend',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gaminglegend',
      competitionTitle: 'Gaming Legends',
      prize: 'Epic Bundle',
      prizeRarity: 'epic',
      content: 'The epic bundle came with SO MUCH STUFF! 🎁 Skins, emotes, battle passes... I\'m set for the entire season! Best raffle ever! 🎮',
      timestamp: '4 days ago',
      likes: 5678,
      comments: 312
    },
    {
      id: '11',
      username: '@apple_fanboy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=applefanboy',
      competitionTitle: 'Tech Paradise',
      prize: 'MacBook',
      prizeRarity: 'epic',
      content: 'New MacBook Pro just arrived! 💻 M3 chip is INSANELY fast. This thing renders videos like butter. Thank you @SpinWin! 🚀',
      mediaUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      mediaType: 'image',
      timestamp: '5 days ago',
      likes: 8901,
      comments: 456
    },
    {
      id: '12',
      username: '@headset_hero',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=headsethero',
      competitionTitle: 'Lennie Special',
      prize: 'Gaming Chair',
      prizeRarity: 'epic',
      content: 'This gaming chair is SO comfortable! 🪑 RGB lights, lumbar support, adjustable everything. My back already feels better after 8 hour sessions. Worth! 💪',
      timestamp: '6 days ago',
      likes: 4321,
      comments: 198
    }
  ];

  const filters = [
    { id: 'all', label: 'All Winners', emoji: '🎉' },
    { id: 'legendary', label: 'Legendary', emoji: '💎' },
    { id: 'epic', label: 'Epic', emoji: '🔥' },
    { id: 'rare', label: 'Rare', emoji: '⭐' }
  ];

  const filteredPosts = filter === 'all'
    ? winnerPosts
    : winnerPosts.filter(post => post.prizeRarity === filter);

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Main Content Area */}
      <main className="h-full overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-6 md:py-8">
          {/* Header */}
          {/* <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Activity Feed</h1>
              <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-400 text-sm md:text-base">See what our lucky winners are celebrating!</p>
          </div> */}

          {/* Filters */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                    filter === filterOption.id
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{filterOption.emoji}</span>
                  <span>{filterOption.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mb-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{winnerPosts.length}</div>
                <div className="text-xs text-gray-400">Winners Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">$250k+</div>
                <div className="text-xs text-gray-400">Prizes Won</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">50k+</div>
                <div className="text-xs text-gray-400">Total Entries</div>
              </div>
            </div>
          </div>

          {/* Winner Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <WinnerPost key={post.id} {...post} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">No winners yet</h3>
              <p className="text-gray-400">Check back soon for amazing winner stories!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
