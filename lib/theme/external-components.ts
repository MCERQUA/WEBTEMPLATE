/**
 * Utilities for integrating external components with our design system
 */

/**
 * Configuration for mapping external styles
 */
export interface ExternalStyleConfig {
  prefix?: string
  override?: boolean
  mappings?: Record<string, string>
}

/**
 * Maps external component styles to our design system classes
 */
export function mapExternalStyles(
  externalClassName?: string, 
  config: ExternalStyleConfig = {}
): string {
  if (!externalClassName) return ''
  
  const { prefix = '', override = false, mappings = {} } = config
  
  // Split external classes
  const externalClasses = externalClassName.split(' ').filter(Boolean)
  
  // Map classes based on configuration
  const mappedClasses = externalClasses.map(cls => {
    // Remove prefix if specified
    const cleanClass = prefix && cls.startsWith(`${prefix}-`) 
      ? cls.replace(`${prefix}-`, '') 
      : cls
    
    // Apply custom mappings
    if (mappings[cleanClass]) {
      return mappings[cleanClass]
    }
    
    // Default mapping patterns for common external library conventions
    const defaultMappings: Record<string, string> = {
      // Size mappings
      'btn-sm': 'h-8 px-3 text-xs',
      'btn-md': 'h-10 px-4',
      'btn-lg': 'h-12 px-6 text-base',
      'small': 'h-8 px-3 text-xs',
      'medium': 'h-10 px-4',
      'large': 'h-12 px-6 text-base',
      
      // Variant mappings
      'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
      'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      'danger': 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      'success': 'bg-green-600 text-white hover:bg-green-700',
      'warning': 'bg-yellow-600 text-white hover:bg-yellow-700',
      
      // State mappings
      'disabled': 'opacity-50 pointer-events-none',
      'loading': 'cursor-wait',
      'active': 'bg-accent text-accent-foreground',
      
      // Common component patterns
      'rounded': 'rounded-md',
      'shadow': 'shadow-sm',
      'border': 'border',
      'outline': 'border-2 border-transparent focus:border-primary',
    }
    
    if (defaultMappings[cleanClass]) {
      return defaultMappings[cleanClass]
    }
    
    // If override is false, return original class
    return override ? '' : cls
  }).filter(Boolean)
  
  return mappedClasses.join(' ')
}

/**
 * Normalizes external component props to our internal conventions
 */
export function normalizeProps<T extends Record<string, any>>(
  props: T,
  mappings: Record<string, string> = {}
): T {
  const normalized = { ...props }
  
  // Apply custom mappings
  Object.entries(mappings).forEach(([externalKey, internalKey]) => {
    if (externalKey in normalized) {
      // @ts-ignore - dynamic property mapping
      normalized[internalKey] = normalized[externalKey]
      delete normalized[externalKey]
    }
  })
  
  // Common prop normalizations
  const commonMappings: Record<string, string> = {
    'isDisabled': 'disabled',
    'isLoading': 'loading',
    'isActive': 'active',
    'isSelected': 'selected',
    'isOpen': 'open',
    'isVisible': 'visible',
    'isRequired': 'required',
    'isReadOnly': 'readOnly',
    'className': 'className', // pass through
    'style': 'style', // pass through
  }
  
  Object.entries(commonMappings).forEach(([externalKey, internalKey]) => {
    if (externalKey in normalized && externalKey !== internalKey) {
      // @ts-ignore - dynamic property mapping
      normalized[internalKey] = normalized[externalKey]
      delete normalized[externalKey]
    }
  })
  
  return normalized
}

/**
 * Creates a theme-aware class string for external components
 */
export function createExternalComponentClass(
  baseClasses: string,
  variantClasses?: string,
  stateClasses?: string,
  customClasses?: string
): string {
  return [
    baseClasses,
    variantClasses,
    stateClasses,
    customClasses
  ].filter(Boolean).join(' ')
}

/**
 * Validates that external component props match expected patterns
 */
export function validateExternalProps<T extends Record<string, any>>(
  props: T,
  schema: Record<string, {
    type: 'string' | 'number' | 'boolean' | 'function' | 'object'
    required?: boolean
    options?: any[]
  }>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  Object.entries(schema).forEach(([key, config]) => {
    const value = props[key]
    
    // Check required props
    if (config.required && (value === undefined || value === null)) {
      errors.push(`Missing required prop: ${key}`)
      return
    }
    
    // Skip validation if prop is not provided and not required
    if (value === undefined || value === null) return
    
    // Check type
    const actualType = typeof value
    if (actualType !== config.type) {
      errors.push(`Prop ${key} expected ${config.type}, got ${actualType}`)
    }
    
    // Check options
    if (config.options && !config.options.includes(value)) {
      errors.push(`Prop ${key} must be one of: ${config.options.join(', ')}`)
    }
  })
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Generates accessible props for external components
 */
export function generateAccessibilityProps(
  role?: string,
  label?: string,
  describedBy?: string
): Record<string, any> {
  const props: Record<string, any> = {}
  
  if (role) props.role = role
  if (label) props['aria-label'] = label
  if (describedBy) props['aria-describedby'] = describedBy
  
  return props
}