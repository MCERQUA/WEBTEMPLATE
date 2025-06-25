import { getPlaiceholder, type GetPlaiceholderReturn } from 'plaiceholder';

export interface BlurDataURL {
  base64: string;
  img: {
    src: string;
    width: number;
    height: number;
    type?: string;
  };
}

/**
 * Generate a blur data URL for an image
 * @param src - The image source path
 * @returns Blur data URL and image metadata
 */
export async function getBlurDataURL(src: string): Promise<BlurDataURL> {
  try {
    // For plaiceholder v3, we can pass a URL string or Buffer
    const result: GetPlaiceholderReturn = await getPlaiceholder(src as any);
    const { base64, metadata } = result;
    
    return {
      base64,
      img: {
        src,
        width: metadata.width,
        height: metadata.height,
        type: metadata.format
      }
    };
  } catch (error) {
    console.error(`Error generating blur placeholder for ${src}:`, error);
    // Return a default blur placeholder
    return {
      base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ==',
      img: {
        src,
        width: 1920,
        height: 1080
      }
    };
  }
}

/**
 * Generate blur data URLs for multiple images
 * @param srcs - Array of image source paths
 * @returns Map of image paths to blur data
 */
export async function getBlurDataURLs(srcs: string[]): Promise<Map<string, BlurDataURL>> {
  const blurDataMap = new Map<string, BlurDataURL>();
  
  await Promise.all(
    srcs.map(async (src) => {
      const blurData = await getBlurDataURL(src);
      blurDataMap.set(src, blurData);
    })
  );
  
  return blurDataMap;
}

/**
 * Create a shimmer SVG placeholder
 * @param width - Image width
 * @param height - Image height
 * @returns Base64 encoded shimmer SVG
 */
export function shimmer(width: number, height: number): string {
  const shimmerSvg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e5e5e5" offset="20%" />
          <stop stop-color="#f0f0f0" offset="50%" />
          <stop stop-color="#e5e5e5" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#e5e5e5" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;
}

/**
 * Create a solid color placeholder
 * @param width - Image width
 * @param height - Image height
 * @param color - Hex color (default: #e5e5e5)
 * @returns Base64 encoded solid color SVG
 */
export function solidPlaceholder(width: number, height: number, color: string = '#e5e5e5'): string {
  const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}" />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}
