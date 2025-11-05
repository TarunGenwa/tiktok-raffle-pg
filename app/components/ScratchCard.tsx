'use client';

import { useEffect, useRef, useState } from 'react';

interface Prize {
  name: string;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ScratchCardProps {
  prize: Prize;
  onReveal?: () => void;
  autoReveal?: boolean;
  autoRevealDelay?: number;
  cardNumber?: number;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
};

const rarityGlow = {
  common: 'shadow-gray-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/50',
};

export default function ScratchCard({
  prize,
  onReveal,
  autoReveal = false,
  autoRevealDelay = 0,
  cardNumber
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const revealThreshold = 40; // Reveal when 40% is scratched

  useEffect(() => {
    const initializeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      // Set canvas size
      const rect = canvas.getBoundingClientRect();

      // Ensure we have valid dimensions
      if (rect.width === 0 || rect.height === 0) return false;

      canvas.width = rect.width * 2; // Higher resolution
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);

      // Draw metallic scratch surface
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#94a3b8'); // Slate
      gradient.addColorStop(0.5, '#cbd5e1'); // Light slate
      gradient.addColorStop(1, '#64748b'); // Dark slate
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add metallic shine effect
      const shineGradient = ctx.createLinearGradient(0, 0, rect.width, 0);
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
      shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add text
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH', rect.width / 2, rect.height / 2 - 8);
      ctx.fillText('TO REVEAL', rect.width / 2, rect.height / 2 + 8);

      // Add texture pattern for realistic scratch effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = Math.random() * 2;
        ctx.fillRect(x, y, size, size);
      }

      // Add darker texture
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = Math.random() * 2;
        ctx.fillRect(x, y, size, size);
      }

      return true;
    };

    // Try to initialize, retry if dimensions not ready
    if (!initializeCanvas()) {
      const timer = setTimeout(() => {
        initializeCanvas();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (autoReveal) {
      const timer = setTimeout(() => {
        handleAutoReveal();
      }, autoRevealDelay);
      return () => clearTimeout(timer);
    }
  }, [autoReveal, autoRevealDelay]);

  const handleAutoReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Ensure canvas has valid dimensions
    if (rect.width === 0 || rect.height === 0) return;

    // Animate the reveal
    let progress = 0;
    const animate = () => {
      if (progress >= 100) {
        setIsRevealed(true);
        onReveal?.();
        return;
      }

      ctx.globalCompositeOperation = 'destination-out';

      // Clear in a circular pattern
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
      const currentRadius = (progress / 100) * maxRadius;

      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      progress += 5;
      setScratchPercentage(progress);
      requestAnimationFrame(animate);
    };

    animate();
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isRevealed || autoReveal) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Ensure canvas has valid dimensions
    if (rect.width === 0 || rect.height === 0) return;

    let x, y;

    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    } else {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 60, 0, Math.PI * 2); // Increased radius from 40 to 60
    ctx.fill();

    // Calculate scratch percentage
    checkScratchPercentage(canvas, ctx);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isRevealed || autoReveal) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Ensure canvas has valid dimensions
    if (rect.width === 0 || rect.height === 0) return;

    let x, y;

    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    } else {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    }

    ctx.globalCompositeOperation = 'destination-out';
    // Create a larger scratch area on click
    ctx.beginPath();
    ctx.arc(x, y, 80, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    checkScratchPercentage(canvas, ctx);
  };

  const checkScratchPercentage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Ensure canvas has valid dimensions
    if (canvas.width <= 0 || canvas.height <= 0) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparent++;
      }

      const percentage = (transparent / (pixels.length / 4)) * 100;
      setScratchPercentage(percentage);

      if (percentage > revealThreshold && !isRevealed) {
        setIsRevealed(true);
        onReveal?.();
      }
    } catch (error) {
      console.error('Error checking scratch percentage:', error);
    }
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);

  return (
    <div className="relative w-full h-full">
      {/* Background - shown before reveal */}
      {!isRevealed && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
          {cardNumber && (
            <div className="absolute top-2 left-2 bg-black/40 text-white text-xs font-bold px-2 py-1 rounded">
              #{cardNumber}
            </div>
          )}
        </div>
      )}

      {/* Prize (revealed) */}
      {isRevealed && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${rarityColors[prize.rarity]} rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${rarityGlow[prize.rarity]} animate-in zoom-in-95 duration-300`}
        >
          {cardNumber && (
            <div className="absolute top-2 left-2 bg-black/40 text-white text-xs font-bold px-2 py-1 rounded">
              #{cardNumber}
            </div>
          )}

          {prize.image && (
            <div className="w-16 h-16 mb-2 relative">
              <img
                src={prize.image}
                alt={prize.name}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}

          <p className="text-white font-bold text-center text-sm line-clamp-2">
            {prize.name}
          </p>

          <span className="text-xs text-white/80 capitalize mt-1">
            {prize.rarity}
          </span>
        </div>
      )}

      {/* Scratch layer */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full rounded-xl ${
            isScratching ? 'cursor-grabbing' : 'cursor-pointer'
          }`}
          style={{ touchAction: 'none' }}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => isScratching && scratch(e)}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={scratch}
        />
      )}
    </div>
  );
}
