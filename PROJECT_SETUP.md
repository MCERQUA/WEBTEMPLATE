# Project Structure Setup Guide

This guide explains the recommended directory structure that should be created for a complete project setup.

## 🗂️ Directories to Create

Run these commands in your project root to create the recommended directory structure:

```bash
# Create image directories
mkdir -p public/images/{hero,services,blog,team,testimonials,gallery}

# Create additional lib directories
mkdir -p lib/{constants,validations,services}

# Create types for better organization
mkdir -p lib/types/{api,forms,content}
```

## 📁 Directory Structure Explanation

### `/public/images/`
Store all your image assets organized by type:

- **`/hero/`** - Hero section background images
  - `hero-bg.jpg` - Main hero background
  - `hero-mobile.jpg` - Mobile-optimized hero image
  
- **`/services/`** - Service-related images
  - One image per service (e.g., `plumbing.jpg`, `electrical.jpg`)
  
- **`/blog/`** - Blog post featured images
  - Named to match blog post slugs
  
- **`/team/`** - Team member photos
  - Professional headshots (e.g., `john-doe.jpg`)
  
- **`/testimonials/`** - Customer photos (if used)
  
- **`/gallery/`** - Before/after photos for gallery component

### `/lib/constants/`
Centralize magic strings and configuration:

```typescript
// lib/constants/index.ts
export const SITE_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  DEFAULT_PAGE_SIZE: 10,
  // etc.
}

// lib/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  BLOG: '/blog',
}
```

### `/lib/validations/`
Form validation schemas:

```typescript
// lib/validations/contact.ts
export const contactFormSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  // etc.
}
```

### `/lib/services/`
Business logic and API integrations:

```typescript
// lib/services/email.ts
export async function sendContactEmail(data: ContactFormData) {
  // Email sending logic
}

// lib/services/analytics.ts
export function trackEvent(eventName: string, properties?: any) {
  // Analytics tracking logic
}
```

## 🖼️ Placeholder Images

Until you have actual images, create placeholder images:

1. **Hero Background** (1920x1080)
   - Modern office or service-related image
   - Optimized for web (< 200KB)

2. **Service Images** (800x600)
   - Professional service photos
   - Consistent style across all services

3. **Team Photos** (400x400)
   - Square format for consistency
   - Professional headshots

## 📝 Image Optimization Tips

1. Use WebP format when possible
2. Provide multiple sizes for responsive images
3. Keep file sizes under 200KB for hero images
4. Use the Sharp scripts to generate blur placeholders:
   ```bash
   npm run generate-blur
   npm run create-placeholders
   ```

## 🔧 Environment Variables

Add these to your `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Business Name"

# Contact Form
CONTACT_EMAIL=contact@yourbusiness.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# Social Media (optional)
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourbusiness
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourbusiness
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yourbusiness
```

## ✅ Setup Checklist

- [ ] Create all image directories
- [ ] Add placeholder images
- [ ] Create constants files
- [ ] Set up validation schemas
- [ ] Configure environment variables
- [ ] Update site.config.ts with your business info
- [ ] Replace favicon.ico with your logo
- [ ] Update meta descriptions in page files
- [ ] Add actual service content in /content/services/
- [ ] Write initial blog posts in /content/blog/

## 🚀 Next Steps

1. Run the cleanup script to remove duplicate files
2. Delete the cleanup script after running it
3. Create the directory structure above
4. Start customizing with your business information
5. Deploy to Netlify or your preferred hosting platform
