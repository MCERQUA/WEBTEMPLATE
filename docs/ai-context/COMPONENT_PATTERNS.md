# Component Patterns Guide

## Overview
This guide documents the component patterns, conventions, and best practices used throughout the WEBTEMPLATE project. All components should follow these patterns to maintain consistency and quality.

## Component Structure

### File Organization
```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

// Type definitions
export interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

// Variant definitions
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'variant-classes',
        outline: 'variant-classes',
      },
      size: {
        default: 'size-classes',
        sm: 'size-classes',
        lg: 'size-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Component implementation
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

## Naming Conventions

### Components
- Use PascalCase for component names: `ServiceCard`, `ContactForm`
- Use descriptive names that indicate purpose: `TestimonialCarousel` not `Carousel`
- Prefix with category for organization: `FormField`, `SeoMetaTags`

### Props
- Use clear, descriptive prop names
- Boolean props should be prefixed with `is`, `has`, `should`: `isLoading`, `hasError`
- Event handlers should be prefixed with `on`: `onClick`, `onSubmit`
- Use `className` not `class` for custom styling

### Files
- Component files: `ComponentName.tsx`
- Test files: `ComponentName.test.tsx`
- Story files: `ComponentName.stories.tsx`
- Style files (if needed): `ComponentName.module.css`

## TypeScript Patterns

### Interface Definition
```typescript
// Always export interfaces for reusability
export interface ComponentProps {
  // Required props first
  title: string
  content: string
  
  // Optional props with ? operator
  subtitle?: string
  
  // Props with default values
  variant?: 'primary' | 'secondary'
  
  // Complex types
  items?: Array<{
    id: string
    label: string
    value: number
  }>
  
  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  
  // Children
  children?: React.ReactNode
  
  // Style overrides
  className?: string
  style?: React.CSSProperties
}
```

### Generic Components
```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
```

## Styling Patterns

### Tailwind CSS Usage
```typescript
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

// Good - using cn() for merging
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)} />

// Bad - string concatenation
<div className={`base-classes ${isActive ? 'active-classes' : ''}`} />
```

### Class Variance Authority (CVA)
```typescript
// Define variants for complex components
const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive',
        success: 'border-green-500/50 text-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// Consistent breakpoint usage
// sm: 640px
// md: 768px  
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

## Component Patterns

### Container Components
```typescript
export function Section({ 
  children, 
  className,
  containerClassName,
  ...props 
}: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)} {...props}>
      <div className={cn(
        'container mx-auto px-4 md:px-6',
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
```

### Form Components
```typescript
export function FormField({
  label,
  error,
  required,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
```

### Loading States
```typescript
export function ComponentWithLoading({ isLoading, ...props }: Props) {
  if (isLoading) {
    return <Skeleton className="h-32 w-full" />
  }
  
  return <ActualComponent {...props} />
}
```

### Error Boundaries
```typescript
export function SafeComponent({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        console.error('Component error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

## Accessibility Patterns

### ARIA Labels
```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
  aria-controls="dialog-content"
>
  <X className="h-4 w-4" />
</button>
```

### Keyboard Navigation
```typescript
export function NavigableList({ items }: Props) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => prev > 0 ? prev - 1 : prev)
        break
    }
  }
  
  return (
    <ul role="listbox" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          key={item.id}
          role="option"
          tabIndex={focusedIndex === index ? 0 : -1}
          aria-selected={focusedIndex === index}
        >
          {item.label}
        </li>
      ))}
    </ul>
  )
}
```

### Focus Management
```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogClose ref={closeButtonRef} />
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

## Performance Patterns

### Memoization
```typescript
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(props.data)
}, [props.data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// Memoize components
export const ExpensiveComponent = memo(({ data }: Props) => {
  return <div>{/* Expensive render */}</div>
})
```

### Lazy Loading
```typescript
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Image Optimization
```typescript
import Image from 'next/image'

export function OptimizedImage({ src, alt, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      blurDataURL={generateBlurDataURL(src)}
      {...props}
    />
  )
}
```

## Testing Patterns

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Common Patterns

### Compound Components
```typescript
const Card = ({ children, className }: CardProps) => {
  return <div className={cn('rounded-lg border', className)}>{children}</div>
}

Card.Header = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6 pb-4">{children}</div>
}

Card.Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6 pt-0">{children}</div>
}

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Render Props
```typescript
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const { data, loading, error } = useFetch<T>(url)
  return <>{children(data, loading, error)}</>
}
```

### Provider Pattern
```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## Best Practices

### Do's
-  Use semantic HTML elements
-  Implement proper error handling
-  Add loading states for async operations
-  Include accessibility attributes
-  Write self-documenting code
-  Use TypeScript for type safety
-  Follow mobile-first responsive design
-  Optimize for performance

### Don'ts
- L Use inline styles unless necessary
- L Manipulate DOM directly
- L Use any type unless absolutely necessary
- L Create overly complex components
- L Ignore accessibility
- L Skip error boundaries for risky operations
- L Use index as key in dynamic lists
- L Forget to memoize expensive operations

## Component Checklist

Before considering a component complete:
- [ ] TypeScript interfaces defined and exported
- [ ] Props documented with JSDoc comments
- [ ] Accessibility attributes implemented
- [ ] Loading and error states handled
- [ ] Responsive design implemented
- [ ] Component is memoized if needed
- [ ] Unit tests written
- [ ] Storybook story created (if applicable)
- [ ] Performance optimized
- [ ] Follows all naming conventions
- [ ] Uses proper Tailwind classes with cn()
- [ ] Keyboard navigation supported (if interactive)