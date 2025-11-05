'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Prize {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
  imageUrl?: string;
}

interface CompetitionCardProps {
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

export default function CompetitionCard({
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
  videoUrl
}: CompetitionCardProps) {
  const router = useRouter();

  const categoryColors = {
    crypto: 'from-orange-500 to-yellow-500',
    gaming: 'from-purple-500 to-pink-500',
    luxury: 'from-amber-600 to-yellow-600',
    electronics: 'from-blue-500 to-cyan-500'
  };

  const categoryIcons = {
    crypto: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-1.1-7-4.67-7-9V8.3l7-3.5 7 3.5V11c0 4.33-3.14 7.9-7 9z"/>
      </svg>
    ),
    gaming: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      </svg>
    ),
    luxury: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    electronics: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
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
    <div className="group relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] hover:shadow-2xl">
        {/* Video/Image Preview */}
        {videoUrl ? (
          <div className="relative h-48 bg-gray-950 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>
            <div className={`relative w-20 h-20 bg-gradient-to-br ${categoryColors[category]} rounded-full flex items-center justify-center shadow-xl`}>
              <div className="text-white">
                {categoryIcons[category]}
              </div>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className={`bg-gradient-to-r ${categoryColors[category]} px-3 py-1 rounded-full text-white font-bold text-xs shadow-lg flex items-center gap-1.5`}>
            {categoryBadges[category]}
            {sponsored && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">SPONSORED</span>}
          </div>
        </div>

        {/* Time Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-orange-400 font-bold text-xs shadow-lg flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            {timeRemaining}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-white truncate">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
              <div className="text-gray-400 text-[10px] font-medium">Prize Pool</div>
              <div className="text-sm font-bold text-green-400">${(prizePool / 1000).toFixed(0)}k</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
              <div className="text-gray-400 text-[10px] font-medium">Entry</div>
              <div className="text-sm font-bold text-white">${entryPrice}</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
              <div className="text-gray-400 text-[10px] font-medium">Players</div>
              <div className="text-sm font-bold text-blue-400">{(participants / 1000).toFixed(1)}k</div>
            </div>
          </div>

          {/* Top Prize */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-2">
            <div className="text-[10px] text-purple-300 font-medium uppercase">Top Prize</div>
            <div className="text-sm font-bold text-white">{prizes[prizes.length - 1].name}</div>
          </div>

          {/* Enter Button */}
          <Button
            onClick={() => router.push(`/competition/${id}`)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 rounded-lg shadow-lg transform transition-all hover:scale-105"
          >
            Enter & Spin
          </Button>
        </div>
      </div>
  );
}
