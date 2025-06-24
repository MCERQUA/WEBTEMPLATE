/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/test-tailwind',
    '/structured-data-demo',
    '/404',
    '/500',
    '/_*',
    '/api/*',
    '/admin/*',
    '/dashboard/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/_next/',
          '/test-tailwind',
          '/structured-data-demo',
        ],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps here if needed
    ],
  },
  transform: async (config, path) => {
    // Default priority values for different page types
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage - highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Core pages - high priority
    else if (['/about', '/contact', '/services'].includes(path)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Individual service pages - medium-high priority
    else if (path.startsWith('/services/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Blog listing page - medium priority
    else if (path === '/blog') {
      priority = 0.7;
      changefreq = 'daily';
    }
    // Individual blog posts - medium priority
    else if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const result = [];

    // Add any additional dynamic paths here if needed
    // For example, if you have multiple locations:
    /*
    const locations = ['phoenix', 'scottsdale', 'tempe'];
    locations.forEach(location => {
      result.push({
        loc: `/locations/${location}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });
    */

    return result;
  },
};