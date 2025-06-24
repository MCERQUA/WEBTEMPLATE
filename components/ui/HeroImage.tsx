'use client';

import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import { ASPECT_RATIOS } from '@/lib/images/image-utils';

interface HeroImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  priority?: boolean;
  children?: React.ReactNode;
}

export default function HeroImage({
  src,
  alt,
  blurDataURL,
  overlay = true,
  overlayOpacity = 0.4,
  height = 'lg',
  className,
  priority = true,
  children,
}: HeroImageProps) {
  const heightClasses = {
    sm: 'h-[300px]',
    md: 'h-[400px]',
    lg: 'h-[500px]',
    xl: 'h-[600px]',
    full: 'h-screen',
  };

  return (
    <div className={cn('relative w-full overflow-hidden', heightClasses[height], className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        blurDataURL={blurDataURL}
        className="object-cover"
        sizes="100vw"
        quality={90}
      />

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}