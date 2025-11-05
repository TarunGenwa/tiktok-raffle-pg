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

export default function InteractionSidebar({ prizes, competitionTitle }: InteractionSidebarProps) {
  const [isPrizesModalOpen, setIsPrizesModalOpen] = useState(false);

  return (
    <>
      <div className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 border border-gray-700/50 shadow-lg">
        {/* Prizes Button */}
        <Button
          onClick={() => setIsPrizesModalOpen(true)}
          variant="ghost"
          className="flex items-center gap-2 h-auto px-4 py-2 transition-all hover:bg-gray-700/80 rounded-full"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-white text-sm font-semibold whitespace-nowrap">Prizes</span>
        </Button>

        {/* Tickets Button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-auto px-4 py-2 transition-all hover:bg-gray-700/80 rounded-full"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-white text-sm font-semibold whitespace-nowrap">Tickets</span>
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
