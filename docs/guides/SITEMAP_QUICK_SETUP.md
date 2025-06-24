# Sitemap Quick Setup Guide

## Overview

This template includes automatic XML sitemap generation that helps search engines discover and index your pages. The sitemap is generated after each build using `next-sitemap`.

## Quick Setup (3 Steps)

### 1. Set Your Domain

Create a `.env.local` file (copy from `.env.example`):

```bash
# .env.local
SITE_URL=https://yourdomain.com
```

### 2. Build Your Site

```bash
npm run build
```

This automatically generates:
- `/public/sitemap.xml` - Your sitemap
- `/public/robots.txt` - Robots file

### 3. Verify

After deployment, check:
- `https://yourdomain.com/sitemap.xml`
- `https://yourdomain.com/robots.txt`

## What's Included

The sitemap automatically includes:

- ✅ Homepage (`/`)
- ✅ About page (`/about`)
- ✅ Contact page (`/contact`)
- ✅ Services listing (`/services`)
- ✅ Individual service pages (`/services/[slug]`)
- ✅ Blog listing (`/blog`)
- ✅ Individual blog posts (`/blog/[slug]`)

## SEO Priorities

Pages are prioritized for local service businesses:

- **1.0** - Homepage (most important)
- **0.9** - Contact, About, Services listing
- **0.8** - Individual service pages
- **0.7** - Blog listing
- **0.6** - Individual blog posts

## Excluded Pages

These pages are automatically excluded:
- Test pages (`/test-tailwind`, `/structured-data-demo`)
- Admin/dashboard pages
- API routes
- Error pages (404, 500)

## Submit to Search Engines

After deployment:

1. **Google Search Console**
   - Add your property
   - Go to Sitemaps
   - Enter `sitemap.xml`
   - Submit

2. **Bing Webmaster Tools**
   - Add your site
   - Submit sitemap URL

## Need More Control?

For advanced customization, see the [full Sitemap Configuration Guide](../customization/SITEMAP.md).

## Common Issues

### Sitemap not generating?
- Ensure `SITE_URL` is set in environment variables
- Check that build completes successfully
- Verify `postbuild` script in package.json

### Pages missing?
- Check if page is in exclude list
- Ensure MDX files have proper frontmatter
- Verify page exports correctly from app directory