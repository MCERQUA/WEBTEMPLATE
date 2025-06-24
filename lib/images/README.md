# Image Optimization Guide

This directory contains utilities for optimizing images in the local service template.

## Features

1. **Automatic Blur Placeholders** - Generates base64 blur data URLs for smooth loading transitions
2. **Responsive Images** - Automatically serves appropriately sized images based on device
3. **WebP/AVIF Support** - Modern image formats for better compression
4. **Lazy Loading** - Images load only when they enter the viewport
5. **Error Handling** - Fallback images for broken links
6. **Loading States** - Shimmer effects and spinners during load

## Components

### OptimizedImage
Main image component with all optimization features:

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/service.jpg"
  alt="Service description"
  width={800}
  height={600}
  aspectRatio={4/3}
  showLoader={true}
  fallbackSrc="/images/placeholder.jpg"
/>
```

### ResponsiveImage
Automatically calculates sizes for different breakpoints:

```tsx
import ResponsiveImage from '@/components/ui/ResponsiveImage';

<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  maxWidth={1920}
  aspectRatio={16/9}
  priority={true}
/>
```

### HeroImage
Full-width hero images with overlay support:

```tsx
import HeroImage from '@/components/ui/HeroImage';

<HeroImage
  src="/images/hero.jpg"
  alt="Hero"
  height="lg"
  overlay={true}
  overlayOpacity={0.4}
>
  <h1>Your Content Here</h1>
</HeroImage>
```

### ImageGallery
Grid gallery with lightbox support:

```tsx
import ImageGallery from '@/components/ui/ImageGallery';

<ImageGallery
  images={[
    { src: '/images/1.jpg', alt: 'Image 1', caption: 'Caption 1' },
    { src: '/images/2.jpg', alt: 'Image 2', caption: 'Caption 2' },
  ]}
  columns={3}
  onImageClick={(index, image) => {
    // Open lightbox
  }}
/>
```

## Scripts

### Generate Blur Placeholders
Generate blur data for all images in public/images:

```bash
npm run generate-blur
```

### Create Placeholder Images
Generate placeholder images for development:

```bash
npm run create-placeholders
```

## Image Optimization Best Practices

1. **Use appropriate formats**:
   - JPEG for photos
   - PNG for images with transparency
   - WebP/AVIF will be auto-generated

2. **Size images correctly**:
   - Don't upload images larger than needed
   - Use responsive images for different screen sizes

3. **Set priorities**:
   - Use `priority={true}` for above-the-fold images
   - Let other images lazy load

4. **Provide dimensions**:
   - Always specify width and height to prevent layout shift
   - Or use aspectRatio for responsive sizing

5. **Add alt text**:
   - Always include descriptive alt text for accessibility

## Performance Tips

1. **Pre-generate blur data** during build:
   ```json
   "scripts": {
     "build": "npm run generate-blur && next build"
   }
   ```

2. **Use static imports** when possible for automatic optimization:
   ```tsx
   import heroImage from '@/public/images/hero.jpg';
   
   <OptimizedImage src={heroImage} alt="Hero" />
   ```

3. **Limit image file sizes**:
   - Hero images: < 500KB
   - Gallery images: < 200KB
   - Thumbnails: < 50KB

4. **Monitor Core Web Vitals**:
   - LCP (Largest Contentful Paint)
   - CLS (Cumulative Layout Shift)
   - FID (First Input Delay)

## Troubleshooting

### Blur placeholders not showing
- Run `npm run generate-blur` to create blur data
- Check that blur-data.json exists in lib/images/

### Images not optimizing
- Ensure images are in public/ directory
- Check Next.js image configuration in next.config.ts

### Layout shift issues
- Always provide width and height or aspectRatio
- Use the skeleton loader while images load

### Slow loading
- Enable lazy loading for below-fold images
- Reduce original image file sizes
- Check network throttling in DevTools