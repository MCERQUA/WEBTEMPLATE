import { Hero } from "@/components/sections/Hero"
import { ServiceGrid } from "@/components/sections/ServiceGrid"
import { CTASection } from "@/components/sections/CTASection"
import { siteConfig } from "@/config/site.config"
import { BreadcrumbSchema, MetaTags } from "@/components/seo"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${siteConfig.name} - Professional Local Services`,
  description: "Quality professional services you can trust. Serving the local area since 2010 with reliable residential, commercial, and emergency services.",
  openGraph: {
    title: `${siteConfig.name} - Professional Local Services`,
    description: "Quality professional services you can trust. Serving the local area since 2010 with reliable residential, commercial, and emergency services.",
    url: siteConfig.url,
    type: "website",
  },
}

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" }
        ]}
      />
      <Hero
        title="Professional Local Services You Can Trust"
        subtitle="Quality Service Since 2010"
        description="We provide reliable, professional services to help solve your needs. With years of experience and a commitment to excellence, we're here to help."
        primaryButtonText="Get Free Quote"
        primaryButtonHref="/contact"
        secondaryButtonText="Our Services"
        secondaryButtonHref="/services"
      />
      
      <ServiceGrid />
      
      <CTASection
        title="Ready to Get Started?"
        description="Contact us today for a free consultation and quote."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  )
}