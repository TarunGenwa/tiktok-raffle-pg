'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

interface Ticket {
  type: string;
  quantity: number;
  price: number;
  color: string;
  description: string;
}

interface TicketsModalProps {
  competitionTitle: string;
  onClose: () => void;
}

export default function TicketsModal({ competitionTitle, onClose }: TicketsModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mock ticket data - in a real app, this would come from props or API
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

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed top-0 right-0 bottom-0 z-[100] flex items-center justify-end transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop overlay only on left side */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" onClick={handleClose}></div>

      <div
        className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-l-2xl shadow-2xl w-[85vw] sm:w-[320px] md:w-[360px] max-w-[360px] h-full overflow-hidden border-l-2 border-y-2 border-gray-700 transition-all duration-300 mr-16 sm:mr-20 md:mr-28 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">{competitionTitle}</h2>
              <p className="text-xs text-gray-400 mt-1">Ticket Options</p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
          <div className="space-y-3">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${ticket.color} rounded-lg p-4 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-start justify-between">
                  {/* Ticket Icon & Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white">{ticket.type}</h3>
                      <p className="text-xs text-white/80 mt-0.5">{ticket.description}</p>

                      {/* Quantity Badge */}
                      <div className="mt-2 inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span className="text-xs font-semibold text-white">{ticket.quantity} {ticket.quantity === 1 ? 'Entry' : 'Entries'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end ml-2">
                    <div className="text-xl font-bold text-white">${ticket.price}</div>
                    {ticket.quantity > 1 && (
                      <div className="text-xs text-white/70">${(ticket.price / ticket.quantity).toFixed(2)} each</div>
                    )}
                  </div>
                </div>

                {/* Buy Button */}
                <Button
                  className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg text-sm backdrop-blur-sm transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle purchase
                  }}
                >
                  Buy Now
                </Button>
              </div>
            ))}
          </div>

          {/* My Tickets Section */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-white mb-3">My Tickets</h3>
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs">Total Entries</span>
                <span className="text-white font-bold text-lg">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Active Tickets</span>
                <span className="text-green-400 font-bold">8</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400 text-xs">Used Tickets</span>
                <span className="text-gray-500 font-bold">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-800 to-gray-900 p-3 border-t border-gray-700">
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 rounded-full text-sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
