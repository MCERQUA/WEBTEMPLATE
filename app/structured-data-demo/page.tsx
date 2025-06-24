import { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Card } from "@/components/ui/Card"
import { StructuredDataProvider } from "@/components/seo"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Structured Data Demo | Local Service Company",
  description: "Demonstration of all structured data implementations for SEO optimization",
  robots: "noindex, nofollow", // This is just a demo page
}

export default function StructuredDataDemoPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Demo", url: "/structured-data-demo" }
  ]

  const faqs = [
    {
      question: "What is structured data?",
      answer: "Structured data is a standardized format for providing information about a page and classifying the page content. It helps search engines understand your content better."
    },
    {
      question: "Why is structured data important for local SEO?",
      answer: "Structured data helps search engines display rich results for your business, including business hours, location, ratings, and more in search results."
    },
    {
      question: "What types of schema are implemented?",
      answer: "We've implemented LocalBusiness, Service, BreadcrumbList, FAQPage, and Article schemas throughout the site."
    }
  ]

  const serviceData = {
    name: "Demo Service",
    description: "This is a demonstration of the Service schema implementation",
    provider: siteConfig.name,
    serviceType: "Service",
    areaServed: [siteConfig.address.city, siteConfig.address.state],
    url: "/structured-data-demo",
    priceRange: "$$"
  }

  return (
    <StructuredDataProvider
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      service={serviceData}
    >
      <Hero
        title="Structured Data Implementation Demo"
        description="This page demonstrates all the structured data schemas implemented throughout the site"
        primaryButtonText="View Source"
        primaryButtonHref="#"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/about"
      />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Implemented Schemas</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <div>
                    <strong>LocalBusiness Schema</strong> - Added to root layout for site-wide business information
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <div>
                    <strong>BreadcrumbList Schema</strong> - Added to all pages for navigation hierarchy
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <div>
                    <strong>Service Schema</strong> - Added to service detail pages
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <div>
                    <strong>FAQPage Schema</strong> - Added to relevant pages with Q&A content
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <div>
                    <strong>Article Schema</strong> - Added to blog posts
                  </div>
                </li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">SEO Benefits</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Enhanced search result appearance with rich snippets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Better local search visibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Improved click-through rates from search results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Voice search optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Google Knowledge Graph inclusion</span>
                </li>
              </ul>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Testing Structured Data</h2>
              <p className="text-gray-600 mb-4">
                To test the structured data implementation:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open any page and view the page source</li>
                <li>Look for <code className="bg-gray-100 px-2 py-1 rounded">script type="application/ld+json"</code> tags</li>
                <li>Copy the JSON content and validate using Google's Rich Results Test</li>
                <li>Use browser extensions like "Structured Data Testing Tool" for quick validation</li>
              </ol>
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This demo page includes all structured data types as an example. 
                  In production, only relevant schemas should be included on each page.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </StructuredDataProvider>
  )
}