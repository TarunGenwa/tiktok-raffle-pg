'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function NavSidebar() {
  const [activeTab, setActiveTab] = useState('foryou');

  const navItems = [
    {
      id: 'foryou',
      label: 'For You',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      )
    },
    {
      id: 'following',
      label: 'Following',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      id: 'live',
      label: 'LIVE',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    }
  ];

  const additionalItems = [
    {
      id: 'inbox',
      label: 'Inbox',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
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
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col h-auto items-center gap-1 transition-all p-2 ${
                activeTab === item.id
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
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col h-auto items-center gap-1 transition-all p-2 ${
                activeTab === item.id
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
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col h-auto items-center gap-0.5 transition-all p-1.5 min-w-0 ${
                activeTab === item.id
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <div className={`transition-transform ${activeTab === item.id ? 'scale-110' : ''}`}>
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
