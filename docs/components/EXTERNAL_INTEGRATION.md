# External Component Integration Guide

This guide explains how to integrate external React component libraries into the WEBTEMPLATE project while maintaining visual consistency and design system compliance.

## Overview

The external component integration system provides:
- <¨ **Theme Bridging** - Map external component themes to our CSS variables
- =' **Style Mapping** - Convert external CSS classes to Tailwind utilities
- =æ **Wrapper Components** - Ensure consistent behavior across libraries
-  **Accessibility Preservation** - Maintain ARIA attributes and keyboard navigation
- =€ **Performance Optimization** - Lazy loading and tree shaking support

## Quick Start

### 1. Install External Library

```bash
npm install @radix-ui/react-dialog
# or
npm install @headlessui/react
# or
npm install antd
```

### 2. Create Wrapper Component

```tsx
// components/ui/modal.tsx
import * as Dialog from '@radix-ui/react-dialog'
import { ComponentWrapper } from '@/components/external/adapters/ComponentWrapper'
import { cn } from '@/lib/utils'

export function Modal({ children, ...props }) {
  return (
    <ComponentWrapper>
      <Dialog.Root {...props}>
        <Dialog.Portal>
          <Dialog.Overlay className={cn(
            "fixed inset-0 bg-black/50",
            "data-[state=open]:animate-fadeIn"
          )} />
          <Dialog.Content className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-background rounded-lg shadow-lg p-6",
            "w-full max-w-md"
          )}>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ComponentWrapper>
  )
}
```

### 3. Use in Your App

```tsx
import { Modal } from '@/components/ui/modal'

export function MyComponent() {
  return (
    <Modal>
      <h2 className="text-lg font-semibold">Welcome</h2>
      <p className="text-muted-foreground">This modal uses our design system!</p>
    </Modal>
  )
}
```

## Integration Methods

### Method 1: Direct Style Override

Best for: Simple components with minimal styling needs

```tsx
import { ExternalButton } from 'external-library'
import { cn } from '@/lib/utils'

export function Button({ className, ...props }) {
  return (
    <ExternalButton
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "h-10 px-4 text-sm font-medium",
        className
      )}
    />
  )
}
```

### Method 2: Component Wrapper

Best for: Components that need theme context or style resets

```tsx
import { ComponentWrapper } from '@/components/external/adapters/ComponentWrapper'
import { ExternalComponent } from 'external-library'

export function WrappedComponent(props) {
  return (
    <ComponentWrapper resetStyles isolated>
      <ExternalComponent {...props} />
    </ComponentWrapper>
  )
}
```

### Method 3: Theme Provider Bridge

Best for: Libraries with their own theming systems

```tsx
import { ThemeProvider, useExternalTheme } from '@/components/external/adapters/ThemeProvider'
import { ConfigProvider } from 'antd'

export function AntdProvider({ children }) {
  const antdTheme = useExternalTheme('antd')
  
  return (
    <ThemeProvider>
      <ConfigProvider theme={antdTheme}>
        {children}
      </ConfigProvider>
    </ThemeProvider>
  )
}
```

### Method 4: Style Mapping

Best for: Libraries with predictable class naming

```tsx
import { mapExternalStyles } from '@/lib/theme/external-components'
import { ExternalComponent } from 'external-library'

export function MappedComponent({ className, ...props }) {
  const mappedClasses = mapExternalStyles(className, {
    prefix: 'external',
    override: false
  })
  
  return <ExternalComponent {...props} className={mappedClasses} />
}
```

## Popular Library Examples

### Radix UI

```tsx
// Radix components are unstyled, making them perfect for our system
import * as Switch from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export function Toggle({ className, ...props }) {
  return (
    <Switch.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
        "border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <Switch.Thumb className={cn(
        "pointer-events-none block h-5 w-5 rounded-full",
        "bg-background shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )} />
    </Switch.Root>
  )
}
```

### Headless UI

```tsx
// Headless UI by Tailwind team, works great with Tailwind classes
import { Listbox } from '@headlessui/react'
import { cn } from '@/lib/utils'

export function Select({ value, onChange, children }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className={cn(
          "relative w-full cursor-pointer rounded-md",
          "bg-background border border-input",
          "py-2 pl-3 pr-10 text-left",
          "focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2"
        )}>
          {value}
        </Listbox.Button>
        <Listbox.Options className={cn(
          "absolute mt-1 max-h-60 w-full overflow-auto rounded-md",
          "bg-background py-1 text-base shadow-lg",
          "ring-1 ring-black ring-opacity-5 focus:outline-none"
        )}>
          {children}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
```

### Ant Design

```tsx
// Ant Design requires theme mapping
import { Button } from 'antd'
import { ThemeProvider } from '@/components/external/adapters/ThemeProvider'
import { ConfigProvider } from 'antd'

export function AntdButton(props) {
  return (
    <ThemeProvider>
      {({ externalTheme }) => (
        <ConfigProvider theme={externalTheme.antd}>
          <ComponentWrapper>
            <Button {...props} />
          </ComponentWrapper>
        </ConfigProvider>
      )}
    </ThemeProvider>
  )
}
```

### Material UI

```tsx
// Material UI with theme bridging
import { Button } from '@mui/material'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { useTheme } from '@/components/external/adapters/ThemeProvider'

export function MuiButton(props) {
  const { externalTheme } = useTheme()
  const muiTheme = createTheme(externalTheme.mui)
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Button {...props} />
    </MuiThemeProvider>
  )
}
```

## Style Mapping Reference

The system includes pre-configured mappings for common libraries:

```typescript
// Ant Design ’ Tailwind
'ant-btn' ’ 'inline-flex items-center justify-center rounded-md...'
'ant-btn-primary' ’ 'bg-primary text-primary-foreground...'
'ant-input' ’ 'flex h-10 w-full rounded-md border...'

// Material UI ’ Tailwind
'MuiButton-root' ’ 'inline-flex items-center justify-center...'
'MuiPaper-root' ’ 'rounded-lg bg-card text-card-foreground...'

// Bootstrap ’ Tailwind
'btn' ’ 'inline-flex items-center justify-center...'
'btn-primary' ’ 'bg-primary text-primary-foreground...'
'alert' ’ 'relative w-full rounded-lg border p-4'
```

## Best Practices

### 1. Maintain Type Safety

```tsx
// Create proper type definitions
import type { ComponentProps } from 'react'
import { ExternalComponent } from 'external-library'

interface MyComponentProps extends ComponentProps<typeof ExternalComponent> {
  variant?: 'default' | 'destructive'
}

export function MyComponent({ variant = 'default', ...props }: MyComponentProps) {
  // Implementation
}
```

### 2. Preserve Accessibility

```tsx
// Always forward refs and ARIA attributes
import { forwardRef } from 'react'

export const AccessibleComponent = forwardRef<
  HTMLButtonElement,
  ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn('...styles', className)}
      {...props} // Preserves all ARIA attributes
    />
  )
})
```

### 3. Handle Dark Mode

```tsx
// Use CSS variables that adapt to dark mode
export function ThemedComponent() {
  return (
    <div className="bg-background text-foreground">
      {/* These colors automatically adapt to dark mode */}
    </div>
  )
}
```

### 4. Optimize Bundle Size

```tsx
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyExternalComponent = dynamic(
  () => import('heavy-library').then(mod => mod.Component),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
)
```

## Troubleshooting

### Style Conflicts

Problem: External styles override our styles

```tsx
// Solution 1: Increase specificity
<div className="[&>.external-class]:bg-primary">

// Solution 2: Use important modifier
<div className="!bg-primary">

// Solution 3: Use CSS modules
import styles from './override.module.css'
```

### Theme Mismatch

Problem: External component colors don't match

```tsx
// Solution: Map theme tokens
const themeMap = {
  primaryColor: getCSSVariableValue('--primary'),
  textColor: getCSSVariableValue('--foreground'),
  // ... more mappings
}
```

### TypeScript Errors

Problem: Type conflicts between libraries

```tsx
// Solution: Create adapter types
type AdaptedProps = Omit<ExternalProps, 'color'> & {
  color?: 'primary' | 'secondary'
}
```

## Performance Tips

1. **Lazy Load External Components**
   ```tsx
   const ExternalChart = lazy(() => import('./ExternalChart'))
   ```

2. **Tree Shake Unused Components**
   ```tsx
   // Import only what you need
   import { Button } from 'antd'
   // Not: import * as antd from 'antd'
   ```

3. **Memoize Heavy Components**
   ```tsx
   export const MemoizedExternal = memo(ExternalComponent)
   ```

4. **Use CSS-in-JS Sparingly**
   - Prefer Tailwind utilities over runtime styles
   - Use CSS variables for dynamic values

## Creating Your Own Adapters

Template for creating adapters for new libraries:

```tsx
// components/external/adapters/[library-name].tsx
import { ComponentWrapper } from './ComponentWrapper'
import { mapExternalStyles } from '@/lib/theme/external-components'
import { cn } from '@/lib/utils'

// 1. Define prop mappings
const propMap = {
  'theirProp': 'ourProp',
  'isActive': 'active',
}

// 2. Define style mappings
const styleMap = {
  'their-class': 'our-tailwind-classes',
}

// 3. Create adapter component
export function AdaptedComponent({ className, ...props }) {
  // Map props
  const mappedProps = mapProps(props, propMap)
  
  // Map styles
  const mappedStyles = mapExternalStyles(className, { 
    customMap: styleMap 
  })
  
  return (
    <ComponentWrapper>
      <TheirComponent
        {...mappedProps}
        className={cn(mappedStyles)}
      />
    </ComponentWrapper>
  )
}

// 4. Export themed version if needed
export function ThemedComponent(props) {
  const theme = useTheme()
  return (
    <TheirProvider theme={mapTheme(theme)}>
      <AdaptedComponent {...props} />
    </TheirProvider>
  )
}
```

## Resources

- [Example Implementations](../../components/external/examples/)
- [Component Wrapper Source](../../components/external/adapters/ComponentWrapper.tsx)
- [Theme Provider Source](../../components/external/adapters/ThemeProvider.tsx)
- [Style Mapping Utilities](../../lib/theme/external-components.ts)