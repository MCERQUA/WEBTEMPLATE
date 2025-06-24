import Link from "next/link"
import { Button } from "@/components/ui/Button"

interface HeroProps {
  title: string
  subtitle?: string
  description: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  backgroundImage?: string
}

export function Hero({
  title,
  subtitle,
  description,
  primaryButtonText = "Get Started",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Learn More",
  secondaryButtonHref = "/services",
  backgroundImage = "/images/hero-bg.jpg"
}: HeroProps) {
  return (
    <section className="relative bg-gray-900 py-32 px-4 sm:px-6 lg:px-8">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className="relative mx-auto max-w-7xl text-center">
        {subtitle && (
          <p className="text-primary-400 text-sm font-semibold tracking-wide uppercase mb-2">
            {subtitle}
          </p>
        )}
        
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          {description}
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href={primaryButtonHref} size="lg">
            {primaryButtonText}
          </Button>
          
          <Button href={secondaryButtonHref} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  )
}