# Business Components

This directory contains business-specific components designed for local service businesses like plumbers, electricians, HVAC contractors, landscapers, and more.

## Components

### BusinessHours
Displays business operating hours with real-time open/closed status.

```tsx
import { BusinessHours } from '@/components/business'

const hours = [
  { day: 'Monday', open: '08:00', close: '18:00' },
  { day: 'Sunday', open: '00:00', close: '00:00', closed: true },
]

<BusinessHours
  hours={hours}
  timezone="America/New_York"
  showStatus={true}
  highlightToday={true}
/>
```

### EmergencyBanner
Prominent banner for advertising emergency services.

```tsx
import { EmergencyBanner } from '@/components/business'

<EmergencyBanner
  title="24/7 Emergency Service"
  description="We're here when you need us most"
  phoneNumber="(555) 911-HELP"
  variant="urgent"
/>
```

### ServiceAreaMap
Interactive map showing service coverage areas.

```tsx
import { ServiceAreaMap } from '@/components/business'

const areas = [
  {
    name: 'Downtown',
    coordinates: { lat: 40.7128, lng: -74.006 },
    radius: 5,
    color: '#3b82f6',
  }
]

<ServiceAreaMap
  areas={areas}
  center={{ lat: 40.7128, lng: -74.006 }}
  zoom={11}
/>
```

### TestimonialCard
Display customer testimonials with ratings and verification.

```tsx
import { TestimonialCard } from '@/components/business'

const testimonial = {
  id: '1',
  name: 'John Doe',
  content: 'Great service!',
  rating: 5,
  verified: true,
}

<TestimonialCard
  testimonial={testimonial}
  variant="card"
  showRating={true}
/>
```

### BeforeAfterGallery
Interactive gallery for showcasing before/after project photos.

```tsx
import { BeforeAfterGallery } from '@/components/business'

const images = [
  {
    id: '1',
    beforeImage: { src: '/before.jpg', alt: 'Before' },
    afterImage: { src: '/after.jpg', alt: 'After' },
    title: 'Kitchen Renovation',
  }
]

<BeforeAfterGallery
  images={images}
  showThumbnails={true}
  enableLightbox={true}
/>
```

### TeamMember
Team member profile cards with contact info and certifications.

```tsx
import { TeamMember } from '@/components/business'

<TeamMember
  name="John Smith"
  role="Master Plumber"
  email="john@example.com"
  experience={15}
  certifications={[
    { name: 'Master Plumber License', year: '2010' }
  ]}
  isFeatured={true}
/>
```

## Features

- **TypeScript Support**: Full type safety with exported interfaces
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Loading States**: Built-in loading skeletons for async data
- **Error Handling**: Graceful error states with fallback UI
- **Customizable**: Extensive props for customization
- **Performance**: Optimized with React hooks and Next.js Image component

## Demo

View all components in action at `/demo/business-components`