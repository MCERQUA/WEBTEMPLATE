import { LoadingSpinnerPage } from '@/components/ui/LoadingSpinner'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Skeleton variant="text" width={120} height={32} />
            <div className="hidden md:flex items-center gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="text" width={80} height={20} />
              ))}
            </div>
            <Skeleton variant="rounded" width={100} height={40} />
          </div>
        </div>
      </div>

      {/* Main content area with spinner */}
      <main className="container mx-auto px-4 py-16">
        <LoadingSpinnerPage message="Loading page..." />
      </main>
    </div>
  )
}