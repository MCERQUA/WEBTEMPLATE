'use client';

import OptimizedImage, { OptimizedImageProps } from './OptimizedImage';
import { calculateResponsiveSizes, BREAKPOINTS } from '@/lib/images/image-utils';

interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'width' | 'height' | 'sizes'> {
  maxWidth: number;
  aspectRatio?: number;
  sizes?: string;
  priority?: boolean;
}

export default function ResponsiveImage({
  maxWidth,
  aspectRatio = 16 / 9,
  sizes,
  priority = false,
  ...props
}: ResponsiveImageProps) {
  const responsiveSizes = calculateResponsiveSizes(maxWidth, aspectRatio);
  
  // Generate sizes attribute if not provided
  const sizesAttr = sizes || `
    (max-width: ${BREAKPOINTS.mobile}px) ${responsiveSizes.mobile.width}px,
    (max-width: ${BREAKPOINTS.tablet}px) ${responsiveSizes.tablet.width}px,
    ${responsiveSizes.desktop.width}px
  `.trim();

  return (
    <OptimizedImage
      {...props}
      width={responsiveSizes.desktop.width}
      height={responsiveSizes.desktop.height}
      sizes={sizesAttr}
      priority={priority}
      aspectRatio={aspectRatio}
    />
  );
}