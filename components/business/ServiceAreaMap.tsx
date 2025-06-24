import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ServiceArea {
  name: string
  coordinates: [number, number] // [latitude, longitude]
  radius?: number // in miles
}

export interface ServiceAreaMapProps {
  /** Center point for the map */
  center: [number, number]
  /** List of service areas to display */
  serviceAreas: ServiceArea[]
  /** Map zoom level (1-20) */
  zoom?: number
  /** Height of the map container */
  height?: string
  /** Whether to show area boundaries */
  showBoundaries?: boolean
  /** Whether to show location markers */
  showMarkers?: boolean
  /** Additional CSS classes */
  className?: string
  /** Loading state */
  isLoading?: boolean
  /** Error message */
  error?: string
  /** Callback when an area is clicked */
  onAreaClick?: (area: ServiceArea) => void
}

export function ServiceAreaMap({
  center,
  serviceAreas,
  zoom = 10,
  height = '400px',
  showBoundaries = true,
  showMarkers = true,
  className,
  isLoading = false,
  error,
  onAreaClick,
}: ServiceAreaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, you would initialize a map library here
    // For this template, we'll create a placeholder that can be replaced
    // with actual map implementation (Google Maps, Mapbox, Leaflet, etc.)
    
    if (!mapContainerRef.current || isLoading || error) return

    // Placeholder for map initialization
    const initializeMap = async () => {
      try {
        // Map initialization code would go here
        console.log('Map initialized with center:', center, 'and zoom:', zoom)
        console.log('Service areas:', serviceAreas)
      } catch (err) {
        setMapError('Failed to load map. Please try again later.')
      }
    }

    initializeMap()

    // Cleanup function
    return () => {
      // Map cleanup code would go here
    }
  }, [center, serviceAreas, zoom, isLoading, error])

  // Loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          'relative bg-muted rounded-lg overflow-hidden animate-pulse',
          className
        )}
        style={{ height }}
        role="status"
        aria-label="Loading map"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || mapError) {
    return (
      <div
        className={cn(
          'relative bg-destructive/10 border border-destructive/20 rounded-lg overflow-hidden',
          className
        )}
        style={{ height }}
        role="alert"
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-destructive mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm font-medium text-destructive">
              {error || mapError}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-xs text-destructive underline hover:no-underline"
            >
              Try refreshing the page
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main map render
  return (
    <div
      className={cn(
        'relative bg-muted rounded-lg overflow-hidden border border-border',
        className
      )}
      style={{ height }}
    >
      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
        role="application"
        aria-label="Service area map"
      />

      {/* Placeholder content - Remove when implementing actual map */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
        <div className="text-center p-6 bg-background/90 rounded-lg shadow-lg max-w-md">
          <svg
            className="w-16 h-16 text-primary mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Service Area Map</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This is a placeholder for the interactive map. Integrate with your preferred map provider
            (Google Maps, Mapbox, Leaflet) to display service areas.
          </p>
          <div className="text-left bg-muted/50 rounded p-3 text-xs font-mono">
            <p>Center: [{center[0]}, {center[1]}]</p>
            <p>Areas: {serviceAreas.length}</p>
            <p>Zoom: {zoom}</p>
          </div>
        </div>
      </div>

      {/* Map controls placeholder */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          className="bg-background border border-border rounded-md p-2 shadow-sm hover:bg-accent transition-colors"
          aria-label="Zoom in"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </button>
        <button
          className="bg-background border border-border rounded-md p-2 shadow-sm hover:bg-accent transition-colors"
          aria-label="Zoom out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-medium mb-2">Service Areas</h4>
        <ul className="space-y-1">
          {serviceAreas.map((area, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-xs cursor-pointer hover:text-primary transition-colors"
              onClick={() => onAreaClick?.(area)}
            >
              <span
                className="w-3 h-3 rounded-full bg-primary"
                style={{ opacity: 0.7 - index * 0.1 }}
              />
              <span>{area.name}</span>
              {area.radius && <span className="text-muted-foreground">({area.radius}mi)</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}