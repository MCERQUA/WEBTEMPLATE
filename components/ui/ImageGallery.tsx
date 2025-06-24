'use client';

import { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils/cn';
import { ASPECT_RATIOS } from '@/lib/images/image-utils';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  blurDataURL?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  aspectRatio?: number;
  gap?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  showCaptions?: boolean;
  onImageClick?: (index: number, image: GalleryImage) => void;
}

export default function ImageGallery({
  images,
  columns = 3,
  aspectRatio = ASPECT_RATIOS.card,
  gap = 'md',
  rounded = true,
  showCaptions = false,
  onImageClick,
}: ImageGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <div className={cn('grid', columnClasses[columns], gapClasses[gap])}>
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'group relative overflow-hidden bg-muted',
            rounded && 'rounded-lg',
            onImageClick && 'cursor-pointer'
          )}
          onClick={() => onImageClick?.(index, image)}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            width={600}
            height={Math.round(600 / aspectRatio)}
            aspectRatio={aspectRatio}
            blurDataURL={image.blurDataURL}
            onLoad={() => handleImageLoad(index)}
            className={cn(
              'transition-transform duration-300',
              onImageClick && 'group-hover:scale-105'
            )}
          />

          {/* Overlay on hover */}
          {onImageClick && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </div>
          )}

          {/* Caption */}
          {showCaptions && image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm">{image.caption}</p>
            </div>
          )}

          {/* Loading indicator */}
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}