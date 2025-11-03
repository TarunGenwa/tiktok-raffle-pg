'use client';

interface WinnerPostProps {
  id: string;
  username: string;
  avatar: string;
  competitionTitle: string;
  prize: string;
  prizeRarity: 'common' | 'rare' | 'epic' | 'legendary';
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: string;
  likes: number;
  comments: number;
}

export default function WinnerPost({
  username,
  avatar,
  competitionTitle,
  prize,
  prizeRarity,
  content,
  mediaUrl,
  mediaType,
  timestamp,
  likes,
  comments
}: WinnerPostProps) {
  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-600'
  };

  const rarityBorders = {
    common: 'border-gray-500',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-yellow-500'
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all">
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div className="relative">
          <img
            src={avatar}
            alt={username}
            className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
          />
          {/* Winner Badge */}
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white">{username}</h3>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <p className="text-sm text-gray-400">{timestamp}</p>
        </div>

        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* Prize Badge */}
      <div className="px-4 pb-3">
        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${rarityColors[prizeRarity]} px-3 py-1.5 rounded-full border-2 ${rarityBorders[prizeRarity]}`}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-white font-bold text-sm">Won {prize}</span>
          <span className="text-white/80 text-xs">• {competitionTitle}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-white text-base leading-relaxed">{content}</p>
      </div>

      {/* Media */}
      {mediaUrl && (
        <div className="px-4 pb-3">
          {mediaType === 'video' ? (
            <video
              className="w-full rounded-lg object-cover max-h-96"
              controls
              playsInline
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={mediaUrl}
              alt="Winner post"
              className="w-full rounded-lg object-cover max-h-96"
            />
          )}
        </div>
      )}

      {/* Engagement */}
      <div className="px-4 py-3 border-t border-gray-800 flex items-center gap-6">
        <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="font-medium">{likes.toLocaleString()}</span>
        </button>

        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
          <span className="font-medium">{comments.toLocaleString()}</span>
        </button>

        <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors group ml-auto">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>

        <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors group">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
