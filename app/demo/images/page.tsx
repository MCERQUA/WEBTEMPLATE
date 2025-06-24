'use client';

import { useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import HeroImage from '@/components/ui/HeroImage';
import BackgroundImage from '@/components/ui/BackgroundImage';
import ImageGallery from '@/components/ui/ImageGallery';
import ImageLightbox from '@/components/ui/ImageLightbox';
import { ASPECT_RATIOS } from '@/lib/images/image-utils';

const galleryImages = [
  { src: '/images/placeholder-gallery.jpg', alt: 'Gallery Image 1', caption: 'Professional Work 1' },
  { src: '/images/placeholder-service.jpg', alt: 'Gallery Image 2', caption: 'Professional Work 2' },
  { src: '/images/placeholder-team.jpg', alt: 'Gallery Image 3', caption: 'Professional Work 3' },
  { src: '/images/placeholder-gallery.jpg', alt: 'Gallery Image 4', caption: 'Professional Work 4' },
  { src: '/images/placeholder-service.jpg', alt: 'Gallery Image 5', caption: 'Professional Work 5' },
  { src: '/images/placeholder-gallery.jpg', alt: 'Gallery Image 6', caption: 'Professional Work 6' },
];

export default function ImageOptimizationDemo() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleGalleryClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroImage
        src="/images/placeholder-hero.jpg"
        alt="Hero Image Demo"
        height="lg"
        overlayOpacity={0.5}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Image Optimization Demo</h1>
          <p className="text-xl">Showcasing Next.js Image Component Features</p>
        </div>
      </HeroImage>

      <div className="container mx-auto px-4 py-16">
        {/* Basic Optimized Image */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Basic Optimized Image</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">With Blur Placeholder</h3>
              <OptimizedImage
                src="/images/placeholder-service.jpg"
                alt="Service Image"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">With Loading State</h3>
              <OptimizedImage
                src="/images/placeholder-team.jpg"
                alt="Team Member"
                width={600}
                height={400}
                showLoader={true}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Responsive Images */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Responsive Images</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Auto-sizing with Aspect Ratio</h3>
              <ResponsiveImage
                src="/images/placeholder-service.jpg"
                alt="Responsive Service Image"
                maxWidth={1200}
                aspectRatio={ASPECT_RATIOS.wide}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Square Aspect Ratio</h3>
              <div className="max-w-md">
                <ResponsiveImage
                  src="/images/placeholder-team.jpg"
                  alt="Square Image"
                  maxWidth={400}
                  aspectRatio={ASPECT_RATIOS.square}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Image Gallery with Lightbox</h2>
          <ImageGallery
            images={galleryImages}
            columns={3}
            gap="md"
            aspectRatio={ASPECT_RATIOS.card}
            showCaptions={true}
            onImageClick={handleGalleryClick}
          />
        </section>

        {/* Background Image Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Background Image with Parallax</h2>
          <BackgroundImage
            src="/images/placeholder-hero.jpg"
            overlay={true}
            overlayOpacity={0.6}
            parallax={true}
            className="h-[400px] rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-center h-full text-white text-center p-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">Parallax Background</h3>
                <p className="text-xl">Scroll to see the parallax effect</p>
              </div>
            </div>
          </BackgroundImage>
        </section>

        {/* Different Aspect Ratios */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Different Aspect Ratios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ASPECT_RATIOS).map(([name, ratio]) => (
              <div key={name}>
                <h3 className="text-lg font-semibold mb-2 capitalize">{name}</h3>
                <OptimizedImage
                  src="/images/placeholder-gallery.jpg"
                  alt={`${name} aspect ratio`}
                  width={400}
                  aspectRatio={ratio}
                  className="rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Error Handling Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Error Handling</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Valid Image</h3>
              <OptimizedImage
                src="/images/placeholder-service.jpg"
                alt="Valid Image"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Invalid Image (Fallback)</h3>
              <OptimizedImage
                src="/images/non-existent-image.jpg"
                alt="Invalid Image"
                width={600}
                height={400}
                fallbackSrc="/images/placeholder-service.jpg"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}