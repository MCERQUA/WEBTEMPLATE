import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/config/site.config"
import { LocalBusinessSchema } from "@/components/seo"
import { getBusinessStructuredData } from "@/lib/utils/structured-data"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading"
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const businessData = getBusinessStructuredData()
  
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <LocalBusinessSchema
          name={businessData.businessName}
          description={businessData.description}
          url={businessData.url}
          telephone={businessData.phone}
          email={businessData.email}
          address={businessData.address}
          geo={businessData.geo}
          logo={businessData.logo}
          image={businessData.image}
          priceRange={businessData.priceRange}
          openingHours={businessData.openingHours}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}