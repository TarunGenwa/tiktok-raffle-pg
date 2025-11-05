'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PastWin {
  id: string;
  prize: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  competition: string;
  date: string;
  value: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'wins' | 'stats' | 'settings'>('wins');

  const userStats = {
    username: '@lucky_winner_99',
    displayName: 'Alex Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucky99',
    memberSince: 'January 2024',
    totalEntries: 247,
    totalWins: 18,
    totalValue: 8450,
    winRate: 7.3,
    favoriteCategory: 'Gaming',
    currentStreak: 3,
    longestStreak: 12
  };

  const pastWins: PastWin[] = [
    {
      id: '1',
      prize: 'RTX 4090',
      rarity: 'legendary',
      competition: 'Lennie Special',
      date: '2 days ago',
      value: '$1,599'
    },
    {
      id: '2',
      prize: 'Gaming Chair',
      rarity: 'epic',
      competition: 'Esports Champions',
      date: '5 days ago',
      value: '$399'
    },
    {
      id: '3',
      prize: 'MacBook',
      rarity: 'epic',
      competition: 'Tech Paradise',
      date: '1 week ago',
      value: '$1,299'
    },
    {
      id: '4',
      prize: '$500 ETH',
      rarity: 'epic',
      competition: 'Bitcoin Bonanza',
      date: '1 week ago',
      value: '$500'
    },
    {
      id: '5',
      prize: 'iPad',
      rarity: 'rare',
      competition: 'Tech Paradise',
      date: '2 weeks ago',
      value: '$599'
    },
    {
      id: '6',
      prize: 'RGB Keyboard',
      rarity: 'rare',
      competition: 'Gaming Legends',
      date: '2 weeks ago',
      value: '$149'
    },
    {
      id: '7',
      prize: 'Designer Watch',
      rarity: 'rare',
      competition: 'Luxury Collection',
      date: '3 weeks ago',
      value: '$799'
    },
    {
      id: '8',
      prize: 'AirPods',
      rarity: 'common',
      competition: 'Tech Paradise',
      date: '3 weeks ago',
      value: '$249'
    },
    {
      id: '9',
      prize: 'Gaming Headset',
      rarity: 'common',
      competition: 'Gaming Legends',
      date: '1 month ago',
      value: '$129'
    },
    {
      id: '10',
      prize: 'Smart Speaker',
      rarity: 'common',
      competition: 'Smart Home Hub',
      date: '1 month ago',
      value: '$99'
    }
  ];

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

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Main Content Area */}
      <main className="h-full overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-6 md:py-8">
          {/* Profile Header */}
          <div className="mb-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={userStats.avatar}
                  alt={userStats.displayName}
                  className="w-20 h-20 rounded-full border-4 border-green-500"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">{userStats.displayName}</h1>
                <p className="text-gray-400">{userStats.username}</p>
                <p className="text-sm text-gray-500">Member since {userStats.memberSince}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-white">{userStats.totalEntries}</div>
                <div className="text-xs text-gray-400">Entries</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.totalWins}</div>
                <div className="text-xs text-gray-400">Wins</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-yellow-400">{userStats.winRate}%</div>
                <div className="text-xs text-gray-400">Win Rate</div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
              Edit Profile
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('wins')}
              className={`flex-1 py-3 font-medium text-sm transition-all ${
                activeTab === 'wins'
                  ? 'text-white border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Past Wins
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 font-medium text-sm transition-all ${
                activeTab === 'stats'
                  ? 'text-white border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 font-medium text-sm transition-all ${
                activeTab === 'settings'
                  ? 'text-white border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'wins' && (
            <div className="space-y-3">
              {/* Total Value Banner */}
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Prize Value Won</div>
                  <div className="text-3xl font-bold text-green-400">${userStats.totalValue.toLocaleString()}</div>
                </div>
              </div>

              {/* Wins List */}
              {pastWins.map((win) => (
                <div
                  key={win.id}
                  className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${rarityColors[win.rarity]} px-3 py-1 rounded-full border-2 ${rarityBorders[win.rarity]} mb-2`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-white font-bold text-sm">{win.prize}</span>
                      </div>
                      <div className="text-sm text-gray-400">{win.competition}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">{win.value}</div>
                      <div className="text-xs text-gray-500">{win.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              {/* Performance Stats */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-white font-bold mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Entries</span>
                    <span className="text-white font-bold">{userStats.totalEntries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Wins</span>
                    <span className="text-green-400 font-bold">{userStats.totalWins}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-yellow-400 font-bold">{userStats.winRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Value Won</span>
                    <span className="text-green-400 font-bold">${userStats.totalValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Streaks */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-white font-bold mb-4">Streaks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Streak</span>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-400 font-bold">{userStats.currentStreak}</span>
                      <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Longest Streak</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 font-bold">{userStats.longestStreak}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Favorite Category */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-white font-bold mb-4">Preferences</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Favorite Category</span>
                  <span className="text-purple-400 font-bold">{userStats.favoriteCategory}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Account Settings */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-white font-bold mb-4">Account</h3>
                <div className="space-y-3">
                  <button className="w-full text-left py-2 text-gray-300 hover:text-white transition-colors flex items-center justify-between">
                    <span>Change Username</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="w-full text-left py-2 text-gray-300 hover:text-white transition-colors flex items-center justify-between">
                    <span>Change Email</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="w-full text-left py-2 text-gray-300 hover:text-white transition-colors flex items-center justify-between">
                    <span>Change Password</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-white font-bold mb-4">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Push Notifications</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email Updates</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Winner Announcements</span>
                    <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-950/20 rounded-xl border border-red-900/50 p-4">
                <h3 className="text-red-400 font-bold mb-4">Danger Zone</h3>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
