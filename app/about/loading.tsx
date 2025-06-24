import { ContentLoader } from '@/components/ui/ContentLoader'
import { Skeleton, SkeletonText, SkeletonAvatar } from '@/components/ui/Skeleton'

export default function AboutLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton variant="text" height={48} width="70%" className="mx-auto" />
            <SkeletonText lines={3} className="max-w-3xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Company story section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton variant="text" height={36} width="60%" />
              <SkeletonText lines={5} />
              <SkeletonText lines={4} />
            </div>
            <Skeleton variant="rounded" height={400} />
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton variant="text" height={36} width={250} className="mx-auto mb-4" />
            <SkeletonText lines={2} className="max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-4">
                <Skeleton variant="rounded" width={80} height={80} className="mx-auto" />
                <Skeleton variant="text" height={24} width="70%" className="mx-auto" />
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton variant="text" height={36} width={200} className="mx-auto mb-4" />
            <SkeletonText lines={2} className="max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="text-center space-y-4">
                <SkeletonAvatar size={120} className="mx-auto" />
                <div className="space-y-2">
                  <Skeleton variant="text" height={20} width="80%" className="mx-auto" />
                  <Skeleton variant="text" height={16} width="60%" className="mx-auto" />
                </div>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} variant="circular" width={32} height={32} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}