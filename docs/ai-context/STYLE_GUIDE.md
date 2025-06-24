# Style Guide

## Overview
This style guide defines the visual design system, CSS conventions, and styling patterns used throughout the WEBTEMPLATE project. All styling should follow these guidelines to maintain visual consistency and code quality.

## Design System

### Color Palette

#### Core Colors
```css
/* CSS Variables defined in globals.css */
:root {
  /* Primary - Professional Blue */
  --primary: 217 91% 60%;         /* hsl(217, 91%, 60%) */
  --primary-foreground: 0 0% 100%; /* White text on primary */
  
  /* Background Colors */
  --background: 0 0% 100%;         /* White */
  --foreground: 222 84% 5%;        /* Near black */
  
  /* Muted Colors */
  --muted: 210 40% 96%;            /* Light gray */
  --muted-foreground: 215 16% 47%; /* Medium gray */
  
  /* Accent Colors */
  --accent: 210 40% 96%;           /* Light accent */
  --accent-foreground: 222 47% 11%; /* Dark text on accent */
  
  /* UI Colors */
  --card: 0 0% 100%;               /* Card background */
  --card-foreground: 222 84% 5%;   /* Card text */
  
  /* Borders */
  --border: 214 32% 91%;           /* Light border */
  --input: 214 32% 91%;            /* Input border */
  --ring: 217 91% 60%;             /* Focus ring */
  
  /* Status Colors */
  --destructive: 0 84% 60%;        /* Error red */
  --destructive-foreground: 0 0% 98%; /* White on red */
}

/* Dark Mode */
.dark {
  --primary: 217 91% 60%;
  --primary-foreground: 222 47% 11%;
  
  --background: 222 84% 5%;
  --foreground: 0 0% 95%;
  
  /* ... other dark mode colors */
}
```

#### Semantic Colors
```typescript
// Usage in components
const semanticColors = {
  success: 'text-green-600 bg-green-50 border-green-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
}
```

### Typography

#### Font Stack
```css
/* System font stack for performance */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, 
             "Liberation Mono", Menlo, monospace;
```

#### Type Scale
```scss
/* Fluid typography with clamp() */
.text-xs    { font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); }
.text-sm    { font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem); }
.text-base  { font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem); }
.text-lg    { font-size: clamp(1.125rem, 1rem + 0.625vw, 1.25rem); }
.text-xl    { font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem); }
.text-2xl   { font-size: clamp(1.5rem, 1.3rem + 1vw, 1.875rem); }
.text-3xl   { font-size: clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem); }
.text-4xl   { font-size: clamp(2.25rem, 1.75rem + 2.5vw, 3rem); }
.text-5xl   { font-size: clamp(3rem, 2rem + 5vw, 3.75rem); }
```

#### Font Weights
```css
.font-normal  { font-weight: 400; }
.font-medium  { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold    { font-weight: 700; }
```

#### Line Heights
```css
.leading-none    { line-height: 1; }
.leading-tight   { line-height: 1.25; }
.leading-snug    { line-height: 1.375; }
.leading-normal  { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose   { line-height: 2; }
```

### Spacing System

#### Base Unit
```scss
/* 4px base unit for consistency */
$spacing-unit: 0.25rem; // 4px

/* Spacing scale */
.space-0  { margin: 0; }
.space-1  { margin: 0.25rem; }  // 4px
.space-2  { margin: 0.5rem; }   // 8px
.space-3  { margin: 0.75rem; }  // 12px
.space-4  { margin: 1rem; }     // 16px
.space-6  { margin: 1.5rem; }   // 24px
.space-8  { margin: 2rem; }     // 32px
.space-12 { margin: 3rem; }     // 48px
.space-16 { margin: 4rem; }     // 64px
.space-24 { margin: 6rem; }     // 96px
```

#### Section Spacing
```typescript
// Consistent vertical rhythm
const sectionSpacing = {
  mobile: 'py-12',    // 48px
  tablet: 'md:py-16', // 64px
  desktop: 'lg:py-24' // 96px
}

// Usage
<section className={`${sectionSpacing.mobile} ${sectionSpacing.tablet} ${sectionSpacing.desktop}`}>
```

### Breakpoints

```scss
/* Mobile-first breakpoints */
$breakpoints: (
  'sm': 640px,   // Small devices
  'md': 768px,   // Tablets
  'lg': 1024px,  // Desktops
  'xl': 1280px,  // Large desktops
  '2xl': 1536px  // Extra large screens
);

/* Container max-widths */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    max-width: 640px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
}
```

## Component Styling

### Base Component Styles

#### Buttons
```typescript
// Primary button
const primaryButton = cn(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  "transition-colors focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:pointer-events-none",
  // Primary variant
  "bg-primary text-primary-foreground hover:bg-primary/90",
  // Sizing
  "h-10 px-4 py-2"
)

// Outline button
const outlineButton = cn(
  // Base styles (same as above)
  "...",
  // Outline variant
  "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
)
```

#### Cards
```typescript
const cardStyles = cn(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  "transition-shadow hover:shadow-md"
)
```

#### Forms
```typescript
// Input styles
const inputStyles = cn(
  "flex h-10 w-full rounded-md border border-input bg-background",
  "px-3 py-2 text-sm ring-offset-background",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50"
)

// Label styles
const labelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
```

### Animation & Transitions

#### Transition Utilities
```css
/* Smooth transitions for interactive elements */
.transition-base {
  transition-property: color, background-color, border-color, 
                      text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
```

#### Animation Classes
```css
/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

/* Slide up animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

/* Pulse animation for loading states */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Layout Patterns

#### Grid Systems
```typescript
// Responsive grid with auto-fit
const autoGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Fixed columns
const fixedGrid = "grid grid-cols-12 gap-4"

// Card grid
const cardGrid = cn(
  "grid gap-6",
  "grid-cols-1",
  "sm:grid-cols-2",
  "lg:grid-cols-3",
  "xl:grid-cols-4"
)
```

#### Flexbox Patterns
```typescript
// Center content
const centerFlex = "flex items-center justify-center"

// Space between
const spaceBetween = "flex items-center justify-between"

// Responsive flex
const responsiveFlex = "flex flex-col md:flex-row gap-4"
```

#### Container Patterns
```typescript
// Standard container
const container = "container mx-auto px-4 md:px-6"

// Narrow container for content
const contentContainer = "max-w-3xl mx-auto px-4"

// Wide container
const wideContainer = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

## Tailwind Configuration

### Custom Utilities
```javascript
// tailwind.config.js extensions
module.exports = {
  theme: {
    extend: {
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Custom shadows
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'hard': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
}
```

### Utility Classes

#### Text Utilities
```css
/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Truncate with ellipsis */
.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### Background Utilities
```css
/* Subtle gradients */
.bg-gradient-subtle {
  background: linear-gradient(180deg, 
    var(--background) 0%, 
    var(--muted) 100%
  );
}

/* Radial gradient */
.bg-radial {
  background: radial-gradient(
    circle at center,
    var(--primary) 0%,
    transparent 70%
  );
}
```

## CSS Best Practices

### Do's
-  Use Tailwind utilities first
-  Use CSS variables for theming
-  Follow mobile-first approach
-  Use semantic class names for components
-  Leverage CSS Grid and Flexbox
-  Use clamp() for fluid typography
-  Maintain consistent spacing
-  Use transition utilities for smooth interactions

### Don'ts
- L Use inline styles except for dynamic values
- L Create deeply nested selectors
- L Use !important unless absolutely necessary
- L Mix spacing units (stick to rem/px)
- L Hardcode colors (use CSS variables)
- L Create one-off utility classes
- L Use arbitrary values excessively
- L Forget responsive considerations

## Accessibility Styling

### Focus States
```css
/* Visible focus indicator */
.focus-visible:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
}
```

### Color Contrast
```scss
/* Ensure WCAG AA compliance */
// Minimum contrast ratios:
// Normal text: 4.5:1
// Large text: 3:1
// UI components: 3:1

// Good contrast examples
.high-contrast {
  color: var(--foreground);      // Dark on light
  background: var(--background);  // Light background
}

.inverse-contrast {
  color: var(--primary-foreground); // Light on dark
  background: var(--primary);       // Dark background
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Performance Considerations

### Critical CSS
```css
/* Above-the-fold styles */
.hero {
  /* Inline critical styles */
  min-height: 100vh;
  display: flex;
  align-items: center;
}
```

### Optimization Tips
1. Use Tailwind's JIT mode for smaller CSS bundles
2. Purge unused CSS in production
3. Avoid complex selectors
4. Use CSS containment for layout stability
5. Leverage CSS Grid for complex layouts
6. Minimize use of calc() in critical paths
7. Use transform for animations instead of position
8. Implement lazy loading for below-fold content

## Dark Mode Implementation

### Color Scheme Toggle
```typescript
// CSS variables automatically switch
<html className={isDark ? 'dark' : ''}>

// Component implementation
const ThemeToggle = () => {
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-md p-2",
        "bg-background hover:bg-muted",
        "text-foreground",
        "transition-colors"
      )}
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  )
}
```

### Dark Mode Patterns
```css
/* Automatic dark mode adaptation */
.adaptive-border {
  border-color: var(--border);
}

.adaptive-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark .adaptive-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
```

This style guide should be treated as a living document and updated as the design system evolves.