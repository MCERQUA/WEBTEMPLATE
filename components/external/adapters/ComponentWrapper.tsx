import React from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Base wrapper component for external components
 * Provides consistent context and styling integration
 */
export interface ComponentWrapperProps {
  children: React.ReactNode
  className?: string
  'data-external'?: boolean
}

export function ComponentWrapper({ 
  children, 
  className,
  'data-external': dataExternal = true,
  ...props 
}: ComponentWrapperProps) {
  return (
    <div 
      className={cn('external-component-wrapper', className)}
      data-external={dataExternal}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Higher-order component for wrapping external components
 */
export function withExternalComponent<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  baseStyles?: string
) {
  return function WrappedComponent(props: T) {
    return (
      <ComponentWrapper>
        <Component 
          {...props} 
          className={cn(baseStyles, props.className)}
        />
      </ComponentWrapper>
    )
  }
}

/**
 * Maps external component props to internal conventions
 */
export function mapExternalProps<T extends Record<string, any>>(
  props: T,
  mappings: Record<string, string>
): T {
  const mapped = { ...props }
  
  Object.entries(mappings).forEach(([externalKey, internalKey]) => {
    if (externalKey in mapped) {
      // @ts-ignore - dynamic property mapping
      mapped[internalKey] = mapped[externalKey]
      delete mapped[externalKey]
    }
  })
  
  return mapped
}

/**
 * Creates a styled version of an external component
 */
export interface StyledComponentConfig {
  base: string
  variants?: Record<string, {
    base: string
    [key: string]: string
  }>
  defaultVariant?: string
}

export function createStyledComponent<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  config: StyledComponentConfig
) {
  return function StyledComponent(props: T & { variant?: string }) {
    const { variant = config.defaultVariant, className, ...restProps } = props
    
    const variantStyles = variant && config.variants?.[variant]
      ? config.variants[variant].base
      : ''
    
    const combinedClassName = cn(
      config.base,
      variantStyles,
      className
    )
    
    return (
      <ComponentWrapper>
        <Component 
          {...restProps as T}
          className={combinedClassName}
        />
      </ComponentWrapper>
    )
  }
}