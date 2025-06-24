# WEBTEMPLATE - Next.js 15 Service Business Template

## 🚀 Overview

A modern, modular Next.js 15 website template designed for local service businesses. Built with TypeScript, Tailwind CSS v3, and optimized for performance, SEO, and conversions.

**Key Features:**
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS v3 for styling
- MDX content management
- Netlify Forms integration
- SEO optimized with structured data
- Mobile-first responsive design
- Component-based architecture (all files <150 lines)

## 📁 Project Structure

```
WEBTEMPLATE/
├── app/                    # Next.js 15 App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── services/          # Services listing & dynamic routes
│   ├── blog/              # Blog listing & dynamic routes
│   └── contact/           # Contact page with form
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections (Hero, ServiceGrid, CTA)
│   ├── ui/               # Atomic UI components (Button, Card)
│   ├── business/         # Business-specific components
│   ├── seo/              # SEO components (structured data, meta)
│   └── external/         # Third-party integrations
├── config/               # Configuration files
│   ├── site.config.ts    # Company info, hours, contact
│   └── navigation.config.ts # Navigation structure
├── content/              # MDX content files
│   ├── services/         # Service pages content
│   ├── blog/             # Blog posts
│   └── testimonials/     # Customer testimonials
├── lib/                  # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
│   └── images/           # Images (optimized)
└── scripts/              # Build & utility scripts
```

## 🛠️ Tech Stack

### Core
- **Next.js 15.3.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.17** - Utility-first CSS

### Content & SEO
- **MDX** (gray-matter) - Content management
- **next-sitemap** - Automatic sitemap generation
- **Structured Data** - JSON-LD for rich snippets

### UI & Animation
- **Framer Motion 12** - Animations
- **Lucide React** - Icon library
- **clsx + tailwind-merge** - Dynamic class names

### Forms & Contact
- **Netlify Forms** - Built-in form handling
- **Custom ContactForm** - Pre-configured for Netlify

### Development
- **ESLint + Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Sharp** - Image optimization

## 🧩 Component System

### Layout Components (`/components/layout/`)
- **Header** - Navigation with mobile menu
- **Footer** - Company info, links, hours

### Section Components (`/components/sections/`)
- **Hero** - Homepage hero with CTA buttons
- **ServiceGrid** - Dynamic service cards
- **CTASection** - Call-to-action blocks

### UI Components (`/components/ui/`)
- **Button** - Consistent button styles
- **Card** - Content card wrapper

### Business Components (`/components/business/`)
- **ContactForm** - Netlify-ready contact form
- **BusinessHours** - Operating hours display
- **EmergencyBanner** - Emergency service alert
- **ServiceAreaChecker** - Service area validation
- **TestimonialCard** - Customer testimonials
- **ClickToCall** - Mobile-friendly phone button
- **BeforeAfterGallery** - Project showcase
- **TeamMember** - Staff profiles

## ⚙️ Configuration

### Site Configuration (`/config/site.config.ts`)
```typescript
export const siteConfig = {
  name: "Your Business Name",
  description: "Your business description",
  url: "https://yourdomain.com",
  phone: "(555) 123-4567",
  email: "info@yourbusiness.com",
  address: {
    street: "123 Main St",
    city: "Your City",
    state: "ST",
    zip: "12345"
  },
  hours: {
    // Business hours configuration
  }
}
```

### Navigation (`/config/navigation.config.ts`)
Defines the main navigation structure for header and footer menus.

## 🎨 Styling

### Tailwind Configuration
- Custom color palette (primary: blue, secondary: orange)
- Numbered color variants (e.g., `text-primary-500`)
- Extended typography and form plugins
- Container with padding and centering

### Global Styles (`/app/globals.css`)
- Tailwind directives
- Custom CSS properties for theming
- Base styles for typography

## 📝 Content Management

### Services (`/content/services/`)
MDX files with frontmatter:
```mdx
---
title: "Service Name"
description: "Service description"
slug: "service-slug"
icon: "icon-name"
featured: true
---

Service content in MDX format...
```

### Blog Posts (`/content/blog/`)
MDX files with frontmatter:
```mdx
---
title: "Blog Post Title"
description: "Post description"
date: "2024-01-01"
author: "Author Name"
image: "/images/blog/post.jpg"
---

Blog content in MDX format...
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/MCERQUA/WEBTEMPLATE.git

# Install dependencies
npm install

# Run development server
npm run dev
```

### Development Commands
```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Deployment
Optimized for Netlify deployment:
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Environment variables in `.env.example`

## 📋 Key Features Explained

### Netlify Forms
ContactForm component is pre-configured:
- Hidden form-name field
- Honeypot spam protection
- Proper form attributes
- Success/error handling

### SEO Optimization
- Metadata API for each page
- JSON-LD structured data
- Automatic sitemap generation
- Open Graph tags
- Semantic HTML

### Performance
- Image optimization with Sharp
- Lazy loading components
- Minimal JavaScript bundle
- CSS optimization

### Type Safety
- Full TypeScript coverage
- Defined types for all data structures
- Type-safe MDX frontmatter
- Proper component prop types

## 🔧 Customization Guide

### Quick Customizations
1. **Business Info**: Update `/config/site.config.ts`
2. **Navigation**: Modify `/config/navigation.config.ts`
3. **Colors**: Edit Tailwind config color scales
4. **Content**: Add/edit MDX files in `/content/`

### Component Guidelines
- Keep components under 150 lines
- Use TypeScript for all components
- Include proper JSDoc comments
- Follow atomic design principles
- Use "use client" only when needed

### Adding New Pages
1. Create folder in `/app/`
2. Add `page.tsx` with metadata
3. Update navigation config
4. Add to sitemap if needed

## 📦 Dependencies

### Production
- Next.js, React, React DOM
- Tailwind CSS + plugins
- Framer Motion (animations)
- Lucide React (icons)
- Gray Matter (MDX parsing)
- Sharp (image optimization)

### Development
- TypeScript + types
- ESLint + Prettier
- PostCSS + Autoprefixer

## 🚨 Important Notes

### Tailwind CSS Version
This project uses **Tailwind CSS v3** (not v4). Color classes use numbered variants:
- ✅ `text-primary-500`
- ❌ `text-primary`

### Next.js 15 Patterns
Dynamic routes use async params:
```typescript
export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  // ...
}
```

### Missing Assets
Hero background images are referenced but not included. Add your own images to `/public/images/`.

## 📄 License

This template is available for commercial and non-commercial use. Please customize for your specific business needs.

---

Built with ❤️ for local service businesses
