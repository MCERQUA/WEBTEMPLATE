import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

export interface BeforeAfterImage {
  id: string
  beforeImage: {
    src: string
    alt: string
  }
  afterImage: {
    src: string
    alt: string
  }
  title?: string
  description?: string
  projectDate?: string
  projectType?: string
}

export interface BeforeAfterGalleryProps {
  /** Array of before/after image pairs */
  images: BeforeAfterImage[]
  /** Initial comparison position (0-100) */
  initialPosition?: number
  /** Whether to show thumbnails */
  showThumbnails?: boolean
  /** Whether to show project details */
  showDetails?: boolean
  /** Enable lightbox mode */
  enableLightbox?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Error state */
  error?: string
  /** Additional CSS classes */
  className?: string
  /** Callback when image changes */
  onImageChange?: (index: number) => void
}

function ImageComparisonSlider({
  before,
  after,
  initialPosition = 50,
  className,
}: {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  initialPosition?: number
  className?: string
}) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, percentage)))
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])
  const handleTouchEnd = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd])

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-lg cursor-ew-resize', className)}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After image (full width) */}
      <div className="relative w-full h-full">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ChevronLeft className="w-3 h-3 text-gray-600 absolute -left-0.5" />
          <ChevronRight className="w-3 h-3 text-gray-600 absolute -right-0.5" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
        After
      </div>
    </div>
  )
}

export function BeforeAfterGallery({
  images,
  initialPosition = 50,
  showThumbnails = true,
  showDetails = true,
  enableLightbox = true,
  isLoading = false,
  error,
  className,
  onImageChange,
}: BeforeAfterGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleImageChange = (index: number) => {
    setCurrentIndex(index)
    onImageChange?.(index)
  }

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    handleImageChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    handleImageChange(newIndex)
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="aspect-[4/3] bg-muted animate-pulse rounded-lg" />
        {showThumbnails && (
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-muted animate-pulse rounded-md" />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn('p-8 text-center bg-destructive/10 rounded-lg', className)}>
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  if (!images.length) {
    return (
      <div className={cn('p-8 text-center bg-muted rounded-lg', className)}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <>
      <div className={cn('space-y-4', className)}>
        {/* Main comparison viewer */}
        <div className="relative">
          <div className="aspect-[4/3] relative bg-muted rounded-lg overflow-hidden">
            <ImageComparisonSlider
              before={currentImage.beforeImage}
              after={currentImage.afterImage}
              initialPosition={initialPosition}
              className="w-full h-full"
            />
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Lightbox button */}
          {enableLightbox && (
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Open in lightbox"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Project details */}
        {showDetails && (currentImage.title || currentImage.description) && (
          <div className="space-y-2">
            {currentImage.title && (
              <h3 className="text-lg font-semibold">{currentImage.title}</h3>
            )}
            {currentImage.description && (
              <p className="text-muted-foreground">{currentImage.description}</p>
            )}
            <div className="flex gap-4 text-sm text-muted-foreground">
              {currentImage.projectType && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Type:</span> {currentImage.projectType}
                </span>
              )}
              {currentImage.projectDate && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Date:</span> {currentImage.projectDate}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleImageChange(index)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ring-2 ring-offset-2 transition-all',
                  currentIndex === index
                    ? 'ring-primary'
                    : 'ring-transparent hover:ring-muted-foreground/50'
                )}
                aria-label={`View ${image.title || `image ${index + 1}`}`}
              >
                <Image
                  src={image.afterImage.src}
                  alt={image.afterImage.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {enableLightbox && isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full max-w-6xl aspect-[4/3] relative">
            <ImageComparisonSlider
              before={currentImage.beforeImage}
              after={currentImage.afterImage}
              initialPosition={initialPosition}
              className="w-full h-full"
            />
          </div>

          {/* Lightbox navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}