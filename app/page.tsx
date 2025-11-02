'use client';

import { useState } from 'react';
import NavSidebar from './components/NavSidebar';
import Competition from './components/Competition';
import InteractionSidebar from './components/InteractionSidebar';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
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
}

export default function Home() {
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
        { name: '$10 BTC', rarity: 'common', probability: 40 },
        { name: '$50 ETH', rarity: 'common', probability: 25 },
        { name: '$100 BTC', rarity: 'rare', probability: 20 },
        { name: '$500 ETH', rarity: 'epic', probability: 10 },
        { name: '1 BTC', rarity: 'legendary', probability: 5 }
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
        { name: 'Common Skin', rarity: 'common', probability: 45 },
        { name: 'Rare Emote', rarity: 'rare', probability: 30 },
        { name: 'Epic Bundle', rarity: 'epic', probability: 15 },
        { name: 'PS5 Console', rarity: 'legendary', probability: 10 }
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
        { name: 'Designer Watch', rarity: 'rare', probability: 35 },
        { name: 'Gold Chain', rarity: 'rare', probability: 30 },
        { name: 'Diamond Ring', rarity: 'epic', probability: 20 },
        { name: 'Rolex Watch', rarity: 'legendary', probability: 15 }
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
        { name: 'AirPods', rarity: 'common', probability: 40 },
        { name: 'iPad', rarity: 'rare', probability: 30 },
        { name: 'MacBook', rarity: 'epic', probability: 20 },
        { name: 'iPhone 15 Pro', rarity: 'legendary', probability: 10 }
      ]
    }
  ];

  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  const goToNextCompetition = () => {
    if (currentCompetitionIndex < competitions.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentCompetitionIndex((prev) => prev + 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  };

  const goToPreviousCompetition = () => {
    if (currentCompetitionIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentCompetitionIndex((prev) => prev - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.targetTouches[0].clientY;
    const diff = touchStart - currentTouch;
    setDragOffset(diff);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    if (isSwipeUp) {
      goToNextCompetition();
    } else if (isSwipeDown) {
      goToPreviousCompetition();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse event handlers for desktop
  const [mouseStart, setMouseStart] = useState<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientY);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (mouseStart === null) return;

    const diff = mouseStart - e.clientY;
    setDragOffset(diff);
  };

  const onMouseUp = () => {
    if (mouseStart === null) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    // Use the accumulated dragOffset instead of recalculating
    const isSwipeUp = dragOffset > minSwipeDistance;
    const isSwipeDown = dragOffset < -minSwipeDistance;

    if (isSwipeUp) {
      goToNextCompetition();
    } else if (isSwipeDown) {
      goToPreviousCompetition();
    }

    // Reset all states
    setIsDragging(false);
    setDragOffset(0);
    setMouseStart(null);
  };

  const onMouseLeave = () => {
    // Reset all states when mouse leaves
    setIsDragging(false);
    setDragOffset(0);
    setMouseStart(null);
  };


  const currentCompetition = competitions[currentCompetitionIndex];

  // Calculate opacity and transform based on drag
  const getOpacity = () => {
    if (!isDragging) return 1;
    const progress = Math.abs(dragOffset) / 200;
    return Math.max(1 - progress, 0.3);
  };

  const getScale = () => {
    if (!isDragging) return 1;
    const progress = Math.abs(dragOffset) / 200;
    return Math.max(1 - progress * 0.1, 0.9);
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <aside className="w-20 bg-black border-r border-gray-800 flex-shrink-0">
        <NavSidebar />
      </aside>

      {/* Main Content Area - Media Player */}
      <main
        className="flex-1 flex items-center justify-center relative overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <div className="w-full max-w-md h-[calc(100vh-4rem)] mx-auto relative">
          {/* Single Competition with Smooth Transition */}
          <div
            key={currentCompetitionIndex}
            className="relative w-full h-full"
            style={{
              transform: isDragging ? `translateY(${-dragOffset * 0.5}px) scale(${getScale()})` : 'translateY(0) scale(1)',
              opacity: getOpacity(),
              transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          >
            <Competition
              id={currentCompetition.id}
              title={currentCompetition.title}
              category={currentCompetition.category}
              description={currentCompetition.description}
              entryPrice={currentCompetition.entryPrice}
              prizePool={currentCompetition.prizePool}
              participants={currentCompetition.participants}
              timeRemaining={currentCompetition.timeRemaining}
              prizes={currentCompetition.prizes}
              sponsored={currentCompetition.sponsored}
            />

            {/* Competition Counter (Mobile Only) */}
            <div className="md:hidden absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm z-20 pointer-events-none">
              {currentCompetitionIndex + 1} / {competitions.length}
            </div>
          </div>

          {/* Swipe Indicator */}
          {isDragging && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="bg-black/70 rounded-full p-4">
                {dragOffset > minSwipeDistance && currentCompetitionIndex < competitions.length - 1 && (
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {dragOffset < -minSwipeDistance && currentCompetitionIndex > 0 && (
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons (Desktop) */}
        <div className="hidden md:flex absolute right-24 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
          {/* Up Button */}
          <Button
            onClick={goToPreviousCompetition}
            disabled={currentCompetitionIndex === 0}
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-800/80 hover:bg-gray-700/80 border-2 border-white/20 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
          </Button>

          {/* Competition Progress Indicator */}
          <div className="bg-gray-800/80 rounded-full px-4 py-2 border-2 border-white/20 shadow-xl">
            <div className="text-white text-sm font-bold text-center">
              {currentCompetitionIndex + 1} / {competitions.length}
            </div>
          </div>

          {/* Down Button */}
          <Button
            onClick={goToNextCompetition}
            disabled={currentCompetitionIndex === competitions.length - 1}
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-800/80 hover:bg-gray-700/80 border-2 border-white/20 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>

        {/* Right Sidebar - Interactions (Overlaid on media player) */}
        <div className="absolute right-8 bottom-24 z-10">
          <InteractionSidebar />
        </div>
      </main>
    </div>
  );
}
