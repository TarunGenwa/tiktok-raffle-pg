'use client';

import { useRouter } from 'next/navigation';

export default function PromoSlide() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/competition/0');
  };

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden relative max-w-full">
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

          {/* Promo Banner - Clickable */}
          <button
            onClick={handleClick}
            className="w-full mt-2 cursor-pointer p-[1.5px] md:p-[3px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-xl shadow-emerald-500/20 transform hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {/* GIF Image */}
              <div className="w-full pt-8">
                <img
                  src="/hotrodguy2.gif"
                  alt="Prize"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Content Below */}
              <div className="p-3 sm:p-4 space-y-2">
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white text-center">
                  WIN A ROADSTER
                </h3>

                {/* CTA Text */}
                <div className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-bold text-sm rounded-lg">
                  Play Now
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
