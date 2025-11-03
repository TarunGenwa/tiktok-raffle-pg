'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PrizeWheel from './PrizeWheel';

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
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Reset video when competition is no longer active
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (!isActive) {
        // Reset video to beginning and pause
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setVideoEnded(false);
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
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden">
      {isSpinnerOpen ? (
        /* Inline Spinner */
        <PrizeWheel
          prizes={prizes}
          onClose={() => setIsSpinnerOpen(false)}
          competitionTitle={title}
          isInline={true}
        />
      ) : (
        <>
          {/* Video Background */}
          {videoUrl && (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnd}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Mute/Unmute Button */}
              {!videoEnded && (
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  {isMuted ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              )}
            </>
          )}

          {/* Background Pattern (only if no video) */}
          {!videoUrl && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>
          )}

          {/* Main Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-6">
            {/* Hide content while video is playing */}
            {videoUrl && !videoEnded ? null : (
            <>
              {/* Category Icon */}
              <div className={`relative`}>
                <div className="w-32 h-32 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category]} rounded-full opacity-70 blur-2xl`}></div>
                  <div className={`relative w-full h-full bg-gradient-to-br ${categoryColors[category]} rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20`}>
                    <div className="text-white">
                      {categoryIcons[category]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Competition Info */}
              <div className="text-center space-y-3 max-w-md">
                <h2 className="text-4xl font-bold text-white tracking-tight">{title}</h2>
                <p className="text-lg text-gray-300">{description}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="text-gray-400 text-sm font-medium">Prize Pool</div>
                  <div className="text-2xl font-bold text-green-400">${prizePool.toLocaleString()}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="text-gray-400 text-sm font-medium">Entry Price</div>
                  <div className="text-2xl font-bold text-white">${entryPrice}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="text-gray-400 text-sm font-medium">Participants</div>
                  <div className="text-2xl font-bold text-blue-400">{participants.toLocaleString()}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="text-gray-400 text-sm font-medium">Time Left</div>
                  <div className="text-2xl font-bold text-orange-400">{timeRemaining}</div>
                </div>
              </div>

              {/* Prize Preview */}
              <div className="w-full max-w-md">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">Top Prizes</h3>
                <div className="flex gap-2 justify-center overflow-x-auto">
                  {prizes.slice(0, 3).map((prize, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 flex-shrink-0"
                    >
                      <div className="text-sm font-medium text-white">{prize.name}</div>
                      <div className="text-xs text-gray-400 capitalize">{prize.rarity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enter Button */}
              <Button
                onClick={() => setIsSpinnerOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transform transition-all hover:scale-105"
              >
                Enter & Spin Now
              </Button>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Instant Win</span>
                </div>
              </div>
            </>
          )}
          </div>
        </>
      )}
    </div>
  );
}
