'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
}

interface Ticket {
  type: string;
  quantity: number;
  price: number;
  color: string;
  description: string;
}

interface InteractionSidebarProps {
  prizes: Prize[];
  competitionTitle: string;
}

export default function InteractionSidebar({ prizes, competitionTitle }: InteractionSidebarProps) {
  const [activeTab, setActiveTab] = useState<'prizes' | 'tickets' | null>('prizes');

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

  const tickets: Ticket[] = [
    {
      type: 'Single Entry',
      quantity: 1,
      price: 5.00,
      color: 'from-blue-500 to-blue-600',
      description: 'One entry into the raffle'
    },
    {
      type: 'Bundle Pack',
      quantity: 5,
      price: 20.00,
      color: 'from-purple-500 to-purple-600',
      description: 'Five entries - 20% discount'
    },
    {
      type: 'Mega Pack',
      quantity: 10,
      price: 35.00,
      color: 'from-orange-500 to-yellow-500',
      description: 'Ten entries - 30% discount'
    },
    {
      type: 'Ultimate Pack',
      quantity: 25,
      price: 75.00,
      color: 'from-pink-500 to-rose-600',
      description: 'Twenty-five entries - 40% discount'
    }
  ];

  const handleTabClick = (tab: 'prizes' | 'tickets') => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="w-full max-w-md mx-auto relative flex justify-center">
      {/* Buttons */}
      <div className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 border border-gray-700/50 shadow-lg">
        {/* Prizes Button */}
        <Button
          onClick={() => handleTabClick('prizes')}
          variant="ghost"
          className={`flex items-center gap-2 h-auto px-4 py-2 transition-all rounded-full ${
            activeTab === 'prizes' ? 'bg-emerald-600/80 hover:bg-emerald-600/90' : 'hover:bg-gray-700/80'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-white text-sm font-semibold whitespace-nowrap">Prizes</span>
        </Button>

        {/* Tickets Button */}
        <Button
          onClick={() => handleTabClick('tickets')}
          variant="ghost"
          className={`flex items-center gap-2 h-auto px-4 py-2 transition-all rounded-full ${
            activeTab === 'tickets' ? 'bg-emerald-600/80 hover:bg-emerald-600/90' : 'hover:bg-gray-700/80'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-white text-sm font-semibold whitespace-nowrap">Tickets</span>
        </Button>
      </div>

      {/* Drawer Content */}
      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-gray-700 transition-all duration-300 z-50 ${
          activeTab ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
        }`}
      >
        <div className="p-4">
          {/* Prizes Content */}
          {activeTab === 'prizes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Prize Pool</h3>
                <button
                  onClick={() => setActiveTab(null)}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {prizes.map((prize, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br ${rarityColors[prize.rarity]} rounded-lg p-3 border-2 ${rarityBorders[prize.rarity]} shadow-lg`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white">{prize.name}</h3>
                      <p className="text-xs text-white/80 capitalize mt-0.5">{prize.rarity}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-white/70">Win Rate</div>
                        <div className="text-base font-bold text-white">{prize.probability}%</div>
                      </div>
                      <div className="mt-2 h-1.5 bg-black/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/50 rounded-full"
                          style={{ width: `${prize.probability}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Total Prizes</span>
                  <span className="text-white font-bold">{prizes.length}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tickets Content */}
          {activeTab === 'tickets' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Ticket Options</h3>
                <button
                  onClick={() => setActiveTab(null)}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br ${ticket.color} rounded-lg p-3 shadow-lg`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white">{ticket.type}</h3>
                        <p className="text-xs text-white/80 mt-0.5">{ticket.description}</p>
                        <div className="mt-2 inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                          <span className="text-xs font-semibold text-white">{ticket.quantity} {ticket.quantity === 1 ? 'Entry' : 'Entries'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <div className="text-lg font-bold text-white">${ticket.price}</div>
                      {ticket.quantity > 1 && (
                        <div className="text-xs text-white/70">${(ticket.price / ticket.quantity).toFixed(2)} ea</div>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white font-bold py-1.5 rounded-lg text-sm"
                  >
                    Buy Now
                  </Button>
                </div>
              ))}

              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="text-xs text-gray-400 mb-2">My Tickets</div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Active</span>
                  <span className="text-green-400 font-bold">8</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
