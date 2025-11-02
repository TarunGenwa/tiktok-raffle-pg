'use client';

import { useState, useEffect } from 'react';
import NavSidebar from './components/NavSidebar';
import MediaPlayer from './components/MediaPlayer';
import InteractionSidebar from './components/InteractionSidebar';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  username: string;
  description: string;
  isYouTube: boolean;
}

export default function Home() {
  const videos: Video[] = [
    {
      id: 'umv6QomfI-M',
      username: '@creator1',
      description: 'Amazing content! #trending #viral',
      isYouTube: true
    },
    {
      id: 'Xpjys8XTzuk',
      username: '@creator2',
      description: 'Check this out! #fyp #shorts',
      isYouTube: true
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const goToPreviousVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToNextVideo();
      } else if (e.key === 'ArrowUp') {
        goToPreviousVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <aside className="w-20 bg-black border-r border-gray-800 flex-shrink-0">
        <NavSidebar />
      </aside>

      {/* Main Content Area - Media Player */}
      <main className="flex-1 flex items-center justify-center relative">
        <div className="w-full max-w-md h-[calc(100vh-4rem)] mx-auto relative">
          <MediaPlayer
            videoId={currentVideo.id}
            username={currentVideo.username}
            description={currentVideo.description}
            isYouTube={currentVideo.isYouTube}
          />

          {/* Video Navigation Controls */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <Button
              onClick={goToPreviousVideo}
              size="icon"
              variant="ghost"
              className="bg-black/50 hover:bg-black/70 rounded-full"
              disabled={currentVideoIndex === 0}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </Button>

            <Button
              onClick={goToNextVideo}
              size="icon"
              variant="ghost"
              className="bg-black/50 hover:bg-black/70 rounded-full"
              disabled={currentVideoIndex === videos.length - 1}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>

          {/* Video Counter */}
          <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm z-20">
            {currentVideoIndex + 1} / {videos.length}
          </div>
        </div>

        {/* Right Sidebar - Interactions (Overlaid on media player) */}
        <div className="absolute right-8 bottom-24 z-10">
          <InteractionSidebar />
        </div>
      </main>
    </div>
  );
}
