'use client'

import { BreadcrumbSchema, FAQSchema } from "@/components/seo"
import { siteConfig } from "@/config/site.config"

export function ContactStructuredData() {
  const faqItems = [
    {
      question: "What are your business hours?",
      answer: `We're open Monday-Friday ${siteConfig.businessHours.monday}, Saturday ${siteConfig.businessHours.saturday}. We're closed on Sundays.`
    },
    {
      question: "How can I get a free quote?",
      answer: "You can get a free quote by filling out our contact form, calling us directly, or emailing us. We typically respond within 24 hours."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we offer 24/7 emergency services. Call our emergency hotline for immediate assistance."
    },
    {
      question: "What areas do you service?",
      answer: `We service ${siteConfig.address.city} and surrounding areas within a 50-mile radius. Contact us to confirm service availability in your area.`
    }
  ]

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" }
        ]}
      />
      <FAQSchema items={faqItems} />
    </>
  )
}