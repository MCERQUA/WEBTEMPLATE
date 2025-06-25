'use client'

import React from 'react'
import { 
  ComponentWrapper, 
  withExternalComponent, 
  mapExternalProps,
  createStyledComponent 
} from '../adapters/ComponentWrapper'
import { mapExternalStyles, normalizeProps } from '@/lib/theme/external-components'
import { cn } from '@/lib/utils'

/**
 * Example: Wrapping a hypothetical external button component
 * This demonstrates various integration patterns
 */

// Simulated external button component (imagine this comes from npm)
interface ExternalButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

// Simulated external component
const ExternalButton: React.FC<ExternalButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className
}) => {
  // This simulates how an external library might structure classes
  const externalClasses = [
    'external-btn',
    `external-btn-${variant}`,
    `external-btn-${size}`,
    isLoading && 'external-btn-loading',
    isDisabled && 'external-btn-disabled',
    className
  ].filter(Boolean).join(' ')
  
  return (
    <button
      className={externalClasses}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {leftIcon && <span className="external-btn-icon-left">{leftIcon}</span>}
      {isLoading ? <span className="external-btn-spinner">Loading...</span> : children}
      {rightIcon && <span className="external-btn-icon-right">{rightIcon}</span>}
    </button>
  )
}

/**
 * Method 1: Simple wrapper with class mapping
 */
export function MappedExternalButton(props: ExternalButtonProps) {
  const mappedClassName = mapExternalStyles(props.className, {
    prefix: 'external',
    override: false
  })
  
  return (
    <ComponentWrapper>
      <ExternalButton
        {...props}
        className={cn(
          // Base button styles
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Variant styles
          props.variant === 'primary' && "bg-primary text-primary-foreground hover:bg-primary/90",
          props.variant === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          props.variant === 'danger' && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          // Size styles
          props.size === 'small' && "h-8 px-3 text-xs",
          props.size === 'medium' && "h-10 px-4",
          props.size === 'large' && "h-12 px-6 text-base",
          // Loading state
          props.isLoading && "cursor-wait",
          // Custom classes
          mappedClassName
        )}
      />
    </ComponentWrapper>
  )
}

/**
 * Method 2: Using HOC wrapper
 */
export const WrappedExternalButton = withExternalComponent(
  ExternalButton,
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors"
)

/**
 * Method 3: Props normalization
 */
export function NormalizedExternalButton(props: ExternalButtonProps) {
  // Normalize external props to our conventions
  const normalizedProps = normalizeProps(props, {
    'isLoading': 'loading',
    'isDisabled': 'disabled',
  })
  
  // Map external prop values to our values
  const variantMap: Record<string, string> = {
    'primary': 'default',
    'secondary': 'secondary',
    'danger': 'destructive'
  }
  
  const sizeMap: Record<string, string> = {
    'small': 'sm',
    'medium': 'default',
    'large': 'lg'
  }
  
  return (
    <ComponentWrapper>
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Use our variant styles
          variantMap[props.variant || 'primary'] === 'default' && "bg-primary text-primary-foreground hover:bg-primary/90",
          variantMap[props.variant || 'primary'] === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variantMap[props.variant || 'primary'] === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          // Use our size styles
          sizeMap[props.size || 'medium'] === 'sm' && "h-8 px-3 text-xs",
          sizeMap[props.size || 'medium'] === 'default' && "h-10 px-4",
          sizeMap[props.size || 'medium'] === 'lg' && "h-12 px-6 text-base",
          props.className
        )}
        disabled={normalizedProps.disabled || normalizedProps.loading}
        onClick={props.onClick}
      >
        {props.leftIcon && <span className="mr-2">{props.leftIcon}</span>}
        {normalizedProps.loading ? (
          <span className="inline-block animate-spin">⟳</span>
        ) : (
          props.children
        )}
        {props.rightIcon && <span className="ml-2">{props.rightIcon}</span>}
      </button>
    </ComponentWrapper>
  )
}

/**
 * Method 4: Create styled version
 */
export const StyledExternalButton = createStyledComponent(ExternalButton, {
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    primary: {
      base: "bg-primary text-primary-foreground hover:bg-primary/90"
    },
    secondary: {
      base: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    },
    danger: {
      base: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    }
  },
  defaultVariant: 'primary'
})

/**
 * Example usage page
 */
export function ExternalButtonExamples() {
  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">External Button Integration Examples</h2>
        <p className="mb-6 text-muted-foreground">
          Different methods to integrate external button components with our design system.
        </p>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Method 1: Class Mapping</h3>
        <div className="flex flex-wrap gap-2">
          <MappedExternalButton variant="primary">Primary</MappedExternalButton>
          <MappedExternalButton variant="secondary">Secondary</MappedExternalButton>
          <MappedExternalButton variant="danger">Danger</MappedExternalButton>
          <MappedExternalButton variant="primary" size="small">Small</MappedExternalButton>
          <MappedExternalButton variant="primary" size="large">Large</MappedExternalButton>
          <MappedExternalButton variant="primary" isLoading>Loading</MappedExternalButton>
          <MappedExternalButton variant="primary" isDisabled>Disabled</MappedExternalButton>
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Method 2: HOC Wrapper</h3>
        <div className="flex flex-wrap gap-2">
          <WrappedExternalButton variant="primary">Wrapped Primary</WrappedExternalButton>
          <WrappedExternalButton variant="secondary">Wrapped Secondary</WrappedExternalButton>
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Method 3: Props Normalization</h3>
        <div className="flex flex-wrap gap-2">
          <NormalizedExternalButton variant="primary">Normalized Primary</NormalizedExternalButton>
          <NormalizedExternalButton variant="secondary">Normalized Secondary</NormalizedExternalButton>
          <NormalizedExternalButton variant="danger">Normalized Danger</NormalizedExternalButton>
          <NormalizedExternalButton 
            variant="primary" 
            leftIcon={<span>←</span>}
            rightIcon={<span>→</span>}
          >
            With Icons
          </NormalizedExternalButton>
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Method 4: Styled Component</h3>
        <div className="flex flex-wrap gap-2">
          <StyledExternalButton variant="primary">Styled Primary</StyledExternalButton>
          <StyledExternalButton variant="secondary">Styled Secondary</StyledExternalButton>
          <StyledExternalButton variant="danger">Styled Danger</StyledExternalButton>
        </div>
      </section>
      
      <section className="mt-8 rounded-lg border bg-muted/50 p-4">
        <h3 className="mb-2 font-semibold">Integration Tips</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Choose the method that best fits your external library&apos;s API</li>
          <li>Consider creating a dedicated adapter file for each external library</li>
          <li>Always test accessibility features after integration</li>
          <li>Document any prop mappings for team members</li>
          <li>Use TypeScript to ensure type safety across integrations</li>
        </ul>
      </section>
    </div>
  )
}
