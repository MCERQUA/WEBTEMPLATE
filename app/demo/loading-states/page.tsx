import { LoadingExample } from '@/components/ui/LoadingExample'

export const metadata = {
  title: 'Loading States Demo',
  description: 'Showcase of loading components and states'
}

export default function LoadingStatesDemo() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Loading States Demo</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive showcase of loading components, skeletons, and transition effects
              designed to provide smooth user experiences during data fetching and route changes.
            </p>
          </div>

          <LoadingExample />

          <div className="mt-16 p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Basic Loading Spinner</h3>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                  <code>{`import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

// Basic usage
<LoadingSpinner />

// With options
<LoadingSpinner size="lg" color="primary" />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Skeleton Components</h3>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                  <code>{`import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

// Basic skeleton
<Skeleton variant="rounded" height={200} width="100%" />

// Text skeleton
<SkeletonText lines={3} />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Content Loaders</h3>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                  <code>{`import { ContentLoader } from '@/components/ui/ContentLoader'

// Different variants
<ContentLoader variant="article" />
<ContentLoader variant="grid" items={6} />
<ContentLoader variant="profile" />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Loading Hooks</h3>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                  <code>{`import { useLoading, useAsyncLoading } from '@/lib/hooks/useLoading'

// Basic loading state
const { isLoading, startLoading, stopLoading } = useLoading()

// Async operations
const { data, error, isLoading, execute } = useAsyncLoading()
await execute(async () => fetchData())`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">5. Page Loading States</h3>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                  <code>{`// Create loading.tsx in any route folder
// app/services/loading.tsx

export default function Loading() {
  return <YourLoadingComponent />
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Use skeleton screens that match your actual content layout to prevent layout shift</li>
              <li>Add a small delay (150ms) before showing loading states to prevent flash for quick operations</li>
              <li>Provide accessible loading announcements with proper ARIA labels</li>
              <li>Use progressive loading for complex multi-step operations</li>
              <li>Keep loading animations subtle and consistent across the application</li>
              <li>Always provide feedback for user-initiated actions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}