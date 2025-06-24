'use client'

import { useState } from 'react'
import { Button } from './Button'
import { LoadingSpinner, LoadingSpinnerPage, LoadingOverlay, LoadingDots } from './LoadingSpinner'
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonButton } from './Skeleton'
import { ContentLoader, ServiceCardLoader, TestimonialLoader } from './ContentLoader'
import { FadeTransition, SlideTransition, ScaleTransition, StaggerTransition } from './PageTransition'
import { useLoading, useAsyncLoading, useProgressiveLoading } from '@/lib/hooks/useLoading'
import { simulateLoading } from '@/lib/utils/loading'

export function LoadingExample() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showTransitions, setShowTransitions] = useState(false)
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { execute: executeAsync, isLoading: isAsyncLoading } = useAsyncLoading()
  
  const progressSteps = ['Fetching data', 'Processing', 'Finalizing']
  const { currentStepName, progress, nextStep, reset: resetProgress } = useProgressiveLoading(progressSteps)

  const handleSimulateLoading = async () => {
    startLoading()
    await simulateLoading(3000)
    stopLoading()
  }

  const handleAsyncOperation = async () => {
    await executeAsync(async () => {
      await simulateLoading(2000)
      return 'Operation completed!'
    })
  }

  const handleProgressiveLoading = async () => {
    resetProgress()
    for (let i = 0; i < progressSteps.length; i++) {
      await simulateLoading(1000)
      nextStep()
    }
  }

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Loading Components Showcase</h2>
        
        {/* Loading Spinners */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Loading Spinners</h3>
          <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <p className="text-sm mt-2">Small</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <p className="text-sm mt-2">Medium</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="text-sm mt-2">Large</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="xl" />
              <p className="text-sm mt-2">Extra Large</p>
            </div>
          </div>

          <div className="flex items-center gap-8 p-6 bg-gray-900 rounded-lg">
            <LoadingSpinner color="white" />
            <LoadingSpinner color="primary" />
            <LoadingSpinner color="secondary" />
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="flex items-center gap-2">
              Loading inline content <LoadingDots />
            </p>
          </div>
        </section>

        {/* Skeleton Components */}
        <section className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold mb-4">Skeleton Components</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Text Skeleton</h4>
              <SkeletonText lines={3} />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Avatar & Button</h4>
              <div className="flex items-center gap-4">
                <SkeletonAvatar size={60} />
                <div className="space-y-2">
                  <Skeleton variant="text" height={20} width={150} />
                  <Skeleton variant="text" height={16} width={100} />
                </div>
              </div>
              <SkeletonButton />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <h4 className="font-medium mb-3">Card Skeleton</h4>
              <SkeletonCard />
            </div>
            <div>
              <h4 className="font-medium mb-3">Service Card</h4>
              <ServiceCardLoader />
            </div>
            <div>
              <h4 className="font-medium mb-3">Testimonial</h4>
              <TestimonialLoader />
            </div>
          </div>
        </section>

        {/* Content Loaders */}
        <section className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold mb-4">Content Loaders</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Article Loader</h4>
              <div className="border rounded-lg p-6 max-h-96 overflow-auto">
                <ContentLoader variant="article" />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Grid Loader</h4>
              <ContentLoader variant="grid" items={3} />
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold mb-4">Interactive Examples</h3>
          
          <div className="space-y-4">
            <div className="relative p-6 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Loading Overlay</h4>
              <Button onClick={() => setShowOverlay(!showOverlay)}>
                Toggle Overlay
              </Button>
              <LoadingOverlay visible={showOverlay} />
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">useLoading Hook</h4>
              <div className="flex items-center gap-4">
                <Button onClick={handleSimulateLoading} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Start Loading'}
                </Button>
                {isLoading && <LoadingSpinner size="sm" />}
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Async Loading</h4>
              <Button onClick={handleAsyncOperation} disabled={isAsyncLoading}>
                {isAsyncLoading ? <LoadingSpinner size="sm" color="white" /> : 'Run Async Operation'}
              </Button>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Progressive Loading</h4>
              <div className="space-y-4">
                <Button onClick={handleProgressiveLoading}>
                  Start Progressive Loading
                </Button>
                {progress > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm">Current step: {currentStepName}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{Math.round(progress)}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Page Transitions */}
        <section className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold mb-4">Page Transitions</h3>
          
          <div className="space-y-4">
            <Button onClick={() => setShowTransitions(!showTransitions)}>
              Toggle Transitions
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Fade Transition</h4>
                <FadeTransition show={showTransitions}>
                  <div className="p-4 bg-white rounded shadow">
                    Fade content
                  </div>
                </FadeTransition>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Slide Transition</h4>
                <SlideTransition show={showTransitions} direction="up">
                  <div className="p-4 bg-white rounded shadow">
                    Slide content
                  </div>
                </SlideTransition>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Scale Transition</h4>
                <ScaleTransition show={showTransitions}>
                  <div className="p-4 bg-white rounded shadow">
                    Scale content
                  </div>
                </ScaleTransition>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Stagger Transition</h4>
                <StaggerTransition>
                  {showTransitions && ['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
                    <div key={i} className="p-2 bg-white rounded shadow mb-2">
                      {item}
                    </div>
                  ))}
                </StaggerTransition>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}