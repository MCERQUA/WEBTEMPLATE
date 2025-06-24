import { siteConfig } from "@/config/site.config"

export function generateMetadata(page: string, description?: string) {
  return {
    title: `${page} | ${siteConfig.name}`,
    description: description || siteConfig.description,
    openGraph: {
      title: `${page} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page} | ${siteConfig.name}`,
      description: description || siteConfig.description,
    }
  }
}

export function generateSEOTags(
  title: string,
  description: string,
  image?: string,
  article?: boolean
) {
  const fullTitle = `${title} | ${siteConfig.name}`
  
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: article ? 'article' : 'website',
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : [],
    }
  }
}