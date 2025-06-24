import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'white' | 'current'
  className?: string
  label?: string
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className,
  label = 'Loading'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    white: 'text-white',
    current: 'text-current'
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-block', className)}
    >
      <svg
        className={cn(
          'animate-spin',
          sizeClasses[size],
          colorClasses[color]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Centered loading spinner for full page loading
export function LoadingSpinnerPage({
  message = 'Loading...',
  className
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={cn(
      'flex min-h-[400px] flex-col items-center justify-center',
      className
    )}>
      <LoadingSpinner size="lg" />
      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
}

// Loading overlay with spinner
export function LoadingOverlay({
  visible = true,
  className
}: {
  visible?: boolean
  className?: string
}) {
  if (!visible) return null

  return (
    <div className={cn(
      'absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm',
      className
    )}>
      <LoadingSpinner size="lg" />
    </div>
  )
}

// Inline loading indicator
export function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className="animate-bounce delay-0 h-1 w-1 rounded-full bg-current" />
      <span className="animate-bounce delay-100 h-1 w-1 rounded-full bg-current" />
      <span className="animate-bounce delay-200 h-1 w-1 rounded-full bg-current" />
    </span>
  )
}