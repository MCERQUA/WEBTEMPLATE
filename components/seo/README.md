# SEO Components

This directory contains SEO-specific components for implementing structured data and meta tags according to Google's guidelines.

## Components

### LocalBusinessSchema

Generates JSON-LD structured data for local businesses.

```tsx
import { LocalBusinessSchema } from '@/components/seo'

// Basic usage with site config defaults
<LocalBusinessSchema />

// With custom values
<LocalBusinessSchema
  name="Custom Business Name"
  description="We provide excellent services"
  priceRange="$$"
  geo={{
    latitude: 33.4484,
    longitude: -112.0740
  }}
  aggregateRating={{
    ratingValue: 4.8,
    reviewCount: 127
  }}
/>
```

### BreadcrumbSchema

Generates breadcrumb structured data for better navigation in search results.

```tsx
import { BreadcrumbSchema } from '@/components/seo'

<BreadcrumbSchema
  items={[
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Residential Services', url: '/services/residential' }
  ]}
/>
```

### FAQSchema

Generates FAQ structured data for frequently asked questions.

```tsx
import { FAQSchema } from '@/components/seo'

<FAQSchema
  items={[
    {
      question: "What areas do you serve?",
      answer: "We serve the entire Phoenix metro area including..."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we offer 24/7 emergency services..."
    }
  ]}
/>
```

### ServiceSchema

Generates structured data for specific services.

```tsx
import { ServiceSchema } from '@/components/seo'

<ServiceSchema
  name="Residential Cleaning Service"
  description="Professional home cleaning services"
  serviceType="House Cleaning"
  areaServed={["Phoenix", "Scottsdale", "Tempe"]}
  offers={{
    priceRange: "$100-$300",
    priceCurrency: "USD"
  }}
/>
```

### MetaTags

Dynamic meta tag component for SEO optimization.

```tsx
import { MetaTags } from '@/components/seo'

<MetaTags
  title="About Us"
  description="Learn more about our local service company"
  keywords={["local service", "phoenix", "professional"]}
  ogImage="https://example.com/og-image.jpg"
  canonical="https://example.com/about"
/>
```

## Best Practices

1. **Always include on relevant pages**: Add LocalBusinessSchema to your homepage and contact page
2. **Keep data consistent**: Ensure information matches across all schemas and your visible content
3. **Test your structured data**: Use Google's Rich Results Test tool
4. **Update regularly**: Keep business hours, prices, and ratings current
5. **Use appropriate schemas**: Match the schema type to your content

## Integration Example

Here's how to integrate multiple SEO components in a page:

```tsx
import { 
  LocalBusinessSchema, 
  BreadcrumbSchema, 
  MetaTags 
} from '@/components/seo'

export default function ServicePage() {
  return (
    <>
      <MetaTags
        title="Our Services"
        description="Professional services in Phoenix area"
        ogType="website"
      />
      
      <LocalBusinessSchema />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />
      
      {/* Page content */}
    </>
  )
}
```

## Validation

Always validate your structured data using:
- [Google's Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)

## TypeScript Support

All components are fully typed with TypeScript interfaces. Import types as needed:

```tsx
import type { 
  LocalBusinessSchemaProps,
  FAQItem,
  MetaTagsProps 
} from '@/components/seo'
```