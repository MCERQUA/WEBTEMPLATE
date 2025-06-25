"use client"

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from './FormField'
import { cn } from '@/lib/utils/cn'
import { MapPin, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'

export interface ServiceAreaCheckerProps {
  serviceAreas?: ServiceAreaConfig[]
  onCheck?: (zipCode: string, isInArea: boolean) => void
  className?: string
  title?: string
  description?: string
  inAreaMessage?: string
  outOfAreaMessage?: string
  showContactForm?: boolean
  analyticsEvent?: string
}

export interface ServiceAreaConfig {
  zipCodes?: string[]
  cities?: string[]
  counties?: string[]
  radius?: {
    center: string // ZIP code of center
    miles: number
  }
}

// Default service areas - customize based on business location
const defaultServiceAreas: ServiceAreaConfig[] = [
  {
    zipCodes: ['85001', '85002', '85003', '85004', '85005', '85006', '85007', '85008', '85009', '85010'],
    cities: ['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Glendale', 'Chandler'],
    counties: ['Maricopa'],
  },
]

export function ServiceAreaChecker({
  serviceAreas = defaultServiceAreas,
  onCheck,
  className,
  title = 'Check Service Availability',
  description = 'Enter your ZIP code to see if we service your area',
  inAreaMessage = "Great news! We service your area.",
  outOfAreaMessage = "We&apos;re sorry, but we don&apos;t currently service your area.",
  showContactForm = true,
  analyticsEvent = 'service_area_check',
}: ServiceAreaCheckerProps) {
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [checkResult, setCheckResult] = useState<'idle' | 'checking' | 'in-area' | 'out-area'>('idle')
  const [error, setError] = useState('')
  const [showAlternatives, setShowAlternatives] = useState(false)

  const validateZipCode = (zip: string): boolean => {
    return /^\d{5}$/.test(zip)
  }

  const checkServiceArea = useCallback(async (zip: string): Promise<boolean> => {
    // Check if ZIP is in any of the configured service areas
    for (const area of serviceAreas) {
      // Check direct ZIP code match
      if (area.zipCodes?.includes(zip)) {
        return true
      }
      
      // In a real implementation, you would:
      // 1. Use a geocoding API to get city/county from ZIP
      // 2. Check if the city/county matches
      // 3. Calculate distance from center point if radius is specified
      
      // For demo purposes, we'll just check the ZIP codes
    }
    
    return false
  }, [serviceAreas])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateZipCode(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code')
      return
    }
    
    setError('')
    setCheckResult('checking')
    setShowAlternatives(false)
    
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', analyticsEvent, {
        zip_code: zipCode,
      })
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const isInServiceArea = await checkServiceArea(zipCode)
      setCheckResult(isInServiceArea ? 'in-area' : 'out-area')
      
      if (!isInServiceArea) {
        setShowAlternatives(true)
      }
      
      onCheck?.(zipCode, isInServiceArea)
    } catch (err) {
      console.error('Error checking service area:', err)
      setError('An error occurred. Please try again.')
      setCheckResult('idle')
    }
  }

  const handleReset = () => {
    setZipCode('')
    setCity('')
    setCheckResult('idle')
    setError('')
    setShowAlternatives(false)
  }

  const nearbyAreas = serviceAreas[0]?.cities?.slice(0, 3) || []

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex gap-3">
          <FormField
            label=""
            name="zipCode"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))
              if (error) setError('')
              if (checkResult !== 'idle') setCheckResult('idle')
            }}
            error={error}
            placeholder="Enter ZIP code"
            className="flex-1"
            inputClassName="text-center text-lg"
            autoComplete="postal-code"
            aria-label="ZIP code"
          />
          
          <Button
            type="submit"
            disabled={checkResult === 'checking' || !zipCode}
            className="self-end"
          >
            {checkResult === 'checking' ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Check
              </>
            )}
          </Button>
        </div>
      </form>
      
      {/* Results */}
      {checkResult === 'in-area' && (
        <div className="max-w-md mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-green-900 mb-2">
              {inAreaMessage}
            </h4>
            <p className="text-green-700 mb-4">
              We&apos;re happy to serve customers in {zipCode}.
            </p>
            <div className="space-y-3">
              <Button href="/contact" className="w-full">
                Get a Free Quote
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                Check Another ZIP Code
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {checkResult === 'out-area' && (
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-red-900 mb-2">
              {outOfAreaMessage}
            </h4>
            <p className="text-red-700 mb-4">
              We don&apos;t currently service {zipCode}, but we&apos;re always expanding.
            </p>
            
            {showAlternatives && nearbyAreas.length > 0 && (
              <div className="mb-4 p-4 bg-white rounded-md">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  We do service these nearby areas:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {nearbyAreas.map((area) => (
                    <li key={area} className="flex items-center justify-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {showContactForm && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Want to be notified when we expand to your area?
                </p>
                <Button href="/contact" variant="outline" className="w-full">
                  Contact Us Anyway
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="w-full"
                >
                  Check Another ZIP Code
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Service Area List */}
      {checkResult === 'idle' && serviceAreas.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-500" />
              Our Service Areas Include:
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {serviceAreas.map((area, index) => (
                <div key={index}>
                  {area.cities && area.cities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Cities:</p>
                      <ul className="text-sm text-gray-600 space-y-0.5">
                        {area.cities.slice(0, 5).map((city) => (
                          <li key={city} className="flex items-center gap-1">
                            <span className="h-1 w-1 bg-primary-500 rounded-full" />
                            {city}
                          </li>
                        ))}
                        {area.cities.length > 5 && (
                          <li className="text-gray-500 italic">
                            and {area.cities.length - 5} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  {area.counties && area.counties.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Counties:</p>
                      <ul className="text-sm text-gray-600">
                        {area.counties.map((county) => (
                          <li key={county} className="flex items-center gap-1">
                            <span className="h-1 w-1 bg-primary-500 rounded-full" />
                            {county} County
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                Service availability may vary. Please contact us for specific locations or special requests.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
