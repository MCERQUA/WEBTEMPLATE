import { ContentLoader } from '@/components/ui/ContentLoader'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'
import { TestimonialLoader } from '@/components/ui/ContentLoader'

export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb skeleton */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton variant="text" width={50} height={16} />
            <span className="text-gray-400">/</span>
            <Skeleton variant="text" width={80} height={16} />
            <span className="text-gray-400">/</span>
            <Skeleton variant="text" width={120} height={16} />
          </div>
        </div>
      </div>

      {/* Hero section skeleton */}
      <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton variant="text" height={48} width="90%" />
              <SkeletonText lines={4} />
              <div className="flex flex-wrap gap-4">
                <Skeleton variant="rounded" width={160} height={48} />
                <Skeleton variant="rounded" width={140} height={48} />
              </div>
            </div>
            <div>
              <Skeleton variant="rounded" height={400} />
            </div>
          </div>
        </div>
      </section>

      {/* Service details skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContentLoader variant="article" />
          </div>
        </div>
      </section>

      {/* Features/Benefits skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton variant="text" height={36} width={300} className="mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-4">
                <Skeleton variant="circular" width={64} height={64} className="mx-auto" />
                <Skeleton variant="text" height={24} width="80%" className="mx-auto" />
                <SkeletonText lines={2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton variant="text" height={36} width={250} className="mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <TestimonialLoader key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}