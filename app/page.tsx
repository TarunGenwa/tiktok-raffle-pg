'use client';

import { useState, useEffect, useRef } from 'react';
import NavSidebar from './components/NavSidebar';
import MysteryBox from './components/MysteryBox';
import InteractionSidebar from './components/InteractionSidebar';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image?: string;
}

interface RaffleBox {
  id: string;
  title: string;
  description: string;
  price: number;
  prizes: Prize[];
}

export default function Home() {
  const raffleBoxes: RaffleBox[] = [
    {
      id: '1',
      title: 'Starter Pack',
      description: 'Perfect for beginners! Get your first prize',
      price: 9.99,
      prizes: [
        { name: 'Bronze Coin', rarity: 'common' },
        { name: 'Silver Coin', rarity: 'common' },
        { name: 'Gold Coin', rarity: 'rare' },
        { name: 'Lucky Charm', rarity: 'rare' },
        { name: 'Diamond Ring', rarity: 'epic' },
        { name: 'Jackpot Ticket', rarity: 'legendary' }
      ]
    },
    {
      id: '2',
      title: 'Premium Box',
      description: 'Higher chances for rare prizes!',
      price: 24.99,
      prizes: [
        { name: 'Rare Gem', rarity: 'rare' },
        { name: 'Epic Sword', rarity: 'epic' },
        { name: 'Legendary Shield', rarity: 'epic' },
        { name: 'Golden Crown', rarity: 'legendary' },
        { name: 'Dragon Egg', rarity: 'legendary' }
      ]
    },
    {
      id: '3',
      title: 'Ultimate Raffle',
      description: 'The best prizes await you!',
      price: 49.99,
      prizes: [
        { name: 'Mythic Armor', rarity: 'epic' },
        { name: 'Legendary Weapon', rarity: 'legendary' },
        { name: 'Ultimate Prize', rarity: 'legendary' },
        { name: 'Exclusive Skin', rarity: 'legendary' }
      ]
    }
  ];

  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  const goToNextBox = () => {
    if (currentBoxIndex < raffleBoxes.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentBoxIndex((prev) => prev + 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  };

  const goToPreviousBox = () => {
    if (currentBoxIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentBoxIndex((prev) => prev - 1);
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
      goToNextBox();
    } else if (isSwipeDown) {
      goToPreviousBox();
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
      goToNextBox();
    } else if (isSwipeDown) {
      goToPreviousBox();
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


  const currentBox = raffleBoxes[currentBoxIndex];

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
          {/* Single Mystery Box with Smooth Transition */}
          <div
            key={currentBoxIndex}
            className="relative w-full h-full"
            style={{
              transform: isDragging ? `translateY(${-dragOffset * 0.5}px) scale(${getScale()})` : 'translateY(0) scale(1)',
              opacity: getOpacity(),
              transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          >
            <MysteryBox
              id={currentBox.id}
              title={currentBox.title}
              description={currentBox.description}
              price={currentBox.price}
              prizes={currentBox.prizes}
            />

            {/* Box Counter */}
            <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm z-20 pointer-events-none">
              {currentBoxIndex + 1} / {raffleBoxes.length}
            </div>
          </div>

          {/* Swipe Indicator */}
          {isDragging && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="bg-black/70 rounded-full p-4">
                {dragOffset > minSwipeDistance && currentBoxIndex < raffleBoxes.length - 1 && (
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {dragOffset < -minSwipeDistance && currentBoxIndex > 0 && (
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Interactions (Overlaid on media player) */}
        <div className="absolute right-8 bottom-24 z-10">
          <InteractionSidebar />
        </div>
      </main>
    </div>
  );
}
