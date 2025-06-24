# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modular Next.js 15 website template designed for local service companies. It uses TypeScript, Tailwind CSS v3, and follows a component-based architecture with all files intentionally kept under 150 lines for easy AI manipulation.

## Development Commands

```bash
# Development
npm run dev              # Start development server on http://localhost:3000

# Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run Next.js linter
```

## Architecture & Key Design Decisions

### Tailwind CSS Configuration
- **Important**: This project uses Tailwind CSS v3 (not v4)
- Color classes use numbered variants (e.g., `text-primary-500`, not `text-primary`)
- Custom colors defined: primary (blue) and secondary (orange) with full color scales

### Content Management
- Static content files in `/content/services/` and `/content/blog/` use MDX format
- Content is read using the `gray-matter` library in `lib/utils/mdx.ts`
- Dynamic routes use Next.js 15's new async params pattern: `params: Promise<{ slug: string }>`

### Component Structure
- **Layout Components** (`/components/layout/`): Header and Footer used in root layout
- **Section Components** (`/components/sections/`): Hero, ServiceGrid, CTASection - reusable page sections
- **UI Components** (`/components/ui/`): Button, Card - atomic design components
- **Business Components** (`/components/business/`): ContactForm, BusinessHours, TestimonialCard, etc.
- All components use `"use client"` directive when they need client-side features (useState, onClick, etc.)

### Configuration
- Site-wide settings in `/config/site.config.ts` (company info, hours, contact)
- Navigation structure in `/config/navigation.config.ts`
- These configs centralize all customizable business information

### Styling Approach
- Global styles in `app/globals.css` with Tailwind directives
- CSS custom properties for theming (though not actively used in favor of Tailwind classes)
- Utility function `cn()` in `lib/utils/cn.ts` for conditional class names using `clsx` and `tailwind-merge`

### Type Safety
- Service and Blog types defined in `/lib/types/`
- All components and pages use TypeScript with proper type definitions

## Common Customization Points

1. **Business Information**: Update `/config/site.config.ts`
2. **Navigation**: Modify `/config/navigation.config.ts`
3. **Colors**: Edit primary/secondary color scales in `tailwind.config.ts`
4. **Services**: Add MDX files to `/content/services/` following the existing format
5. **Blog Posts**: Add MDX files to `/content/blog/` with proper frontmatter

## Known Issues & Considerations

- Hero background images are referenced but not included (`/public/images/hero-bg.jpg`)
- Contact form is configured for Netlify Forms with proper attributes
- The project uses Next.js 15 with React 19, which may have compatibility issues with some packages

## Image Optimization

- Uses Sharp for image optimization
- Scripts available for generating blur placeholders:
  - `npm run generate-blur` - Generate blur data for images
  - `npm run create-placeholders` - Create placeholder images
