import { siteConfig } from '@/config/site.config'

export interface BreadcrumbItem {
  name: string
  url?: string
}

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
  baseUrl?: string
}

export function BreadcrumbSchema({ 
  items, 
  baseUrl = siteConfig.url 
}: BreadcrumbSchemaProps) {
  // Filter out items without names and ensure proper URL formatting
  const validItems = items.filter(item => item.name)
  
  if (validItems.length === 0) {
    return null
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: validItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url ? `${baseUrl}${item.url}` : `${baseUrl}`,
        name: item.name
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}