import { cn } from '@/lib/utils/cn'

export interface TestimonialCardProps {
  /** Customer name */
  name: string
  /** Customer title or location */
  title?: string
  /** Testimonial content */
  content: string
  /** Customer avatar URL */
  avatar?: string
  /** Rating (1-5) */
  rating?: number
  /** Date of the testimonial */
  date?: string
  /** Source of the review (Google, Yelp, etc.) */
  source?: 'google' | 'yelp' | 'facebook' | 'custom'
  /** Whether to show as featured */
  featured?: boolean
  /** Card variant */
  variant?: 'default' | 'compact' | 'detailed'
  /** Additional CSS classes */
  className?: string
  /** Verified review badge */
  verified?: boolean
}

const sourceIcons = {
  google: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  yelp: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.9 2.5c.5-.3 1.1-.3 1.6 0 .5.3.8.8.8 1.4v6.6c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6V3.9c0-.6.3-1.1.8-1.4zM9.1 14.2c.3-.5.8-.8 1.4-.8.3 0 .5.1.8.2l5.8 3.3c.8.5 1.1 1.5.6 2.3-.3.5-.8.8-1.4.8-.3 0-.5-.1-.8-.2l-5.8-3.3c-.8-.5-1.1-1.5-.6-2.3zM7.6 10.4c-.3.5-.8.8-1.4.8-.3 0-.5-.1-.8-.2L2.9 9.3c-.8-.5-1.1-1.5-.6-2.3.3-.5.8-.8 1.4-.8.3 0 .5.1.8.2l2.5 1.7c.8.5 1.1 1.5.6 2.3zM8.4 16.6c.5.3.8.8.8 1.4 0 .3-.1.5-.2.8l-2 3.5c-.5.8-1.5 1.1-2.3.6-.8-.5-1.1-1.5-.6-2.3l2-3.5c.3-.5.8-.8 1.4-.8.3 0 .5.1.8.2zM16.8 16.8c.5-.3 1.1-.3 1.6 0l2.5 1.7c.8.5 1.1 1.5.6 2.3-.3.5-.8.8-1.4.8-.3 0-.5-.1-.8-.2l-2.5-1.7c-.8-.5-1.1-1.5-.6-2.3.1-.3.3-.5.6-.6z" />
    </svg>
  ),
  facebook: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  custom: null,
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
          )}
          viewBox="0 0 24 24"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({
  name,
  title,
  content,
  avatar,
  rating,
  date,
  source,
  featured = false,
  variant = 'default',
  className,
  verified = false,
}: TestimonialCardProps) {
  const variants = {
    default: cn(
      'p-6 rounded-lg border bg-card',
      featured && 'border-primary shadow-lg'
    ),
    compact: 'p-4 rounded-md border bg-card',
    detailed: cn(
      'p-8 rounded-xl border bg-card',
      featured && 'border-primary shadow-xl'
    ),
  }

  const avatarSizes = {
    default: 'w-12 h-12',
    compact: 'w-10 h-10',
    detailed: 'w-16 h-16',
  }

  return (
    <article
      className={cn(
        variants[variant],
        'transition-all hover:shadow-md',
        className
      )}
      aria-label={`Testimonial from ${name}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className={cn(
                avatarSizes[variant],
                'rounded-full object-cover'
              )}
            />
          ) : (
            <div
              className={cn(
                avatarSizes[variant],
                'rounded-full bg-primary/10 flex items-center justify-center'
              )}
              aria-hidden="true"
            >
              <span className="text-lg font-semibold text-primary">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Name and title */}
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            {title && (
              <p className="text-sm text-muted-foreground">{title}</p>
            )}
          </div>
        </div>

        {/* Source icon */}
        {source && sourceIcons[source] && (
          <div className="text-muted-foreground">
            {sourceIcons[source]}
          </div>
        )}
      </div>

      {/* Rating */}
      {rating && (
        <div className="mb-3">
          <StarRating rating={rating} size={variant === 'compact' ? 'sm' : 'lg'} />
        </div>
      )}

      {/* Content */}
      <blockquote
        className={cn(
          'text-muted-foreground',
          variant === 'compact' ? 'text-sm' : 'text-base',
          variant === 'detailed' && 'text-lg leading-relaxed'
        )}
      >
        "{content}"
      </blockquote>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        {date && (
          <time
            dateTime={date}
            className="text-xs text-muted-foreground"
          >
            {new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        )}

        {verified && (
          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
          Featured
        </div>
      )}
    </article>
  )
}