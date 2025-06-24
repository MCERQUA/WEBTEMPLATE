import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Hero } from "@/components/sections/Hero"
import { CTASection } from "@/components/sections/CTASection"
import { Card } from "@/components/ui/Card"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"

// This would typically come from a CMS or database
const blogPosts = {
  "maintenance-tips-homeowners": {
    title: "5 Essential Maintenance Tips for Homeowners",
    excerpt: "Keep your home in top condition with these simple maintenance tips.",
    content: `
      <p>Regular maintenance is key to preserving your home's value and preventing costly repairs. Here are five essential tips every homeowner should follow:</p>
      
      <h2>1. Check Your HVAC Filters Monthly</h2>
      <p>Dirty filters reduce efficiency and can damage your system. Replace them every 1-3 months depending on usage.</p>
      
      <h2>2. Clean Gutters Seasonally</h2>
      <p>Clogged gutters can cause water damage to your roof and foundation. Clean them at least twice a year.</p>
      
      <h2>3. Test Safety Devices</h2>
      <p>Test smoke detectors and carbon monoxide detectors monthly. Replace batteries annually.</p>
      
      <h2>4. Inspect for Water Leaks</h2>
      <p>Check under sinks, around toilets, and near appliances regularly. Early detection prevents major damage.</p>
      
      <h2>5. Maintain Your Landscaping</h2>
      <p>Keep trees and bushes trimmed away from your home. This prevents damage and improves curb appeal.</p>
      
      <p>By following these simple tips, you can avoid many common home problems and keep your property in excellent condition.</p>
    `,
    author: "John Smith",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Maintenance", "Tips", "Homeowners"]
  },
  "choosing-right-service-provider": {
    title: "How to Choose the Right Service Provider",
    excerpt: "Learn what to look for when selecting a professional service provider.",
    content: `
      <p>Choosing the right service provider is crucial for getting quality work at a fair price. Here's what to look for:</p>
      
      <h2>Check Credentials</h2>
      <p>Ensure they're licensed, insured, and bonded. Ask for proof of these credentials before hiring.</p>
      
      <h2>Read Reviews</h2>
      <p>Look for reviews on multiple platforms. Pay attention to how they respond to negative feedback.</p>
      
      <h2>Get Multiple Quotes</h2>
      <p>Compare prices from at least three providers. Be wary of quotes that are significantly lower than others.</p>
      
      <h2>Ask About Guarantees</h2>
      <p>Reputable providers stand behind their work with warranties or satisfaction guarantees.</p>
      
      <h2>Communication Matters</h2>
      <p>Choose someone who communicates clearly and responds promptly to your questions.</p>
    `,
    author: "Jane Doe",
    date: "2024-01-10",
    readTime: "3 min read",
    tags: ["Guide", "Tips"]
  },
  "emergency-preparedness-guide": {
    title: "Emergency Preparedness: What You Need to Know",
    excerpt: "Be prepared for emergencies with our comprehensive guide.",
    content: `
      <p>Emergencies can happen at any time. Being prepared can make all the difference. Here's your guide to emergency preparedness:</p>
      
      <h2>Create an Emergency Kit</h2>
      <p>Include water, non-perishable food, first aid supplies, flashlights, batteries, and important documents.</p>
      
      <h2>Know Your Shut-Offs</h2>
      <p>Learn how to turn off water, gas, and electricity. Label shut-off valves clearly.</p>
      
      <h2>Have a Plan</h2>
      <p>Create evacuation routes and meeting points. Ensure all family members know the plan.</p>
      
      <h2>Keep Important Numbers Handy</h2>
      <p>Save emergency contacts in your phone and keep a written copy in your emergency kit.</p>
      
      <h2>Regular Maintenance Prevents Emergencies</h2>
      <p>Many emergencies can be prevented with regular maintenance and inspections.</p>
    `,
    author: "Mike Johnson",
    date: "2024-01-05",
    readTime: "7 min read",
    tags: ["Emergency", "Guide", "Safety"]
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts]
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  
  return {
    title: `${post.title} | Local Service Company Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts]
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Card className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">Need Professional Help?</h3>
              <p className="text-gray-600 mb-4">
                Our team of experts is ready to assist you with all your service needs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-primary font-medium hover:text-primary-600"
              >
                Get a Free Quote
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Card>
          </div>
        </div>
      </section>
      
      <CTASection
        title="Stay Updated"
        description="Subscribe to our newsletter for more tips and insights."
        buttonText="Subscribe"
        buttonHref="/contact"
      />
    </>
  )
}