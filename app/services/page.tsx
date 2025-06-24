import { Metadata } from "next"
import { ServiceGrid } from "@/components/sections/ServiceGrid"
import { Hero } from "@/components/sections/Hero"
import { CTASection } from "@/components/sections/CTASection"

export const metadata: Metadata = {
  title: "Our Services | Local Service Company",
  description: "Explore our range of professional services for residential and commercial needs.",
}

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Professional Services"
        description="We offer a comprehensive range of services to meet all your needs. Quality, reliability, and customer satisfaction guaranteed."
        primaryButtonText="Get Quote"
        primaryButtonHref="/contact"
        secondaryButtonText="Call Us"
        secondaryButtonHref="tel:5551234567"
      />
      
      <ServiceGrid />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Experienced Professionals</h3>
                <p className="text-gray-600">Our team has over 10 years of experience in the industry.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">We stand behind our work with a satisfaction guarantee.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">Fair, transparent pricing with no hidden fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection
        title="Need a Custom Solution?"
        description="Contact us to discuss your specific requirements."
        buttonText="Get Custom Quote"
        buttonHref="/contact"
      />
    </>
  )
}