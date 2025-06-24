import { getAllContent } from './mdx'

export interface SitemapLocation {
  path: string
  priority?: number
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  lastmod?: string
}

/**
 * Get all dynamic paths for the sitemap
 * This is used by next-sitemap to generate the sitemap
 */
export async function getDynamicPaths(): Promise<SitemapLocation[]> {
  const paths: SitemapLocation[] = []

  // Get all service pages
  const services = await getAllContent('services')
  services.forEach((service) => {
    if (service) {
      paths.push({
        path: `/services/${service.slug}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: service.lastModified || new Date().toISOString(),
      })
    }
  })

  // Get all blog posts
  const blogPosts = await getAllContent('blog')
  blogPosts.forEach((post) => {
    if (post) {
      paths.push({
        path: `/blog/${post.slug}`,
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: post.lastModified || post.date || new Date().toISOString(),
      })
    }
  })

  return paths
}

/**
 * Generate location-specific paths for multi-location businesses
 * @param locations Array of location slugs
 */
export function generateLocationPaths(locations: string[]): SitemapLocation[] {
  return locations.map((location) => ({
    path: `/locations/${location}`,
    priority: 0.8,
    changefreq: 'weekly',
  }))
}

/**
 * Custom sitemap configuration for local service businesses
 */
export const sitemapConfig = {
  // Page type priorities for local service businesses
  priorities: {
    home: 1.0,
    contact: 0.9,
    about: 0.9,
    services: 0.9,
    service: 0.8,
    locations: 0.8,
    location: 0.8,
    blog: 0.7,
    blogPost: 0.6,
    legal: 0.3,
  },

  // Change frequencies
  changefreq: {
    home: 'daily' as const,
    contact: 'weekly' as const,
    about: 'weekly' as const,
    services: 'weekly' as const,
    service: 'weekly' as const,
    blog: 'daily' as const,
    blogPost: 'monthly' as const,
    legal: 'yearly' as const,
  },
}