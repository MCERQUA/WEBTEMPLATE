/**
 * Loading utilities for managing loading states and transitions
 */

// Minimum loading time to prevent flash of loading state
export const MIN_LOADING_TIME = 300

// Delay before showing loading state to prevent flash for quick operations
export const LOADING_DELAY = 150

/**
 * Ensures a minimum loading time to prevent jarring quick flashes
 */
export async function withMinLoadingTime<T>(
  promise: Promise<T>,
  minTime: number = MIN_LOADING_TIME
): Promise<T> {
  const start = Date.now()
  const result = await promise
  const elapsed = Date.now() - start
  
  if (elapsed < minTime) {
    await new Promise(resolve => setTimeout(resolve, minTime - elapsed))
  }
  
  return result
}

/**
 * Wraps an async function to track loading state
 */
export function withLoadingState<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: {
    onStart?: () => void
    onComplete?: () => void
    onError?: (error: Error) => void
    minLoadingTime?: number
  }
): T {
  return (async (...args: Parameters<T>) => {
    const { onStart, onComplete, onError, minLoadingTime } = options || {}
    
    try {
      onStart?.()
      
      if (minLoadingTime) {
        return await withMinLoadingTime(fn(...args), minLoadingTime)
      }
      
      return await fn(...args)
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Unknown error'))
      throw error
    } finally {
      onComplete?.()
    }
  }) as T
}

/**
 * Creates a debounced loading state to prevent rapid on/off states
 */
export class DebouncedLoadingState {
  private showTimer: NodeJS.Timeout | null = null
  private hideTimer: NodeJS.Timeout | null = null
  private isVisible = false
  
  constructor(
    private onShow: () => void,
    private onHide: () => void,
    private showDelay: number = LOADING_DELAY,
    private hideDelay: number = 0
  ) {}

  show() {
    // Clear any pending hide
    if (this.hideTimer) {
      clearTimeout(this.hideTimer)
      this.hideTimer = null
    }

    // If already visible, do nothing
    if (this.isVisible) return

    // Set timer to show
    this.showTimer = setTimeout(() => {
      this.isVisible = true
      this.onShow()
    }, this.showDelay)
  }

  hide() {
    // Clear any pending show
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = null
    }

    // If not visible, do nothing
    if (!this.isVisible) return

    // Set timer to hide
    if (this.hideDelay > 0) {
      this.hideTimer = setTimeout(() => {
        this.isVisible = false
        this.onHide()
      }, this.hideDelay)
    } else {
      this.isVisible = false
      this.onHide()
    }
  }

  forceHide() {
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = null
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer)
      this.hideTimer = null
    }
    if (this.isVisible) {
      this.isVisible = false
      this.onHide()
    }
  }

  destroy() {
    if (this.showTimer) clearTimeout(this.showTimer)
    if (this.hideTimer) clearTimeout(this.hideTimer)
  }
}

/**
 * Simulates a loading delay for demo purposes
 */
export function simulateLoading(delay: number = 2000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Loading state manager for complex operations
 */
export class LoadingStateManager {
  private states = new Map<string, boolean>()
  private listeners = new Set<(isLoading: boolean) => void>()

  setLoading(key: string, isLoading: boolean) {
    if (isLoading) {
      this.states.set(key, true)
    } else {
      this.states.delete(key)
    }
    this.notifyListeners()
  }

  isLoading(key?: string): boolean {
    if (key) {
      return this.states.has(key)
    }
    return this.states.size > 0
  }

  subscribe(listener: (isLoading: boolean) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    const isLoading = this.isLoading()
    this.listeners.forEach(listener => listener(isLoading))
  }

  reset() {
    this.states.clear()
    this.notifyListeners()
  }
}

/**
 * Generates accessible loading messages
 */
export function getLoadingMessage(context: string, progress?: number): string {
  if (progress !== undefined) {
    return `Loading ${context}: ${Math.round(progress)}% complete`
  }
  return `Loading ${context}...`
}

/**
 * Creates a promise that resolves when an element is no longer in loading state
 */
export function waitForLoadingComplete(
  element: HTMLElement,
  timeout: number = 10000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    const checkLoading = () => {
      // Check various loading indicators
      const hasLoadingClass = element.classList.contains('loading')
      const hasLoadingAttribute = element.getAttribute('aria-busy') === 'true'
      const hasLoadingRole = element.querySelector('[role="status"]') !== null
      
      if (!hasLoadingClass && !hasLoadingAttribute && !hasLoadingRole) {
        resolve()
        return
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error('Loading timeout exceeded'))
        return
      }
      
      requestAnimationFrame(checkLoading)
    }
    
    checkLoading()
  })
}