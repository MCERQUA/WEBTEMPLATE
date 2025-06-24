import React from 'react'
import { BreadcrumbSchema, BreadcrumbItem } from './BreadcrumbSchema'
import { FAQSchema, FAQItem } from './FAQSchema'
import { ServiceSchema, ServiceSchemaProps } from './ServiceSchema'

interface StructuredDataProviderProps {
  breadcrumbs?: BreadcrumbItem[]
  faqs?: FAQItem[]
  service?: Omit<ServiceSchemaProps, 'children'>
  children?: React.ReactNode
}

/**
 * StructuredDataProvider - A utility component to manage structured data across pages
 * 
 * Usage:
 * ```tsx
 * <StructuredDataProvider
 *   breadcrumbs={[
 *     { name: "Home", url: "/" },
 *     { name: "Services", url: "/services" }
 *   ]}
 *   faqs={[
 *     { question: "What services do you offer?", answer: "We offer..." }
 *   ]}
 * >
 *   <YourPageContent />
 * </StructuredDataProvider>
 * ```
 */
export function StructuredDataProvider({
  breadcrumbs,
  faqs,
  service,
  children
}: StructuredDataProviderProps) {
  return (
    <>
      {breadcrumbs && <BreadcrumbSchema items={breadcrumbs} />}
      {faqs && <FAQSchema items={faqs} />}
      {service && (
        <ServiceSchema
          name={service.name}
          description={service.description}
          provider={service.provider}
          serviceType={service.serviceType}
          areaServed={service.areaServed}
          url={service.url}
          priceRange={service.priceRange}
        />
      )}
      {children}
    </>
  )
}