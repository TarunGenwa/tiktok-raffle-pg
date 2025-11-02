'use client';

import { useState } from 'react';

interface MediaPlayerProps {
  videoId: string;
  username?: string;
  description?: string;
  isYouTube?: boolean;
}

export default function MediaPlayer({
  videoId,
  username = '@username',
  description = 'Check out this amazing content!',
  isYouTube = true
}: MediaPlayerProps) {
  const [isMuted, setIsMuted] = useState(0);

  const toggleMute = () => {
    setIsMuted(isMuted === 1 ? 0 : 1);
  };

  // Convert YouTube Shorts URL to embed format
  const getYouTubeEmbedUrl = (id: string) => {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=${isMuted}&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&showinfo=0`;
  };

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden group">
      {/* YouTube Embed */}
      {isYouTube ? (
        <iframe
          className="w-full h-full object-cover"
          src={getYouTubeEmbedUrl(videoId)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          className="w-full h-full object-cover"
          src={videoId}
          loop
          autoPlay
          muted={isMuted === 1}
          playsInline
        />
      )}

      {/* Video Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        <div className="space-y-2">
          <div className="font-semibold text-white text-lg">{username}</div>
          <div className="text-white text-sm">{description}</div>
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
      >
        {isMuted === 1 ? (
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
    </div>
  );
}
