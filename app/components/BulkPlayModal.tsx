'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface BulkPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ticketCount: number;
}

export default function BulkPlayModal({
  isOpen,
  onClose,
  onConfirm,
  ticketCount
}: BulkPlayModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(onConfirm, 200);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Spacer for sidebar on desktop */}
      <div className="hidden md:block md:w-20 flex-shrink-0" />

      {/* Modal */}
      <div
        className={`relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-md w-full border-2 border-gray-700 transition-all duration-200 ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-700 rounded-full p-4 shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Bulk Play Mode
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-center mb-6">
            Play <span className="font-bold text-white">{ticketCount} tickets</span> at once with scratch cards!
            Quick reveals, instant wins.
          </p>

          {/* Info box */}
          <div className="bg-gray-800/60 border border-gray-600 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-300">
                Scratch cards will be revealed in a circular animation. Maximum 100 tickets at once.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg transition-colors"
            >
              Play Bulk
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
