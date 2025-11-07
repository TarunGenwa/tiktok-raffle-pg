'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 relative overflow-hidden">
      {/* Starry Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative z-10 flex justify-center items-center py-2 px-4">
        <img
          src="/logo.png"
          alt="Competition Town Logo"
          className="h-12 w-auto object-contain"
        />
      </div>
    </header>
  );
}
