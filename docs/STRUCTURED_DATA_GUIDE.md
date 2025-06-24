# Structured Data Implementation Guide

This guide explains the structured data (Schema.org) implementation throughout the Local Service Template.

## Overview

Structured data helps search engines understand your content better and can lead to rich results in search, including:
- Business information cards
- Service listings
- FAQ snippets
- Breadcrumb navigation
- Article rich results

## Implemented Schemas

### 1. LocalBusiness Schema
- **Location**: Root layout (`app/layout.tsx`)
- **Purpose**: Provides business information site-wide
- **Data Source**: `config/site.config.ts`
- **Rich Result**: Google Business Knowledge Panel

### 2. BreadcrumbList Schema
- **Location**: All pages
- **Purpose**: Shows page hierarchy in search results
- **Implementation**: Via `BreadcrumbSchema` component
- **Rich Result**: Breadcrumb trail in search results

### 3. Service Schema
- **Location**: Service detail pages (`app/services/[slug]/page.tsx`)
- **Purpose**: Describes specific services offered
- **Rich Result**: Service listings in search

### 4. FAQPage Schema
- **Location**: Services, About, and Contact pages
- **Purpose**: Marks up frequently asked questions
- **Rich Result**: FAQ snippets in search results

### 5. Article Schema
- **Location**: Blog posts (`app/blog/[slug]/page.tsx`)
- **Purpose**: Marks up blog content
- **Rich Result**: Article cards with author, date, etc.

## Usage Examples

### Basic Page with Breadcrumbs
```tsx
import { BreadcrumbSchema } from '@/components/seo'

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Current Page", url: "/current-page" }
        ]}
      />
      {/* Page content */}
    </>
  )
}
```

### Page with FAQs
```tsx
import { FAQSchema } from '@/components/seo'

export default function Page() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer residential, commercial, and emergency services."
    }
  ]
  
  return (
    <>
      <FAQSchema items={faqs} />
      {/* Page content */}
    </>
  )
}
```

### Using StructuredDataProvider
```tsx
import { StructuredDataProvider } from '@/components/seo'

export default function Page() {
  return (
    <StructuredDataProvider
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" }
      ]}
      faqs={[
        { question: "Q1", answer: "A1" }
      ]}
    >
      {/* Page content */}
    </StructuredDataProvider>
  )
}
```

## Configuration

### Business Information
Update `config/site.config.ts` with your business details:
```ts
export const siteConfig = {
  name: "Your Business Name",
  description: "Your business description",
  url: "https://yourdomain.com",
  phone: "(555) 123-4567",
  email: "info@yourdomain.com",
  address: {
    street: "123 Main St",
    city: "Your City",
    state: "ST",
    zip: "12345"
  },
  // ... other config
}
```

### Adding Geo Coordinates
For better local SEO, add your business coordinates in `lib/utils/structured-data.ts`:
```ts
geo: {
  latitude: 40.7128,  // Your actual latitude
  longitude: -74.0060 // Your actual longitude
}
```

## Testing Structured Data

### 1. Google Rich Results Test
- Visit: https://search.google.com/test/rich-results
- Enter your page URL or paste the HTML
- Review any errors or warnings

### 2. Schema.org Validator
- Visit: https://validator.schema.org/
- Paste your JSON-LD code
- Check for validation errors

### 3. Browser Extensions
- Install "Structured Data Testing Tool" extension
- Navigate to your page
- Click the extension to see parsed structured data

## Best Practices

1. **Accuracy**: Ensure all information is accurate and up-to-date
2. **Completeness**: Include as much relevant information as possible
3. **Consistency**: Keep data consistent across all schemas
4. **Testing**: Test all pages with structured data tools
5. **Monitoring**: Use Google Search Console to monitor rich results

## Common Issues

### Missing Required Fields
- Always include required fields like name, description
- Check schema.org documentation for requirements

### Invalid Date Formats
- Use ISO 8601 format: `2024-01-15`
- For opening hours: `Mo-Fr 09:00-17:00`

### URL Issues
- Always use absolute URLs in production
- Ensure URLs match your actual site structure

## Adding New Schema Types

To add a new schema type:

1. Create a new component in `components/seo/`
2. Define the schema structure
3. Export from `components/seo/index.ts`
4. Use in relevant pages

Example:
```tsx
export function ReviewSchema({ 
  itemReviewed, 
  rating, 
  author 
}: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: itemReviewed
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating
    },
    author: {
      '@type': 'Person',
      name: author
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)
- [Rich Results Gallery](https://developers.google.com/search/docs/advanced/structured-data/search-gallery)