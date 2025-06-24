'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { shimmer, solidPlaceholder } from '@/lib/images/client-placeholders';

export interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  fallbackSrc?: string;
  aspectRatio?: number;
  showLoader?: boolean;
  loaderColor?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/images/placeholder-service.jpg',
  aspectRatio,
  showLoader = true,
  loaderColor = '#e5e5e5',
  blurDataURL,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Calculate dimensions based on aspect ratio if provided
  const calculatedHeight = aspectRatio && width 
    ? Math.round(Number(width) / aspectRatio)
    : height;

  // Generate placeholder based on availability
  const placeholder = blurDataURL 
    ? 'blur'
    : showLoader 
    ? 'blur' 
    : 'empty';

  const placeholderData = blurDataURL 
    || (showLoader 
      ? shimmer(Number(width), Number(calculatedHeight))
      : solidPlaceholder(Number(width), Number(calculatedHeight), loaderColor));

  const handleLoad = (result: any) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(result);
  };

  const handleError = (result: any) => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    onError?.(result);
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        aspectRatio && 'w-full',
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={calculatedHeight}
        placeholder={placeholder as any}
        blurDataURL={placeholderData}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100',
          aspectRatio && 'absolute inset-0 w-full h-full object-cover'
        )}
        {...props}
      />
      
      {/* Loading overlay */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-muted-foreground">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}