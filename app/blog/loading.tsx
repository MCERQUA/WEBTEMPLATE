import { ContentLoader } from '@/components/ui/ContentLoader'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function BlogLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton variant="text" height={48} width="60%" className="mx-auto" />
            <SkeletonText lines={2} className="max-w-2xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Featured post skeleton */}
          <div className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-lg">
              <Skeleton variant="rounded" height={300} />
              <div className="space-y-4 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm">
                  <Skeleton variant="text" width={80} height={16} />
                  <Skeleton variant="text" width={100} height={16} />
                </div>
                <Skeleton variant="text" height={32} width="80%" />
                <SkeletonText lines={3} />
                <Skeleton variant="text" width={100} height={20} />
              </div>
            </div>
          </div>

          {/* Blog posts list */}
          <ContentLoader variant="list" items={6} />
        </div>
      </section>
    </div>
  )
}