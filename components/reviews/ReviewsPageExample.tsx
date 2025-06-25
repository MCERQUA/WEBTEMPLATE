import React from 'react';
import { ReviewGrid } from './ReviewGrid';
import { ReviewCarousel } from './ReviewCarousel';
import { Review } from './ReviewCard';
import { getFeaturedReviews, generateAggregateRatingSchema } from './utils';
import Head from 'next/head';
import Link from 'next/link';

// Example reviews data - in production, this would come from a database or CMS
const sampleReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    date: new Date('2024-01-15'),
    content: 'Absolutely fantastic service! The team went above and beyond to ensure everything was perfect. They were professional, punctual, and the quality of work exceeded my expectations.',
    source: 'Google',
    verified: true,
    helpful: 42,
    service: 'Home Renovation',
    businessResponse: {
      content: 'Thank you so much for your kind words, Sarah! We\'re thrilled to hear you\'re happy with your home renovation.',
      date: new Date('2024-01-16')
    }
  },
  {
    id: '2',
    author: 'Michael Chen',
    rating: 5,
    date: new Date('2024-01-10'),
    content: 'I\'ve used many services in the area, but this company stands out. Their attention to detail is remarkable.',
    source: 'Yelp',
    verified: true,
    helpful: 38,
    service: 'Kitchen Remodeling'
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    rating: 4.5,
    date: new Date('2024-01-05'),
    content: 'Great experience overall. The team was knowledgeable and kept me informed throughout the process.',
    source: 'Facebook',
    verified: true,
    helpful: 25,
    service: 'Bathroom Renovation'
  },
  // Add more reviews as needed
];

interface ReviewsPageExampleProps {
  businessName?: string;
}

export const ReviewsPageExample: React.FC<ReviewsPageExampleProps> = ({
  businessName = 'Your Business Name'
}) => {
  const featuredReviews = getFeaturedReviews(sampleReviews, 3);
  const schemaData = generateAggregateRatingSchema(sampleReviews, businessName);

  return (
    <>
      <Head>
        <title>Customer Reviews & Testimonials | {businessName}</title>
        <meta 
          name="description" 
          content={`Read real customer reviews and testimonials for ${businessName}. See why our customers rate us 4.8/5 stars.`}
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-600 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Customer Reviews & Testimonials
              </h1>
              <p className="text-xl opacity-90">
                See what our customers have to say about their experience with us
              </p>
            </div>
          </div>
        </section>

        {/* Featured Reviews Carousel */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ReviewCarousel 
              reviews={featuredReviews}
              autoPlay={true}
              className="mb-16"
            />
          </div>
        </section>

        {/* All Reviews Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ReviewGrid 
              reviews={sampleReviews}
              showSummary={true}
              itemsPerPage={9}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Experience Our Service?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Join hundreds of satisfied customers who trust us with their projects
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
