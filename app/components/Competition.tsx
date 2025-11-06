'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
  imageUrl?: string;
}

interface CompetitionProps {
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
  isActive?: boolean;
}

export default function Competition({
  id,
  title,
  category,
  description,
  entryPrice,
  prizePool,
  participants,
  timeRemaining,
  prizes,
  sponsored = false,
  videoUrl,
  isActive = true
}: CompetitionProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Control video playback based on active state
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (!isActive) {
        // Pause video when not active
        videoRef.current.pause();
      } else {
        // Play video when competition becomes active
        videoRef.current.play().catch(() => {
          // Autoplay failed, likely needs user interaction
        });
      }
    }
  }, [isActive, videoUrl]);

  const categoryColors = {
    crypto: 'from-orange-500 to-yellow-500',
    gaming: 'from-purple-500 to-pink-500',
    luxury: 'from-amber-600 to-yellow-600',
    electronics: 'from-blue-500 to-cyan-500'
  };

  const categoryIcons = {
    crypto: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-1.1-7-4.67-7-9V8.3l7-3.5 7 3.5V11c0 4.33-3.14 7.9-7 9z"/>
      </svg>
    ),
    gaming: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      </svg>
    ),
    luxury: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    electronics: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
      </svg>
    )
  };

  const categoryBadges = {
    crypto: 'Crypto',
    gaming: 'Gaming',
    luxury: 'Luxury',
    electronics: 'Tech'
  };

  return (
    <div className="relative w-full h-full p-[3px] rounded-lg bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-xl shadow-emerald-500/20">
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden flex flex-col">
      {/* Top Section - Video/Avatar (50%) */}
      <div className="relative h-1/2 w-full z-10">
        {videoUrl ? (
          <>
            {/* Video Player */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              playsInline
              loop
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              {isMuted ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </>
        ) : (
          <>
            {/* Single Enlarged Prize Image */}
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
              {prizes[0]?.imageUrl && (
                <div className="relative w-full h-full max-w-md flex items-center justify-center">
                  <img
                    src={prizes[0].imageUrl}
                    alt={prizes[0].name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Section - Content (50%) */}
      <div className="relative h-1/2 w-full flex flex-col items-center justify-center p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-black/40 z-10">
        {/* Competition Info */}
        <div className="text-center space-y-1 sm:space-y-2 max-w-md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">{description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-700">
            <div className="text-gray-400 text-xs sm:text-sm font-medium">Prize Pool</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">${prizePool.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-700">
            <div className="text-gray-400 text-xs sm:text-sm font-medium">Entry Price</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">${entryPrice}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-700">
            <div className="text-gray-400 text-xs sm:text-sm font-medium">Participants</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">{participants.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-700">
            <div className="text-gray-400 text-xs sm:text-sm font-medium">Time Left</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400">{timeRemaining}</div>
          </div>
        </div>

        {/* Enter Button */}
        <Button
          onClick={() => router.push(`/competition/${id}`)}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-6 rounded-full shadow-2xl transform transition-all hover:scale-105"
        >
          Enter & Spin Now
        </Button>

        {/* Trust Indicators */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Instant Win</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
