import { Button } from "@/components/ui/Button"

interface CTASectionProps {
  title: string
  description?: string
  buttonText: string
  buttonHref: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  bgColor?: string
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
  bgColor = "bg-primary"
}: CTASectionProps) {
  return (
    <section className={`${bgColor} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        
        {description && (
          <p className="mt-4 text-lg text-white/90">
            {description}
          </p>
        )}
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={buttonHref}
            variant="primary"
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
          >
            {buttonText}
          </Button>
          
          {secondaryButtonText && secondaryButtonHref && (
            <Button
              href={secondaryButtonHref}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}