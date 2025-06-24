import { ContentLoader } from '@/components/ui/ContentLoader'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton variant="text" height={48} width="60%" className="mx-auto" />
            <SkeletonText lines={2} className="max-w-2xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact form skeleton */}
            <div className="order-2 lg:order-1">
              <Skeleton variant="text" height={32} width={200} className="mb-6" />
              <ContentLoader variant="form" />
            </div>

            {/* Contact info skeleton */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <Skeleton variant="text" height={28} width={150} className="mb-6" />
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="space-y-2">
                      <Skeleton variant="text" height={20} width={100} />
                      <Skeleton variant="text" height={24} width={180} />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="space-y-2">
                      <Skeleton variant="text" height={20} width={80} />
                      <Skeleton variant="text" height={24} width={220} />
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="space-y-2">
                      <Skeleton variant="text" height={20} width={100} />
                      <SkeletonText lines={2} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business hours skeleton */}
              <div>
                <Skeleton variant="text" height={28} width={180} className="mb-6" />
                <div className="space-y-3">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton variant="text" height={20} width={80} />
                      <Skeleton variant="text" height={20} width={120} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Service area skeleton */}
              <div>
                <Skeleton variant="text" height={28} width={150} className="mb-4" />
                <Skeleton variant="rounded" height={200} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}