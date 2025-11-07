'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex justify-center items-center py-2 px-4">
        <img
          src="/logo.png"
          alt="Competition Town Logo"
          className="h-12 w-auto object-contain"
        />
      </div>
    </header>
  );
}
