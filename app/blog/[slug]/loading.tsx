import { ContentLoader } from '@/components/ui/ContentLoader'
import { Skeleton } from '@/components/ui/Skeleton'

export default function BlogPostLoading() {
  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton variant="text" width={50} height={16} />
            <span className="text-gray-400">/</span>
            <Skeleton variant="text" width={40} height={16} />
            <span className="text-gray-400">/</span>
            <Skeleton variant="text" width={180} height={16} />
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ContentLoader variant="article" />
          
          {/* Author bio skeleton */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-start gap-4">
              <Skeleton variant="circular" width={64} height={64} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" height={24} width={200} />
                <Skeleton variant="text" height={16} width={150} />
                <Skeleton variant="text" height={16} width="100%" />
                <Skeleton variant="text" height={16} width="80%" />
              </div>
            </div>
          </div>

          {/* Related posts skeleton */}
          <div className="mt-12">
            <Skeleton variant="text" height={32} width={200} className="mb-6" />
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton variant="rounded" width={100} height={100} />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" height={20} width="90%" />
                    <Skeleton variant="text" height={16} width="100%" />
                    <Skeleton variant="text" height={14} width={80} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}