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

    // Prevent pull-to-refresh when swiping up
    if (diff > 0) {
      e.preventDefault();
    }
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
    <div className="flex h-screen bg-black overflow-hidden overscroll-none">
      {/* Left Sidebar - Navigation (Desktop Only) */}
      <aside className="hidden md:block w-20 bg-black border-r border-gray-800 flex-shrink-0">
        <NavSidebar />
      </aside>

      {/* Mobile Navigation - Always render NavSidebar for mobile bottom nav */}
      <div className="md:hidden">
        <NavSidebar />
      </div>

      {/* Main Content Area - Media Player */}
      <main
        className="flex-1 flex items-center justify-center relative overflow-hidden select-none pb-20 md:pb-0 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          overscrollBehavior: 'none'
        }}
      >
        <div className="w-full max-w-md h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] mx-auto relative px-2 md:px-0">
          {/* Competitions Stack with Smooth Transitions */}
          <div className="relative w-full h-full">
            {competitions.map((competition, index) => {
              const offset = index - currentCompetitionIndex;
              const isActive = index === currentCompetitionIndex;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              if (!isVisible) return null;

              // Calculate transform based on position and drag
              let translateY = offset * 100; // Base offset in vh
              if (isDragging) {
                translateY -= (dragOffset / window.innerHeight) * 100;
              }

              // Calculate opacity
              let opacity = 1;
              if (!isActive) {
                opacity = 0.3;
              }
              if (isDragging && isActive) {
                const progress = Math.abs(dragOffset) / 300;
                opacity = Math.max(1 - progress, 0.3);
              }

              // Calculate scale
              let scale = 1;
              if (!isActive) {
                scale = 0.85;
              }
              if (isDragging && isActive) {
                const progress = Math.abs(dragOffset) / 300;
                scale = Math.max(1 - progress * 0.15, 0.85);
              }

              // Calculate blur
              const blur = isActive ? 0 : 8;

              return (
                <div
                  key={competition.id}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: `translateY(${translateY}%) scale(${scale})`,
                    opacity: opacity,
                    filter: `blur(${blur}px)`,
                    transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex: isActive ? 10 : isPrev ? 9 : isNext ? 8 : 0,
                  }}
                >
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
                    isActive={isActive}
                  />

                  {/* Competition Counter (Mobile Only) */}
                  {isActive && (
                    <div className="md:hidden absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-xs sm:text-sm z-20 pointer-events-none">
                      {index + 1} / {competitions.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Swipe Indicator */}
          {isDragging && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="bg-black/70 rounded-full p-3 sm:p-4">
                {dragOffset > minSwipeDistance && currentCompetitionIndex < competitions.length - 1 && (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {dragOffset < -minSwipeDistance && currentCompetitionIndex > 0 && (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons (Desktop) */}
        <div className="hidden md:flex absolute left-24 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
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
        <div className="absolute right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-10">
          <InteractionSidebar
            prizes={currentCompetition.prizes}
            competitionTitle={currentCompetition.title}
          />
        </div>
      </main>
    </div>
  );
}
