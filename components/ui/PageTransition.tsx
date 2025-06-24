'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function PageTransition({
  children,
  className,
  duration = 300
}: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [pathname, children, duration])

  return (
    <div
      className={cn(
        'transition-opacity duration-300',
        isTransitioning ? 'opacity-0' : 'opacity-100',
        className
      )}
    >
      {displayChildren}
    </div>
  )
}

// Fade transition component
export function FadeTransition({
  children,
  show = true,
  className,
  duration = 'duration-300'
}: {
  children: React.ReactNode
  show?: boolean
  className?: string
  duration?: string
}) {
  return (
    <div
      className={cn(
        'transition-all',
        duration,
        show ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
    >
      {children}
    </div>
  )
}

// Slide transition component
export function SlideTransition({
  children,
  show = true,
  direction = 'up',
  className,
  duration = 'duration-300'
}: {
  children: React.ReactNode
  show?: boolean
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  duration?: string
}) {
  const directionClasses = {
    up: show ? 'translate-y-0' : 'translate-y-4',
    down: show ? 'translate-y-0' : '-translate-y-4',
    left: show ? 'translate-x-0' : 'translate-x-4',
    right: show ? 'translate-x-0' : '-translate-x-4'
  }

  return (
    <div
      className={cn(
        'transition-all',
        duration,
        directionClasses[direction],
        show ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  )
}

// Scale transition component
export function ScaleTransition({
  children,
  show = true,
  className,
  duration = 'duration-300'
}: {
  children: React.ReactNode
  show?: boolean
  className?: string
  duration?: string
}) {
  return (
    <div
      className={cn(
        'transition-all',
        duration,
        show ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        className
      )}
    >
      {children}
    </div>
  )
}

// Stagger children animation wrapper
export function StaggerTransition({
  children,
  className,
  staggerDelay = 100
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <div className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className="animate-slide-up opacity-0"
            style={{
              animationDelay: `${index * staggerDelay}ms`,
              animationFillMode: 'forwards'
            }}
          >
            {child}
          </div>
        ))
      ) : (
        children
      )}
    </div>
  )
}