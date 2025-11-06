'use client';

import { useRouter } from 'next/navigation';

interface PromoSlideProps {
  isActive: boolean;
}

const categories = [
  {
    name: 'Crypto',
    icon: '₿',
    description: 'Bitcoin, Ethereum & more',
    gradient: 'from-orange-500 to-yellow-500',
    route: '/explore?category=crypto'
  },
  {
    name: 'Gaming',
    icon: '🎮',
    description: 'Consoles, skins & gear',
    gradient: 'from-purple-500 to-pink-500',
    route: '/explore?category=gaming'
  },
  {
    name: 'Luxury',
    icon: '💎',
    description: 'Watches, jewelry & more',
    gradient: 'from-blue-500 to-cyan-500',
    route: '/explore?category=luxury'
  },
  {
    name: 'Electronics',
    icon: '📱',
    description: 'Latest gadgets & tech',
    gradient: 'from-green-500 to-emerald-500',
    route: '/explore?category=electronics'
  }
];

export default function PromoSlide({ isActive }: PromoSlideProps) {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between p-6 sm:p-8">
        {/* Header/Banner Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="text-5xl sm:text-7xl mb-4 animate-bounce">🎰</div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 bg-clip-text text-transparent">
              Raffle Paradise
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-md mx-auto">
            Win amazing prizes from crypto to luxury items!
          </p>

          {/* Promo Banner */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-4 sm:p-6 shadow-2xl transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <span className="text-2xl sm:text-3xl">🎉</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Special Offer</h2>
              <span className="text-2xl sm:text-3xl">🎉</span>
            </div>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              Get 50% more tickets on your first purchase!
            </p>
            <div className="mt-3 sm:mt-4">
              <button
                onClick={() => router.push('/explore')}
                className="bg-white text-orange-600 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base hover:bg-gray-100 transition-colors shadow-lg"
              >
                Claim Now
              </button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4 sm:mb-6">
            Explore Categories
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto w-full">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => router.push(category.route)}
                className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 rounded-2xl p-4 sm:p-6 border-2 border-gray-700 hover:border-gray-600 transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>

                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{category.icon}</div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1">{category.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-400">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pt-6 sm:pt-8 animate-pulse">
          <p className="text-sm sm:text-base text-gray-400 mb-2 sm:mb-3">
            Scroll up to see individual competitions
          </p>
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
