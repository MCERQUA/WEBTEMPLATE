'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImageLightboxProps) {
  const currentImage = images[currentIndex];
  const hasNext = currentIndex < images.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (hasPrevious && onPrevious) onPrevious();
        break;
      case 'ArrowRight':
        if (hasNext && onNext) onNext();
        break;
    }
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation buttons */}
      {onPrevious && hasPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {onNext && hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh]">
        <OptimizedImage
          src={currentImage.src}
          alt={currentImage.alt}
          width={1920}
          height={1080}
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
          priority
        />

        {/* Caption and counter */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          {currentImage.caption && (
            <p className="text-center mb-2">{currentImage.caption}</p>
          )}
          <p className="text-center text-sm opacity-70">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}