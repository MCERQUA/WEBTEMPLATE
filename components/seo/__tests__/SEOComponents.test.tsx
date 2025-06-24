import { render } from '@testing-library/react'
import { 
  LocalBusinessSchema,
  BreadcrumbSchema,
  FAQSchema,
  ServiceSchema
} from '../index'

describe('SEO Components', () => {
  describe('LocalBusinessSchema', () => {
    it('renders valid JSON-LD script tag', () => {
      const { container } = render(<LocalBusinessSchema />)
      const script = container.querySelector('script[type="application/ld+json"]')
      
      expect(script).toBeInTheDocument()
      
      const jsonData = JSON.parse(script?.innerHTML || '{}')
      expect(jsonData['@context']).toBe('https://schema.org')
      expect(jsonData['@type']).toBe('LocalBusiness')
    })

    it('includes custom properties when provided', () => {
      const { container } = render(
        <LocalBusinessSchema
          name="Test Business"
          priceRange="$$$"
          aggregateRating={{
            ratingValue: 4.5,
            reviewCount: 100
          }}
        />
      )
      
      const script = container.querySelector('script[type="application/ld+json"]')
      const jsonData = JSON.parse(script?.innerHTML || '{}')
      
      expect(jsonData.name).toBe('Test Business')
      expect(jsonData.priceRange).toBe('$$$')
      expect(jsonData.aggregateRating.ratingValue).toBe(4.5)
    })
  })

  describe('BreadcrumbSchema', () => {
    it('renders breadcrumb list with correct structure', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Details' }
      ]
      
      const { container } = render(<BreadcrumbSchema items={items} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const jsonData = JSON.parse(script?.innerHTML || '{}')
      
      expect(jsonData['@type']).toBe('BreadcrumbList')
      expect(jsonData.itemListElement).toHaveLength(3)
      expect(jsonData.itemListElement[0].position).toBe(1)
      expect(jsonData.itemListElement[2].item.name).toBe('Details')
    })

    it('returns null for empty items', () => {
      const { container } = render(<BreadcrumbSchema items={[]} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      
      expect(script).not.toBeInTheDocument()
    })
  })

  describe('FAQSchema', () => {
    it('renders FAQ page schema correctly', () => {
      const items = [
        {
          question: 'What is your service?',
          answer: 'We provide professional services.'
        },
        {
          question: 'What are your hours?',
          answer: 'We are open Monday through Friday.'
        }
      ]
      
      const { container } = render(<FAQSchema items={items} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const jsonData = JSON.parse(script?.innerHTML || '{}')
      
      expect(jsonData['@type']).toBe('FAQPage')
      expect(jsonData.mainEntity).toHaveLength(2)
      expect(jsonData.mainEntity[0]['@type']).toBe('Question')
      expect(jsonData.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
    })
  })

  describe('ServiceSchema', () => {
    it('renders service schema with required fields', () => {
      const { container } = render(
        <ServiceSchema
          name="Test Service"
          description="Test service description"
        />
      )
      
      const script = container.querySelector('script[type="application/ld+json"]')
      const jsonData = JSON.parse(script?.innerHTML || '{}')
      
      expect(jsonData['@type']).toBe('Service')
      expect(jsonData.name).toBe('Test Service')
      expect(jsonData.description).toBe('Test service description')
      expect(jsonData.provider['@type']).toBe('LocalBusiness')
    })

    it('includes optional fields when provided', () => {
      const { container } = render(
        <ServiceSchema
          name="Premium Service"
          description="Premium service description"
          serviceType="Consulting"
          offers={{
            price: "500",
            priceCurrency: "USD"
          }}
          aggregateRating={{
            ratingValue: 5,
            reviewCount: 50
          }}
        />
      )
      
      const script = container.querySelector('script[type="application/ld+json"]')
      const jsonData = JSON.parse(script?.innerHTML || '{}')
      
      expect(jsonData.serviceType).toBe('Consulting')
      expect(jsonData.offers.price).toBe('500')
      expect(jsonData.aggregateRating.ratingValue).toBe(5)
    })
  })
})