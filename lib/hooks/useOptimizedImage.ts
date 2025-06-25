'use client';

import { useState, useEffect, useRef } from 'react';
import { createLazyLoadObserver } from '@/lib/images/image-utils';

interface UseOptimizedImageProps {
  src: string;
  fallbackSrc?: string;
  lazy?: boolean;
  threshold?: number;
}

interface UseOptimizedImageReturn {
  imageSrc: string;
  isIntersecting: boolean;
  isLoaded: boolean;
  hasError: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export function useOptimizedImage({
  src,
  fallbackSrc = '/images/placeholder-service.jpg',
  lazy = true,
  threshold = 0.01,
}: UseOptimizedImageProps): UseOptimizedImageReturn {
  const [imageSrc, setImageSrc] = useState(src);
  const [isIntersecting, setIsIntersecting] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) {
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) {
      return;
    }

    const observer = createLazyLoadObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (observer) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [lazy, threshold]);

  useEffect(() => {
    if (!isIntersecting) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    img.onerror = () => {
      setHasError(true);
      if (fallbackSrc && imageSrc !== fallbackSrc) {
        setImageSrc(fallbackSrc);
      }
    };

    img.src = imageSrc;
  }, [imageSrc, isIntersecting, fallbackSrc]);

  return {
    imageSrc,
    isIntersecting,
    isLoaded,
    hasError,
    ref,
  };
}