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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2; // Higher resolution
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#9333ea'); // Purple
    gradient.addColorStop(0.5, '#ec4899'); // Pink
    gradient.addColorStop(1, '#3b82f6'); // Blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', rect.width / 2, rect.height / 2 - 10);
    ctx.fillText('TO REVEAL', rect.width / 2, rect.height / 2 + 10);

    // Add sparkle pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 3;
      ctx.fillRect(x, y, size, size);
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

    // Animate the reveal
    let progress = 0;
    const animate = () => {
      if (progress >= 100) {
        setIsRevealed(true);
        onReveal?.();
        return;
      }

      const rect = canvas.getBoundingClientRect();
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
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    checkScratchPercentage(canvas, ctx);
  };

  const checkScratchPercentage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
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
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);

  return (
    <div className="relative w-full h-full">
      {/* Prize (revealed underneath) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${rarityColors[prize.rarity]} rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 ${
          isRevealed ? `shadow-2xl ${rarityGlow[prize.rarity]} scale-105` : ''
        }`}
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

        {isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping" />
          </div>
        )}
      </div>

      {/* Scratch layer */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full rounded-xl ${
            isScratching ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ touchAction: 'none' }}
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
