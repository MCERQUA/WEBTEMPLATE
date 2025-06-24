/**
 * Image optimization utilities
 */

export interface ImageSize {
  width: number;
  height: number;
}

export interface ResponsiveImageSizes {
  mobile: ImageSize;
  tablet: ImageSize;
  desktop: ImageSize;
}

/**
 * Device breakpoints for responsive images
 */
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
} as const;

/**
 * Common aspect ratios
 */
export const ASPECT_RATIOS = {
  square: 1,
  landscape: 16 / 9,
  portrait: 3 / 4,
  wide: 21 / 9,
  hero: 2.5,
  card: 4 / 3,
} as const;

/**
 * Image quality settings
 */
export const IMAGE_QUALITY = {
  thumbnail: 60,
  low: 75,
  medium: 85,
  high: 95,
} as const;

/**
 * Calculate responsive image sizes based on container width
 * @param containerWidth - Maximum container width
 * @param aspectRatio - Image aspect ratio
 * @returns Responsive image sizes
 */
export function calculateResponsiveSizes(
  containerWidth: number,
  aspectRatio: number = ASPECT_RATIOS.landscape
): ResponsiveImageSizes {
  const mobile = {
    width: Math.min(containerWidth, BREAKPOINTS.mobile),
    height: Math.round(Math.min(containerWidth, BREAKPOINTS.mobile) / aspectRatio),
  };

  const tablet = {
    width: Math.min(containerWidth, BREAKPOINTS.tablet),
    height: Math.round(Math.min(containerWidth, BREAKPOINTS.tablet) / aspectRatio),
  };

  const desktop = {
    width: containerWidth,
    height: Math.round(containerWidth / aspectRatio),
  };

  return { mobile, tablet, desktop };
}

/**
 * Generate srcSet string for responsive images
 * @param src - Image source
 * @param sizes - Array of widths
 * @returns srcSet string
 */
export function generateSrcSet(src: string, sizes: number[]): string {
  return sizes
    .map((size) => `${src}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * @param maxWidth - Maximum width
 * @returns sizes attribute string
 */
export function generateSizes(maxWidth: number): string {
  return `(max-width: ${BREAKPOINTS.mobile}px) 100vw, (max-width: ${BREAKPOINTS.tablet}px) 100vw, ${maxWidth}px`;
}

/**
 * Get optimized image loader URL
 * @param src - Original image source
 * @param width - Desired width
 * @param quality - Image quality (0-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality: number = IMAGE_QUALITY.medium
): string {
  // For Next.js image optimization
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: quality.toString(),
  });

  return `/_next/image?${params.toString()}`;
}

/**
 * Check if image format supports transparency
 * @param format - Image format
 * @returns Whether format supports transparency
 */
export function supportsTransparency(format: string): boolean {
  const transparentFormats = ['png', 'webp', 'avif', 'gif'];
  return transparentFormats.includes(format.toLowerCase());
}

/**
 * Get image format from URL or filename
 * @param src - Image source
 * @returns Image format
 */
export function getImageFormat(src: string): string {
  const match = src.match(/\.(\w+)(?:\?.*)?$/);
  return match ? match[1].toLowerCase() : 'jpg';
}

/**
 * Convert image dimensions to different aspect ratio
 * @param width - Original width
 * @param height - Original height
 * @param targetRatio - Target aspect ratio
 * @param fit - How to fit ('cover' or 'contain')
 * @returns New dimensions
 */
export function convertAspectRatio(
  width: number,
  height: number,
  targetRatio: number,
  fit: 'cover' | 'contain' = 'cover'
): ImageSize {
  const currentRatio = width / height;

  if (fit === 'cover') {
    // Crop to fit
    if (currentRatio > targetRatio) {
      // Image is wider than target
      const newWidth = Math.round(height * targetRatio);
      return { width: newWidth, height };
    } else {
      // Image is taller than target
      const newHeight = Math.round(width / targetRatio);
      return { width, height: newHeight };
    }
  } else {
    // Contain - fit entire image
    if (currentRatio > targetRatio) {
      // Image is wider than target
      const newHeight = Math.round(width / targetRatio);
      return { width, height: newHeight };
    } else {
      // Image is taller than target
      const newWidth = Math.round(height * targetRatio);
      return { width: newWidth, height };
    }
  }
}

/**
 * Preload critical images
 * @param imageSrcs - Array of image sources to preload
 */
export function preloadImages(imageSrcs: string[]): void {
  if (typeof window === 'undefined') return;

  imageSrcs.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Create intersection observer for lazy loading
 * @param callback - Callback when image enters viewport
 * @param options - Intersection observer options
 * @returns Intersection observer instance
 */
export function createLazyLoadObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}