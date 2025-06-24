export interface Service {
  id: string
  slug: string
  title: string
  description: string
  excerpt: string
  price?: string
  duration?: string
  features: string[]
  image: string
  gallery?: string[]
  faqs?: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}