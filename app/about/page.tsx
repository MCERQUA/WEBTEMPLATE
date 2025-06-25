import { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { CTASection } from "@/components/sections/CTASection"
import { Card } from "@/components/ui/Card"
import { siteConfig } from "@/config/site.config"
import { BreadcrumbSchema, FAQSchema } from "@/components/seo"

export const metadata: Metadata = {
  title: "About Us | Local Service Company",
  description: "Learn about our company, mission, and the team behind our quality services.",
  openGraph: {
    title: "About Us | Local Service Company",
    description: "Learn about our company, mission, and the team behind our quality services.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
}

const teamMembers = [
  {
    name: "John Smith",
    role: "Founder & CEO",
    bio: "With over 20 years of experience in the industry.",
  },
  {
    name: "Jane Doe",
    role: "Operations Manager",
    bio: "Ensuring smooth operations and customer satisfaction.",
  },
  {
    name: "Mike Johnson",
    role: "Lead Technician",
    bio: "Expert technician with certifications and expertise.",
  },
]

const stats = [
  { label: "Years in Business", value: "10+" },
  { label: "Happy Customers", value: "5,000+" },
  { label: "Projects Completed", value: "15,000+" },
  { label: "Team Members", value: "25+" },
]

export default function AboutPage() {
  const faqItems = [
    {
      question: "How long have you been in business?",
      answer: "We've been proudly serving our community since 2010, with over 10 years of experience in the industry."
    },
    {
      question: "Are your technicians certified?",
      answer: "Yes, all our technicians are fully certified, licensed, and undergo continuous training to stay current with industry standards."
    },
    {
      question: "What makes you different from competitors?",
      answer: "Our commitment to quality, transparent pricing, and exceptional customer service sets us apart. We treat every project as if it were our own."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "Absolutely! We stand behind our work with a comprehensive satisfaction guarantee on all services."
    }
  ]

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" }
        ]}
      />
      <FAQSchema items={faqItems} />
      <Hero
        title="About Our Company"
        description="Dedicated to providing exceptional service since 2010. Learn about our journey, values, and commitment to excellence."
        primaryButtonText="Get in Touch"
        primaryButtonHref="/contact"
        secondaryButtonText="Our Services"
        secondaryButtonHref="/services"
      />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2010, {siteConfig.name} began with a simple mission: to provide reliable, 
                high-quality services to our local community. What started as a small operation has 
                grown into a trusted name in the industry.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We believe in building lasting relationships with our customers through exceptional 
                service, transparent communication, and fair pricing. Our team of experienced 
                professionals is dedicated to exceeding your expectations on every project.
              </p>
              <p className="text-lg text-gray-600">
                Today, we&apos;re proud to serve thousands of satisfied customers across the region,
                maintaining our commitment to quality and customer satisfaction that has been our 
                hallmark since day one.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-primary rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-white/90">We never compromise on the quality of our work.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-white/90">Your satisfaction is our top priority.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-white/90">Honest, transparent service you can trust.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection
        title="Ready to Experience the Difference?"
        description="Join thousands of satisfied customers who trust us with their needs."
        buttonText="Contact Us Today"
        buttonHref="/contact"
      />
    </>
  )
}
