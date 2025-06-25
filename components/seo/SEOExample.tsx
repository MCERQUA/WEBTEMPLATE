/**
 * Example component demonstrating how to use all SEO components together
 * This file serves as a reference implementation
 */

import { 
  LocalBusinessSchema,
  BreadcrumbSchema,
  FAQSchema,
  ServiceSchema,
  MetaTags
} from '@/components/seo'
import { siteConfig } from '@/config/site.config'

export function SEOExample() {
  // Example FAQ items
  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "We offer residential and commercial services including maintenance, repairs, and installations."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve the entire Phoenix metro area including Phoenix, Scottsdale, Tempe, Mesa, and surrounding communities."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we offer 24/7 emergency services. Call us anytime for urgent needs."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes, we are fully licensed, bonded, and insured for your protection and peace of mind."
    }
  ]

  // Example breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Residential Services' }
  ]

  return (
    <>
      {/* Meta Tags for the page */}
      <MetaTags
        title="Professional Local Services"
        description="Trusted local service provider offering residential and commercial solutions in Phoenix area"
        keywords={['local service', 'phoenix', 'residential', 'commercial', 'professional']}
        ogImage="https://example.com/og-image.jpg"
        canonical="https://example.com/services"
        articleSection="Services"
        geoRegion="US-AZ"
        geoPlacename="Phoenix, Arizona"
      />

      {/* Local Business Schema - typically on homepage or contact page */}
      <LocalBusinessSchema
        priceRange="$$"
        image={[
          "https://example.com/storefront.jpg",
          "https://example.com/team.jpg"
        ]}
        logo="https://example.com/logo.png"
        geo={{
          latitude: 33.4484,
          longitude: -112.0740
        }}
        areaServed={["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler"]}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 256
        }}
        sameAs={[
          "https://www.facebook.com/yourcompany",
          "https://www.yelp.com/biz/yourcompany"
        ]}
      />

      {/* Breadcrumb Schema for navigation */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Service Schema for specific service pages */}
      <ServiceSchema
        name="Residential Service Package"
        description="Comprehensive residential service solutions including maintenance, repairs, and installations"
        provider={{
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
        }}
        serviceType="Home Services"
        areaServed={["Phoenix Metro Area"]}
        offers={{
          priceRange: "$100-$500",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock"
        }}
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 189
        }}
        hasOfferCatalog={{
          name: "Service Options",
          itemListElement: [
            {
              name: "Basic Maintenance",
              description: "Regular maintenance service",
              price: "$100"
            },
            {
              name: "Repair Service",
              description: "Professional repair service",
              price: "$200-$400"
            },
            {
              name: "Installation Service",
              description: "New installation service",
              price: "$300-$500"
            }
          ]
        }}
      />

      {/* FAQ Schema for FAQ pages or sections */}
      <FAQSchema items={faqItems} />
    </>
  )
}
