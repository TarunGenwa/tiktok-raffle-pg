'use client';

export default function PromoSlide() {

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

          {/* Promo Banner */}
          <div className="mt-2 p-[1.5px] md:p-[3px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-xl shadow-emerald-500/20 transform hover:scale-105 transition-transform">
            <div className="relative rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden min-h-[200px] sm:min-h-[240px] flex flex-col justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
        </div>
      </div>
    </div>
  );
}
