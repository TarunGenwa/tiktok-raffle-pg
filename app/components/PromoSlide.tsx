'use client';

import { useRouter } from 'next/navigation';

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

export default function PromoSlide() {
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
      <div className="relative z-10 flex flex-col h-full justify-between p-4 sm:p-6">
        {/* Header/Banner Section */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-block mb-2 sm:mb-3">
            <div className="w-48 h-20 sm:w-64 sm:h-24 mx-auto mb-2">
              <img
                src="/logo.png"
                alt="Competition Town Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Promo Banner */}
          <div
            className="mt-2 relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform overflow-hidden min-h-[200px] sm:min-h-[240px] flex flex-col justify-center"
            style={{ border: '6px solid #10b981' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/CTSP credit 1000gbp.png"
                alt="Prize"
                className="w-full h-full object-cover"
              />
            </div>


          </div>
        </div>

        {/* Categories Section */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <h3 className="text-base sm:text-lg font-bold text-white text-center mb-3 sm:mb-4">
            Explore Categories
          </h3>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-lg mx-auto w-full">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => router.push(category.route)}
                className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-gray-700 hover:border-gray-600 transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>

                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{category.icon}</div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1">{category.name}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-400">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pt-3 sm:pt-4 animate-pulse">
          <p className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
            Scroll up to see individual competitions
          </p>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white mx-auto animate-bounce"
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
