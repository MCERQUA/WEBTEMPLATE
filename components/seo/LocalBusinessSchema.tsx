import { siteConfig } from '@/config/site.config'

export interface LocalBusinessSchemaProps {
  // Optional overrides for default values
  name?: string
  description?: string
  url?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  // Additional schema properties
  priceRange?: string
  image?: string | string[]
  logo?: string
  openingHours?: Array<{
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  geo?: {
    latitude: number
    longitude: number
  }
  areaServed?: string | string[]
  serviceArea?: {
    geoRadius?: {
      geoMidpoint: {
        latitude: number
        longitude: number
      }
      radius: string
    }
  }
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
  sameAs?: string[]
}

export function LocalBusinessSchema({
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  telephone = siteConfig.phone,
  email = siteConfig.email,
  address = {
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: 'US'
  },
  priceRange,
  image,
  logo,
  openingHours,
  geo,
  areaServed,
  serviceArea,
  aggregateRating,
  sameAs = []
}: LocalBusinessSchemaProps = {}) {
  // Build opening hours specification from business hours config
  const defaultOpeningHours = Object.entries(siteConfig.businessHours)
    .filter(([_, hours]) => hours !== 'Closed')
    .map(([day, hours]) => {
      const [opens, closes] = hours.split(' - ')
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
        opens: opens.replace(' AM', ':00').replace(' PM', ':00'),
        closes: closes.replace(' AM', ':00').replace(' PM', ':00')
      }
    })

  // Build social media links
  const socialLinks = Object.entries(siteConfig.social)
    .filter(([_, url]) => url)
    .map(([_, url]) => url)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    ...(priceRange && { priceRange }),
    ...(image && { 
      image: Array.isArray(image) ? image : [image] 
    }),
    ...(logo && { logo }),
    openingHoursSpecification: openingHours || defaultOpeningHours,
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude
      }
    }),
    ...(areaServed && { areaServed }),
    ...(serviceArea && {
      areaServed: {
        '@type': 'GeoCircle',
        ...serviceArea.geoRadius
      }
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount
      }
    }),
    sameAs: [...socialLinks, ...sameAs].filter(Boolean)
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}