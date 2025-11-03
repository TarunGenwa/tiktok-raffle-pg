'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PrizesModal from './PrizesModal';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
}

interface InteractionSidebarProps {
  prizes: Prize[];
  competitionTitle: string;
}

interface InteractionButton {
  icon: React.ReactNode;
  count: string;
  label: string;
  isActive?: boolean;
}

export default function InteractionSidebar({ prizes, competitionTitle }: InteractionSidebarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(245000);
  const [isPrizesModalOpen, setIsPrizesModalOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
        {/* Prizes Button */}
        <Button
          onClick={() => setIsPrizesModalOpen(true)}
          variant="ghost"
          size="icon-lg"
          className="flex flex-col h-auto gap-0.5 sm:gap-1 transition-transform hover:scale-110 bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-1.5 sm:p-2"
        >
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span className="text-white text-[10px] sm:text-xs font-semibold">Prizes</span>
      </Button>

      {/* Tickets Button */}
      <Button variant="ghost" size="icon-lg" className="flex flex-col h-auto gap-0.5 sm:gap-1 transition-transform hover:scale-110 bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-1.5 sm:p-2">
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        </div>
        <span className="text-white text-[10px] sm:text-xs font-semibold">Tickets</span>
      </Button>

      {/* Like Button */}
      <Button
        onClick={handleLike}
        variant="ghost"
        size="icon-lg"
        className="flex flex-col h-auto gap-0.5 sm:gap-1 transition-transform hover:scale-110 bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-1.5 sm:p-2"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center">
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <span className="text-white text-[10px] sm:text-xs font-semibold">{formatCount(likes)}</span>
      </Button>

        {/* Comment Button */}
        <Button variant="ghost" size="icon-lg" className="flex flex-col h-auto gap-0.5 sm:gap-1 transition-transform hover:scale-110 bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-1.5 sm:p-2">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <span className="text-white text-[10px] sm:text-xs font-semibold">1.2K</span>
        </Button>
      </div>

      {/* Prizes Modal */}
      {isPrizesModalOpen && (
        <PrizesModal
          prizes={prizes}
          competitionTitle={competitionTitle}
          onClose={() => setIsPrizesModalOpen(false)}
        />
      )}
    </>
  );
}
