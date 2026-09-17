'use client';

import React, { useRef, useState } from 'react';

interface ThreeProjectCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ThreeProjectCard({ children, className = '', onClick }: ThreeProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rY = ((x - centerX) / centerX) * 9;

    setRotateX(rX);
    setRotateY(rY);

    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1000px',
      }}
      className="w-full h-full"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(14px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full h-full rounded-2xl overflow-hidden glass-card border border-slate-800/90 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 ${className}`}
      >
        {/* Dynamic Specular 3D Light Glare */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glowX}% ${glowY}%, rgba(99, 102, 241, 0.18), transparent 80%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
