import { Metadata } from "next"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Contact Us | Local Service Company",
  description: "Get in touch with us for a free consultation and quote. Call us at " + siteConfig.phone + " or visit our office.",
  openGraph: {
    title: "Contact Us | Local Service Company",
    description: "Get in touch with us for a free consultation and quote. Call us at " + siteConfig.phone + " or visit our office.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
}