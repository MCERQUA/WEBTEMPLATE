import { cn } from '@/lib/utils/cn'
import { Skeleton, SkeletonText, SkeletonCard } from './Skeleton'

interface ContentLoaderProps {
  variant?: 'article' | 'list' | 'grid' | 'profile' | 'form'
  className?: string
  items?: number
}

export function ContentLoader({
  variant = 'article',
  className,
  items = 3
}: ContentLoaderProps) {
  const baseClasses = 'animate-fade-in'

  switch (variant) {
    case 'article':
      return <ArticleLoader className={cn(baseClasses, className)} />
    case 'list':
      return <ListLoader items={items} className={cn(baseClasses, className)} />
    case 'grid':
      return <GridLoader items={items} className={cn(baseClasses, className)} />
    case 'profile':
      return <ProfileLoader className={cn(baseClasses, className)} />
    case 'form':
      return <FormLoader className={cn(baseClasses, className)} />
    default:
      return <ArticleLoader className={cn(baseClasses, className)} />
  }
}

function ArticleLoader({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Title */}
      <Skeleton variant="text" height={40} width="70%" />
      
      {/* Meta info */}
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-2">
          <Skeleton variant="text" height={16} width={120} />
          <Skeleton variant="text" height={14} width={80} />
        </div>
      </div>

      {/* Hero image */}
      <Skeleton variant="rounded" height={400} />

      {/* Content paragraphs */}
      <div className="space-y-4">
        <SkeletonText lines={4} />
        <SkeletonText lines={3} />
        <SkeletonText lines={5} />
      </div>
    </div>
  )
}

function ListLoader({ items, className }: { items: number; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
          <Skeleton variant="rounded" width={100} height={100} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height={20} width="60%" />
            <SkeletonText lines={2} />
            <Skeleton variant="text" height={16} width={100} />
          </div>
        </div>
      ))}
    </div>
  )
}

function GridLoader({ items, className }: { items: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

function ProfileLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center space-y-4 text-center', className)}>
      <Skeleton variant="circular" width={120} height={120} />
      <div className="space-y-2">
        <Skeleton variant="text" height={24} width={200} />
        <Skeleton variant="text" height={16} width={150} />
      </div>
      <div className="w-full max-w-md space-y-2 pt-4">
        <SkeletonText lines={3} />
      </div>
      <div className="flex gap-2 pt-4">
        <Skeleton variant="rounded" width={100} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </div>
    </div>
  )
}

function FormLoader({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-4">
        {/* Form fields */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" height={16} width={100} />
            <Skeleton variant="rounded" height={40} />
          </div>
        ))}
        
        {/* Textarea */}
        <div className="space-y-2">
          <Skeleton variant="text" height={16} width={100} />
          <Skeleton variant="rounded" height={120} />
        </div>
      </div>
      
      {/* Submit button */}
      <Skeleton variant="rounded" height={44} width={150} />
    </div>
  )
}

// Service-specific loaders
export function ServiceCardLoader() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg space-y-4">
      <Skeleton variant="rounded" width={48} height={48} />
      <Skeleton variant="text" height={24} width="70%" />
      <SkeletonText lines={3} />
      <Skeleton variant="text" height={16} width={100} />
    </div>
  )
}

export function TestimonialLoader() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg space-y-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="text" width={16} height={16} />
        ))}
      </div>
      <SkeletonText lines={3} />
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-1">
          <Skeleton variant="text" height={16} width={100} />
          <Skeleton variant="text" height={14} width={80} />
        </div>
      </div>
    </div>
  )
}