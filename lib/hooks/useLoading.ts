'use client'

import { useState, useCallback, useEffect } from 'react'

interface UseLoadingOptions {
  delay?: number
  timeout?: number
  onTimeout?: () => void
}

export function useLoading(initialState = false, options?: UseLoadingOptions) {
  const { delay = 0, timeout, onTimeout } = options || {}
  const [isLoading, setIsLoading] = useState(initialState)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let delayTimer: NodeJS.Timeout
    let timeoutTimer: NodeJS.Timeout

    if (isLoading) {
      // Delay showing loading state to prevent flash for quick operations
      if (delay > 0) {
        delayTimer = setTimeout(() => {
          setShowLoading(true)
        }, delay)
      } else {
        setShowLoading(true)
      }

      // Set timeout for long operations
      if (timeout && onTimeout) {
        timeoutTimer = setTimeout(() => {
          onTimeout()
          setIsLoading(false)
          setShowLoading(false)
        }, timeout)
      }
    } else {
      setShowLoading(false)
    }

    return () => {
      clearTimeout(delayTimer)
      clearTimeout(timeoutTimer)
    }
  }, [isLoading, delay, timeout, onTimeout])

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const toggleLoading = useCallback(() => {
    setIsLoading(prev => !prev)
  }, [])

  return {
    isLoading: showLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading: setIsLoading
  }
}

// Hook for managing multiple loading states
export function useMultipleLoading() {
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(new Map())

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates(prev => {
      const next = new Map(prev)
      if (isLoading) {
        next.set(key, true)
      } else {
        next.delete(key)
      }
      return next
    })
  }, [])

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates.has(key)
    }
    return loadingStates.size > 0
  }, [loadingStates])

  const clearAll = useCallback(() => {
    setLoadingStates(new Map())
  }, [])

  return {
    setLoading,
    isLoading,
    clearAll,
    loadingCount: loadingStates.size
  }
}

// Hook for progressive loading
export function useProgressiveLoading(steps: string[]) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const progress = (completedSteps.size / steps.length) * 100

  const completeStep = useCallback((step: string) => {
    setCompletedSteps(prev => new Set(prev).add(step))
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      completeStep(steps[currentStep])
    }
  }, [currentStep, steps, completeStep])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setCompletedSteps(new Set())
  }, [])

  return {
    currentStep,
    currentStepName: steps[currentStep],
    completedSteps,
    progress,
    completeStep,
    nextStep,
    reset,
    isComplete: completedSteps.size === steps.length
  }
}

// Hook for managing async operations with loading states
export function useAsyncLoading<T>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const { isLoading, startLoading, stopLoading } = useLoading()

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    startLoading()
    setError(null)
    
    try {
      const result = await asyncFunction()
      setData(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)
      throw error
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return {
    data,
    error,
    isLoading,
    execute,
    reset
  }
}