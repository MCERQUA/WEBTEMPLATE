import { ContentLoader, ServiceCardLoader } from '@/components/ui/ContentLoader'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero section skeleton */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton variant="text" height={48} width="80%" className="mx-auto" />
            <SkeletonText lines={2} className="max-w-2xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Services grid skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardLoader key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section skeleton */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Skeleton variant="text" height={36} width="70%" className="mx-auto" />
            <SkeletonText lines={2} className="max-w-xl mx-auto" />
            <div className="flex justify-center gap-4 pt-4">
              <Skeleton variant="rounded" width={140} height={48} />
              <Skeleton variant="rounded" width={140} height={48} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}