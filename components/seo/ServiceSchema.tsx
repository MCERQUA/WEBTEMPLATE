import { siteConfig } from '@/config/site.config'

export interface ServiceSchemaProps {
  name: string
  description: string
  provider?: {
    name?: string
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
  }
  serviceType?: string
  areaServed?: string | string[]
  offers?: {
    price?: string
    priceCurrency?: string
    priceRange?: string
    availability?: string
    validFrom?: string
    validThrough?: string
  }
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
  image?: string | string[]
  url?: string
  additionalType?: string
  category?: string
  hasOfferCatalog?: {
    name: string
    itemListElement: Array<{
      name: string
      description?: string
      price?: string
    }>
  }
}

export function ServiceSchema({
  name,
  description,
  provider = {
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US'
    }
  },
  serviceType,
  areaServed,
  offers,
  aggregateRating,
  image,
  url,
  additionalType,
  category,
  hasOfferCatalog
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: provider.name,
      ...(provider.url && { url: provider.url }),
      ...(provider.telephone && { telephone: provider.telephone }),
      ...(provider.email && { email: provider.email }),
      ...(provider.address && {
        address: {
          '@type': 'PostalAddress',
          ...provider.address
        }
      })
    },
    ...(serviceType && { serviceType }),
    ...(areaServed && { 
      areaServed: Array.isArray(areaServed) ? areaServed : [areaServed] 
    }),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        ...(offers.price && { price: offers.price }),
        ...(offers.priceCurrency && { priceCurrency: offers.priceCurrency }),
        ...(offers.priceRange && { priceRange: offers.priceRange }),
        ...(offers.availability && { availability: offers.availability }),
        ...(offers.validFrom && { validFrom: offers.validFrom }),
        ...(offers.validThrough && { validThrough: offers.validThrough })
      }
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount
      }
    }),
    ...(image && { 
      image: Array.isArray(image) ? image : [image] 
    }),
    ...(url && { url }),
    ...(additionalType && { additionalType }),
    ...(category && { category }),
    ...(hasOfferCatalog && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: hasOfferCatalog.name,
        itemListElement: hasOfferCatalog.itemListElement.map(item => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            ...(item.description && { description: item.description })
          },
          ...(item.price && { price: item.price })
        }))
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}