import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { ArrowRight } from "lucide-react"

const services = [
  {
    id: "1",
    title: "Residential Services",
    description: "Complete solutions for your home needs. Professional, reliable, and affordable.",
    href: "/services/residential",
    icon: "🏠",
    features: ["24/7 Support", "Licensed & Insured", "Free Estimates"]
  },
  {
    id: "2", 
    title: "Commercial Services",
    description: "Keep your business running smoothly with our commercial service solutions.",
    href: "/services/commercial",
    icon: "🏢",
    features: ["Custom Plans", "Priority Service", "Bulk Discounts"]
  },
  {
    id: "3",
    title: "Emergency Services",
    description: "Available 24/7 for urgent needs. Fast response times when you need us most.",
    href: "/services/emergency",
    icon: "🚨",
    features: ["24/7 Availability", "Rapid Response", "Emergency Rates"]
  }
]

export function ServiceGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary font-medium group-hover:text-primary-600"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-lg font-medium text-primary hover:text-primary-600"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}