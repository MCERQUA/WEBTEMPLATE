import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

export interface EmergencyBannerProps {
  /** Title of the emergency service */
  title: string
  /** Description or message */
  description: string
  /** Phone number for emergency contact */
  phoneNumber: string
  /** Whether the banner is currently active */
  isActive?: boolean
  /** Style variant */
  variant?: 'default' | 'urgent' | 'info'
  /** Position of the banner */
  position?: 'top' | 'bottom'
  /** Whether the banner can be dismissed */
  dismissible?: boolean
  /** Icon to display */
  icon?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Callback when banner is dismissed */
  onDismiss?: () => void
  /** Auto-hide after milliseconds (0 = never) */
  autoHideAfter?: number
}

export function EmergencyBanner({
  title,
  description,
  phoneNumber,
  isActive = true,
  variant = 'urgent',
  position = 'top',
  dismissible = true,
  icon,
  className,
  onDismiss,
  autoHideAfter = 0,
}: EmergencyBannerProps) {
  const [isVisible, setIsVisible] = useState(isActive)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isActive && autoHideAfter > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoHideAfter)

      return () => clearTimeout(timer)
    }
  }, [isActive, autoHideAfter])

  useEffect(() => {
    setIsVisible(isActive)
    if (isActive) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  const handleDismiss = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, 300)
  }

  if (!isVisible) return null

  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    urgent: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  }

  const iconElement = icon || (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {variant === 'urgent' ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )}
    </svg>
  )

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-300',
        position === 'top' ? 'top-0' : 'bottom-0',
        isAnimating && (position === 'top' ? '-translate-y-full' : 'translate-y-full'),
        variantStyles[variant],
        className
      )}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {iconElement}
            
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
              <p className="text-xs sm:text-sm opacity-90 mt-0.5">{description}</p>
            </div>

            <a
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all',
                'hover:scale-105 active:scale-95',
                variant === 'urgent'
                  ? 'bg-white text-red-600 hover:bg-red-50'
                  : variant === 'info'
                  ? 'bg-white text-blue-600 hover:bg-blue-50'
                  : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
              )}
              aria-label={`Call emergency number ${phoneNumber}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hidden sm:inline">{phoneNumber}</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>

          {dismissible && (
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss emergency banner"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile-optimized layout */}
        <div className="mt-2 flex items-center gap-2 sm:hidden">
          <span className="text-xs opacity-90">24/7 Emergency Service</span>
          <span className="text-xs">•</span>
          <a
            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
            className="text-xs font-medium underline"
          >
            {phoneNumber}
          </a>
        </div>
      </div>

      {/* Animated pulse effect for urgent banners */}
      {variant === 'urgent' && (
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse pointer-events-none" />
      )}
    </div>
  )
}