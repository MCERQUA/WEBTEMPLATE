import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Hero } from "@/components/sections/Hero"
import { CTASection } from "@/components/sections/CTASection"
import { Card } from "@/components/ui/Card"
import { Check } from "lucide-react"
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/seo"
import { siteConfig } from "@/config/site.config"

// This would typically come from a CMS or database
const services = {
  "residential": {
    title: "Residential Services",
    description: "Complete home solutions with professional care",
    longDescription: "Our residential services are designed to keep your home in perfect condition. From routine maintenance to emergency repairs, we've got you covered.",
    features: [
      "Regular maintenance programs",
      "Emergency repair services",
      "Professional consultation",
      "Quality guaranteed",
      "Licensed and insured professionals",
      "Flexible scheduling"
    ],
    price: "Starting at $99",
    image: "/images/residential-service.jpg"
  },
  "commercial": {
    title: "Commercial Services",
    description: "Keep your business running smoothly",
    longDescription: "Our commercial services ensure your business operations never skip a beat. We offer customized solutions tailored to your specific needs.",
    features: [
      "Custom service plans",
      "Priority response times",
      "Bulk service discounts",
      "24/7 emergency support",
      "Preventive maintenance",
      "Dedicated account manager"
    ],
    price: "Custom pricing",
    image: "/images/commercial-service.jpg"
  },
  "emergency": {
    title: "Emergency Services",
    description: "24/7 rapid response when you need it most",
    longDescription: "When emergencies strike, we're here to help. Our emergency response team is available 24/7 to handle urgent situations.",
    features: [
      "24/7 availability",
      "Rapid response (under 2 hours)",
      "Emergency hotline",
      "Experienced emergency technicians",
      "Immediate assessment",
      "Temporary solutions available"
    ],
    price: "Emergency rates apply",
    image: "/images/emergency-service.jpg"
  }
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const service = services[resolvedParams.slug as keyof typeof services]
  
  if (!service) {
    return {
      title: "Service Not Found",
    }
  }
  
  return {
    title: `${service.title} | Local Service Company`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Local Service Company`,
      description: service.description,
      url: `${siteConfig.url}/services/${resolvedParams.slug}`,
      type: "website",
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const service = services[resolvedParams.slug as keyof typeof services]
  
  if (!service) {
    notFound()
  }

  // Generate FAQ items based on service features
  const faqItems = [
    {
      question: `What is included in ${service.title}?`,
      answer: `Our ${service.title} includes: ${service.features.slice(0, 3).join(", ")}. Contact us for a complete list of services included.`
    },
    {
      question: `How much does ${service.title} cost?`,
      answer: `${service.title} ${service.price}. We provide detailed quotes after assessing your specific needs.`
    },
    {
      question: `How quickly can you provide ${service.title}?`,
      answer: resolvedParams.slug === "emergency" 
        ? "We offer 24/7 emergency response with arrival times typically under 2 hours."
        : "We typically schedule services within 24-48 hours. Contact us for current availability."
    }
  ]
  
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${resolvedParams.slug}` }
        ]}
      />
      <ServiceSchema
        name={service.title}
        description={service.longDescription}
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
        serviceType="Service"
        areaServed={[siteConfig.address.city, siteConfig.address.state]}
        url={`/services/${resolvedParams.slug}`}
        offers={{
          priceRange: service.price
        }}
      />
      <FAQSchema items={faqItems} />
      <Hero
        title={service.title}
        description={service.description}
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Call Now"
        secondaryButtonHref={`tel:${siteConfig.phone}`}
      />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
              <p className="text-lg text-gray-600 mb-8">{service.longDescription}</p>
              
              <Card className="p-6 mb-8">
                <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                <p className="text-2xl font-bold text-primary">{service.price}</p>
              </Card>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h3>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection
        title="Ready to Get Started?"
        description="Contact us today to schedule your service"
        buttonText="Schedule Service"
        buttonHref="/contact"
        secondaryButtonText="Call Now"
        secondaryButtonHref={`tel:${siteConfig.phone}`}
      />
    </>
  )
}
