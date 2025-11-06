'use client';

import { useRouter } from 'next/navigation';

const categories = [
  {
    name: 'Mystery Boxes',
    icon: '🎁',
    description: 'Surprise prizes await',
    gradient: 'from-purple-500 to-pink-500',
    route: '/explore?category=mysteryboxes'
  },
  {
    name: 'Prize Spins',
    icon: '🎡',
    description: 'Spin to win big',
    gradient: 'from-orange-500 to-yellow-500',
    route: '/explore?category=prizespins'
  },
  {
    name: 'Instant Wins',
    icon: '💥',
    description: 'Win instantly',
    gradient: 'from-blue-500 to-cyan-500',
    route: '/explore?category=instantwins'
  },
  {
    name: 'Daily Prizes',
    icon: '🏆',
    description: 'New chances daily',
    gradient: 'from-green-500 to-emerald-500',
    route: '/explore?category=dailyprizes'
  }
];

export default function PromoSlide() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col p-4 sm:p-6">
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
        <div className="flex gap-3 sm:gap-4 justify-center items-center">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => router.push(category.route)}
              className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-gray-700 hover:border-gray-600 transition-all transform hover:scale-110"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>

              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl">{category.icon}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
