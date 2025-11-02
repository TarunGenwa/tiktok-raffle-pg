'use client';

import { useState, useEffect, useRef } from 'react';

interface MediaPlayerProps {
  videoId: string;
  username?: string;
  description?: string;
  isYouTube?: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  onMuteToggle: () => void;
  onPlayToggle: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MediaPlayer({
  videoId,
  username = '@username',
  description = 'Check out this amazing content!',
  isYouTube = true,
  isMuted,
  isPlaying,
  onMuteToggle,
  onPlayToggle
}: MediaPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<string>(`player-${videoId}`);

  useEffect(() => {
    if (!isYouTube) return;

    // Load YouTube IFrame API
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    };

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            mute: isMuted ? 1 : 0,
            loop: 1,
            playlist: videoId,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              if (isPlaying) {
                event.target.playVideo();
              }
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
            },
            onStateChange: (event: any) => {
              // State changes are now handled by app-level state
            }
          }
        });
      }
    };

    loadYouTubeAPI();

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, isYouTube, isMuted, isPlaying]);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
    onPlayToggle();
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
    onMuteToggle();
  };

  // Sync player state with app-level state when it changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.getPlayerState) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, videoId]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.isMuted) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted, videoId]);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden group">
      {/* YouTube Player */}
      {isYouTube ? (
        <div
          id={containerRef.current}
          className="w-full h-full pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        <video
          className="w-full h-full object-cover pointer-events-none"
          src={videoId}
          loop
          autoPlay
          muted={isMuted}
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

      {/* Control Buttons */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
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
      </div>
    </div>
  );
}
