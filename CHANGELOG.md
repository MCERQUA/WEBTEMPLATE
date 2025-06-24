# Changelog

All notable changes to this template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-24

### Added
- Initial release of the Next.js 15 Service Business Template
- TypeScript support throughout the project
- Tailwind CSS v3 with custom color configuration
- Component-based architecture with modular design
- MDX content management for services and blog posts
- Netlify Forms integration in ContactForm component
- SEO optimization with structured data support
- Responsive mobile-first design
- Business-specific components:
  - ContactForm with validation
  - BusinessHours display
  - EmergencyBanner
  - ServiceAreaChecker and ServiceAreaMap
  - TestimonialCard
  - BeforeAfterGallery
  - TeamMember profiles
- Configuration system for easy customization
- Image optimization with Sharp
- Sitemap generation with next-sitemap
- ESLint and Prettier configuration

### Security
- Added security headers in netlify.toml
- Form validation and honeypot spam protection
- XSS protection headers

### Documentation
- Comprehensive README.md
- CLAUDE.md for AI-assisted development
- Component documentation in business components folder

## [Unreleased]

### To Do
- Add testing infrastructure (Jest/React Testing Library)
- Create placeholder images in /public/images/
- Add deployment guides for Vercel and AWS
- Implement backend form submission handling
- Add more animation examples with Framer Motion
