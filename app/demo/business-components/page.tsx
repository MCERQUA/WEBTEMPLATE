'use client'

import { useState } from 'react'
import {
  BusinessHours,
  EmergencyBanner,
  ServiceAreaMap,
  TestimonialCard,
  BeforeAfterGallery,
  TeamMember,
  type DayHours,
  type ServiceArea,
  type Testimonial,
  type BeforeAfterImage,
  type TeamMemberProps,
} from '@/components/business'

// Sample data
const businessHours: DayHours[] = [
  { day: 'Monday', open: '08:00', close: '18:00' },
  { day: 'Tuesday', open: '08:00', close: '18:00' },
  { day: 'Wednesday', open: '08:00', close: '18:00' },
  { day: 'Thursday', open: '08:00', close: '18:00' },
  { day: 'Friday', open: '08:00', close: '17:00' },
  { day: 'Saturday', open: '09:00', close: '14:00' },
  { day: 'Sunday', open: '00:00', close: '00:00', closed: true },
]

const serviceAreas: ServiceArea[] = [
  {
    name: 'Downtown',
    coordinates: { lat: 40.7128, lng: -74.006 },
    radius: 5,
    color: '#3b82f6',
    description: 'Same-day service available',
  },
  {
    name: 'Suburbs',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    radius: 10,
    color: '#10b981',
    description: 'Next-day service',
  },
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Homeowner',
    content: 'Excellent service! They fixed our plumbing issue quickly and professionally. Highly recommend!',
    rating: 5,
    date: '2024-01-15',
    location: 'Downtown, NY',
    image: { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', alt: 'John Smith' },
    verified: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'Professional team that knows their stuff. Fixed our commercial HVAC system with minimal downtime.',
    rating: 5,
    date: '2024-02-20',
    location: 'Brooklyn, NY',
    service: 'HVAC Repair',
  },
]

const beforeAfterImages: BeforeAfterImage[] = [
  {
    id: '1',
    beforeImage: {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      alt: 'Kitchen before renovation',
    },
    afterImage: {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      alt: 'Kitchen after renovation',
    },
    title: 'Kitchen Renovation',
    description: 'Complete kitchen remodel with new cabinets, countertops, and appliances',
    projectDate: 'January 2024',
    projectType: 'Residential',
  },
  {
    id: '2',
    beforeImage: {
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      alt: 'Bathroom before renovation',
    },
    afterImage: {
      src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      alt: 'Bathroom after renovation',
    },
    title: 'Bathroom Remodel',
    description: 'Modern bathroom upgrade with new fixtures and tiling',
    projectDate: 'February 2024',
    projectType: 'Residential',
  },
]

const teamMembers: TeamMemberProps[] = [
  {
    name: 'Michael Chen',
    role: 'Master Plumber',
    image: { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    bio: 'With over 15 years of experience in residential and commercial plumbing, Michael leads our team with expertise and dedication to quality service.',
    email: 'michael@example.com',
    phone: '(555) 123-4567',
    experience: 15,
    specializations: ['Emergency Repairs', 'Water Heater Installation', 'Pipe Replacement'],
    certifications: [
      { name: 'Master Plumber License', issuer: 'State Board', year: '2010' },
      { name: 'Backflow Prevention Certification', year: '2022' },
    ],
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
    isFeatured: true,
  },
  {
    name: 'Jessica Martinez',
    role: 'HVAC Specialist',
    bio: 'Certified HVAC technician specializing in energy-efficient systems and smart home integration.',
    email: 'jessica@example.com',
    experience: 8,
    specializations: ['AC Installation', 'Heating Systems', 'Energy Efficiency'],
  },
]

export default function BusinessComponentsDemo() {
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(true)
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Banner */}
      {showEmergencyBanner && (
        <EmergencyBanner
          title="24/7 Emergency Service Available"
          description="Water leak? No heat? We're here to help!"
          phoneNumber="(555) 911-HELP"
          variant="urgent"
          position="top"
          onDismiss={() => setShowEmergencyBanner(false)}
        />
      )}

      <div className="container mx-auto px-4 py-8 space-y-16">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-4xl font-bold">Business Components Demo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcase of business-specific components for local service websites
          </p>
        </div>

        {/* Business Hours */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Business Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Full Display</h3>
              <BusinessHours
                hours={businessHours}
                timezone="America/New_York"
                showStatus={true}
                highlightToday={true}
                className="max-w-md"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Compact Display</h3>
              <BusinessHours
                hours={businessHours}
                timezone="America/New_York"
                showStatus={true}
                compact={true}
                className="max-w-md"
              />
            </div>
          </div>
        </section>

        {/* Service Area Map */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Service Area Map</h2>
          <ServiceAreaMap
            areas={serviceAreas}
            center={{ lat: 40.7128, lng: -74.006 }}
            zoom={11}
            height="400px"
            showLegend={true}
            onAreaClick={(area) => setSelectedArea(area)}
          />
          {selectedArea && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Selected: {selectedArea.name}</p>
              <p className="text-sm text-muted-foreground">{selectedArea.description}</p>
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Testimonial Cards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant="card"
                showRating={true}
              />
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Inline Variant</h3>
            <TestimonialCard
              testimonial={testimonials[0]}
              variant="inline"
              showRating={true}
            />
          </div>
        </section>

        {/* Before/After Gallery */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Before/After Gallery</h2>
          <BeforeAfterGallery
            images={beforeAfterImages}
            showThumbnails={true}
            showDetails={true}
            enableLightbox={true}
          />
        </section>

        {/* Team Members */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Team Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                {...member}
                showContact={true}
              />
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Compact Layout</h3>
            <div className="grid gap-4 max-w-2xl">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  {...member}
                  compact={true}
                  showContact={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Banner Toggle */}
        <section className="space-y-4 pb-16">
          <h2 className="text-2xl font-semibold">Emergency Banner Control</h2>
          <button
            onClick={() => setShowEmergencyBanner(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Show Emergency Banner
          </button>
        </section>
      </div>
    </div>
  )
}