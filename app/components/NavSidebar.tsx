'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NavSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname === '/explore') return 'discover';
    if (pathname === '/activity') return 'activity';
    if (pathname === '/profile') return 'profile';
    return 'foryou';
  };

  const navItems = [
    {
      id: 'foryou',
      label: 'For You',
      path: '/',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      )
    },
    {
      id: 'activity',
      label: 'Activity',
      path: '/activity',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      id: 'discover',
      label: 'Discover',
      path: '/explore',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ];

  const additionalItems = [
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    }
  ];

  const allItems = [...navItems, ...additionalItems];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col gap-8 p-6">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <div className="text-white font-bold text-2xl">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => router.push(item.path)}
              className={`flex flex-col h-auto items-center gap-1 transition-all p-2 ${
                getActiveTab() === item.id
                  ? 'text-white scale-110'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Additional Actions */}
        <div className="flex flex-col gap-4">
          {additionalItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => router.push(item.path)}
              className={`flex flex-col h-auto items-center gap-1 transition-all p-2 ${
                getActiveTab() === item.id
                  ? 'text-white scale-110'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 z-40 safe-area-inset-bottom">
        <nav className="flex justify-around items-center px-1 py-2">
          {allItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => router.push(item.path)}
              className={`flex flex-col h-auto items-center gap-0.5 transition-all p-1.5 min-w-0 ${
                getActiveTab() === item.id
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <div className={`transition-transform ${getActiveTab() === item.id ? 'scale-110' : ''}`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  {item.icon.props.children}
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] font-medium truncate max-w-[60px]">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
}
