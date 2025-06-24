# Sitemap Customization Guide

## Overview

This template includes automatic sitemap generation using `next-sitemap`. The sitemap is generated automatically after each build and includes all public pages with appropriate priorities and change frequencies optimized for local service businesses.

## Configuration

### Basic Setup

1. **Set your production URL** in the environment variables:
   ```bash
   # .env.local or .env.production
   SITE_URL=https://yourdomain.com
   ```

2. **Build your site** to generate the sitemap:
   ```bash
   npm run build
   ```

   This will generate:
   - `/public/sitemap.xml` - Main sitemap file
   - `/public/robots.txt` - Robots file with sitemap reference

### Configuration File

The sitemap configuration is in `next-sitemap.config.js`. Key settings:

```javascript
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  // ... other settings
}
```

## Page Priorities

The template uses SEO-optimized priorities for local service businesses:

| Page Type | Priority | Change Frequency | Reasoning |
|-----------|----------|------------------|-----------|
| Homepage | 1.0 | Daily | Most important page, frequently updated |
| Contact | 0.9 | Weekly | Critical for conversions |
| About | 0.9 | Weekly | Important for trust building |
| Services (listing) | 0.9 | Weekly | Main service overview |
| Service (individual) | 0.8 | Weekly | Specific service pages |
| Blog (listing) | 0.7 | Daily | Frequently updated with new posts |
| Blog Post | 0.6 | Monthly | Individual posts rarely change |

## Customization Options

### 1. Adding Custom Pages

To add custom static pages to the sitemap, create them in the `app` directory. They'll be automatically included.

### 2. Excluding Pages

Add paths to the `exclude` array in `next-sitemap.config.js`:

```javascript
exclude: [
  '/admin/*',
  '/dashboard/*',
  '/private-page',
  // Add your exclusions here
],
```

### 3. Multi-Location Support

For businesses with multiple locations, you can add location-specific pages:

```javascript
// In next-sitemap.config.js
additionalPaths: async (config) => {
  const locations = ['phoenix', 'scottsdale', 'tempe'];
  
  return locations.map(location => ({
    loc: `/locations/${location}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  }));
},
```

### 4. Custom Change Frequencies

Modify the `transform` function in `next-sitemap.config.js`:

```javascript
transform: async (config, path) => {
  // Add your custom logic here
  if (path.includes('/seasonal-offers')) {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    };
  }
  // ... rest of the logic
}
```

### 5. Multiple Sitemaps

For large sites, you can split sitemaps:

```javascript
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateIndexSitemap: true, // Enable index sitemap
  sitemapSize: 5000, // Max URLs per sitemap
  // ... other config
}
```

## Dynamic Content

### Services and Blog Posts

The sitemap automatically includes all MDX content from:
- `/content/services/*.mdx` - Service pages
- `/content/blog/*.mdx` - Blog posts

These are discovered at build time and included with appropriate priorities.

### Adding New Content Types

To add a new content type (e.g., case studies):

1. Create content in `/content/case-studies/`
2. Update the sitemap configuration:

```javascript
// In the transform function
else if (path.startsWith('/case-studies/')) {
  priority = 0.7;
  changefreq = 'monthly';
}
```

## Robots.txt Customization

The `robots.txt` file is generated with the sitemap. Customize it in `next-sitemap.config.js`:

```javascript
robotsTxtOptions: {
  policies: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    // Add specific bot rules
    {
      userAgent: 'Googlebot',
      allow: '/',
      crawlDelay: 2,
    },
  ],
  // Additional sitemaps (e.g., for images)
  additionalSitemaps: [
    'https://yourdomain.com/sitemap-image.xml',
  ],
},
```

## Verification

### Local Testing

1. Build your site:
   ```bash
   npm run build
   ```

2. Check generated files:
   ```bash
   # View sitemap
   cat public/sitemap.xml
   
   # View robots.txt
   cat public/robots.txt
   ```

### Production Verification

After deployment:

1. Visit `https://yourdomain.com/sitemap.xml`
2. Visit `https://yourdomain.com/robots.txt`
3. Submit sitemap to Google Search Console
4. Submit sitemap to Bing Webmaster Tools

## Best Practices

### For Local Service Businesses

1. **Prioritize Contact and Service Pages**: These drive conversions
2. **Update Frequently Changed Content**: Mark seasonal offers as 'daily' or 'weekly'
3. **Include All Service Areas**: If you serve multiple locations
4. **Keep URLs Stable**: Avoid changing URLs to maintain SEO value

### Technical SEO

1. **Use Absolute URLs**: Always use full URLs in the sitemap
2. **Keep It Updated**: Regenerate after adding new pages
3. **Monitor Size**: Keep individual sitemaps under 50MB
4. **Include Last Modified**: Helps search engines prioritize crawling

## Troubleshooting

### Sitemap Not Generating

1. Check environment variable:
   ```bash
   echo $SITE_URL
   ```

2. Ensure postbuild script runs:
   ```json
   "scripts": {
     "postbuild": "next-sitemap"
   }
   ```

3. Check for build errors:
   ```bash
   npm run build
   ```

### Pages Missing from Sitemap

1. Check if page is in `exclude` list
2. Verify page exports from `app` directory
3. Ensure page is not returning 404

### Dynamic Content Not Included

1. Verify content files exist in `/content/`
2. Check file extensions (must be `.mdx`)
3. Ensure content has valid frontmatter

## Advanced Customization

### Internationalization

For multi-language sites:

```javascript
transform: async (config, path) => {
  return {
    loc: path,
    alternateRefs: [
      { href: `https://example.com${path}`, hreflang: 'en' },
      { href: `https://example.com/es${path}`, hreflang: 'es' },
    ],
    // ... other properties
  };
}
```

### Image Sitemaps

For image-heavy sites, create a separate image sitemap:

```javascript
// Create scripts/generate-image-sitemap.js
// Run after build to generate image sitemap
```

### News Sitemaps

For blogs with news content:

```javascript
// Add news-specific metadata
additionalPaths: async (config) => {
  const newsArticles = await getNewsArticles();
  return newsArticles.map(article => ({
    loc: `/news/${article.slug}`,
    news: {
      publication: {
        name: 'Your Business News',
        language: 'en',
      },
      publication_date: article.date,
      title: article.title,
    },
  }));
}
```

## Resources

- [Next-sitemap Documentation](https://github.com/iamvishnusankar/next-sitemap)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Search Console](https://search.google.com/search-console)