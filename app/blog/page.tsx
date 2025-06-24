import { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/sections/Hero"
import { Card } from "@/components/ui/Card"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { BreadcrumbSchema } from "@/components/seo"
import { siteConfig } from "@/config/site.config"

export const metadata: Metadata = {
  title: "Blog | Local Service Company",
  description: "Tips, insights, and updates from our team of experts.",
  openGraph: {
    title: "Blog | Local Service Company",
    description: "Tips, insights, and updates from our team of experts.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
}

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: "1",
    slug: "maintenance-tips-homeowners",
    title: "5 Essential Maintenance Tips for Homeowners",
    excerpt: "Keep your home in top condition with these simple maintenance tips that can save you money in the long run.",
    author: "John Smith",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/images/blog-1.jpg",
    tags: ["Maintenance", "Tips", "Homeowners"]
  },
  {
    id: "2",
    slug: "choosing-right-service-provider",
    title: "How to Choose the Right Service Provider",
    excerpt: "Learn what to look for when selecting a professional service provider for your home or business needs.",
    author: "Jane Doe",
    date: "2024-01-10",
    readTime: "3 min read",
    image: "/images/blog-2.jpg",
    tags: ["Guide", "Tips"]
  },
  {
    id: "3",
    slug: "emergency-preparedness-guide",
    title: "Emergency Preparedness: What You Need to Know",
    excerpt: "Be prepared for emergencies with our comprehensive guide to handling unexpected situations.",
    author: "Mike Johnson",
    date: "2024-01-05",
    readTime: "7 min read",
    image: "/images/blog-3.jpg",
    tags: ["Emergency", "Guide", "Safety"]
  }
]

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" }
        ]}
      />
      <Hero
        title="Our Blog"
        description="Stay informed with tips, insights, and industry updates from our team of experts."
        primaryButtonText="Subscribe"
        primaryButtonHref="/contact"
        secondaryButtonText="Categories"
        secondaryButtonHref="#categories"
      />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Image placeholder */}
                  <div className="w-full h-48 bg-gray-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary-600"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Want to see more articles?</p>
            <Link
              href="/contact"
              className="inline-flex items-center text-primary font-medium hover:text-primary-600"
            >
              Subscribe to our newsletter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}