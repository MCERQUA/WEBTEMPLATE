'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { shimmer } from '@/lib/images/client-placeholders';

interface BackgroundImageProps {
  src: string;
  blurDataURL?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  parallax?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function BackgroundImage({
  src,
  blurDataURL,
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.5,
  parallax = false,
  className,
  children,
}: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src]);

  const placeholderStyle = blurDataURL
    ? { backgroundImage: `url(${blurDataURL})` }
    : { backgroundImage: `url(${shimmer(1920, 1080)})` };

  const transform = parallax ? `translateY(${scrollY * 0.5}px)` : undefined;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder/blur background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={placeholderStyle}
      />

      {/* Actual background image */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          backgroundImage: `url(${src})`,
          transform,
          willChange: parallax ? 'transform' : undefined,
        }}
      />

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      )}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}