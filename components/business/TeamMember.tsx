import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { 
  Mail, 
  Phone, 
  Award, 
  Calendar, 
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Globe,
  BriefcaseIcon,
  Star,
  Shield,
  Clock
} from 'lucide-react'

export interface TeamMemberSocial {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'website'
  url: string
}

export interface TeamMemberCertification {
  name: string
  issuer?: string
  year?: string
  icon?: React.ReactNode
}

export interface TeamMemberProps {
  /** Team member's full name */
  name: string
  /** Job title or role */
  role: string
  /** Profile image */
  image?: {
    src: string
    alt?: string
  }
  /** Short bio or description */
  bio?: string
  /** Email address */
  email?: string
  /** Phone number */
  phone?: string
  /** Years of experience */
  experience?: number
  /** Service areas or locations */
  serviceAreas?: string[]
  /** Specializations */
  specializations?: string[]
  /** Certifications and licenses */
  certifications?: TeamMemberCertification[]
  /** Social media links */
  social?: TeamMemberSocial[]
  /** Whether this is a featured team member */
  isFeatured?: boolean
  /** Show contact information */
  showContact?: boolean
  /** Compact layout */
  compact?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Additional CSS classes */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Custom link for profile */
  profileUrl?: string
}

const socialIcons: Record<TeamMemberSocial['platform'], React.ReactNode> = {
  linkedin: <Linkedin className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  website: <Globe className="w-4 h-4" />,
}

export function TeamMember({
  name,
  role,
  image,
  bio,
  email,
  phone,
  experience,
  serviceAreas,
  specializations,
  certifications,
  social,
  isFeatured = false,
  showContact = true,
  compact = false,
  isLoading = false,
  className,
  onClick,
  profileUrl,
}: TeamMemberProps) {
  const [imageError, setImageError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  if (isLoading) {
    return (
      <div className={cn('bg-card rounded-lg overflow-hidden', className)}>
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-muted animate-pulse rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-muted animate-pulse rounded w-32" />
              <div className="h-4 bg-muted animate-pulse rounded w-24" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-muted animate-pulse rounded" />
            <div className="h-3 bg-muted animate-pulse rounded w-4/5" />
          </div>
        </div>
      </div>
    )
  }

  const CardWrapper = profileUrl ? Link : 'div'
  const cardProps = profileUrl ? { href: profileUrl } : onClick ? { onClick, role: 'button', tabIndex: 0 } : {}

  if (compact) {
    return (
      <CardWrapper
        {...cardProps}
        className={cn(
          'group bg-card rounded-lg overflow-hidden transition-all hover:shadow-md',
          (profileUrl || onClick) && 'cursor-pointer',
          isFeatured && 'ring-2 ring-primary ring-offset-2',
          className
        )}
      >
        <div className="p-4 flex items-center gap-4">
          {/* Avatar */}
          {image && !imageError ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={image.src}
                alt={image.alt || name}
                fill
                className="object-cover"
                sizes="64px"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-semibold text-muted-foreground">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{role}</p>
            {experience && (
              <p className="text-xs text-muted-foreground mt-1">
                {experience} years experience
              </p>
            )}
          </div>

          {/* Quick actions */}
          {showContact && (email || phone) && (
            <div className="flex gap-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={`Email ${name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={`Call ${name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </CardWrapper>
    )
  }

  return (
    <CardWrapper
      {...cardProps}
      className={cn(
        'group bg-card rounded-lg overflow-hidden transition-all hover:shadow-lg',
        (profileUrl || onClick) && 'cursor-pointer',
        isFeatured && 'ring-2 ring-primary ring-offset-2',
        className
      )}
    >
      {/* Header with image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
        
        {/* Profile image */}
        <div className="absolute -bottom-12 left-6">
          {image && !imageError ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-background">
              <Image
                src={image.src}
                alt={image.alt || name}
                fill
                className="object-cover"
                sizes="96px"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted ring-4 ring-background flex items-center justify-center">
              <span className="text-2xl font-semibold text-muted-foreground">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 p-6 space-y-4">
        {/* Name and role */}
        <div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground">{role}</p>
        </div>

        {/* Bio */}
        {bio && (
          <div>
            <p className={cn(
              'text-sm text-muted-foreground',
              !isExpanded && 'line-clamp-3'
            )}>
              {bio}
            </p>
            {bio.length > 150 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsExpanded(!isExpanded)
                }}
                className="text-sm text-primary hover:underline mt-1"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm">
          {experience && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{experience} years experience</span>
            </div>
          )}
          {certifications && certifications.length > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span>{certifications.length} certifications</span>
            </div>
          )}
          {serviceAreas && serviceAreas.length > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{serviceAreas.length} areas</span>
            </div>
          )}
        </div>

        {/* Specializations */}
        {specializations && specializations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <BriefcaseIcon className="w-4 h-4" />
              Specializations
            </h4>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Certifications
            </h4>
            <div className="space-y-1">
              {certifications.slice(0, 3).map((cert, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {cert.icon || <Award className="w-3 h-3" />}
                  <span>{cert.name}</span>
                  {cert.year && <span className="text-xs">({cert.year})</span>}
                </div>
              ))}
              {certifications.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{certifications.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact and social */}
        <div className="pt-4 border-t space-y-3">
          {/* Contact info */}
          {showContact && (email || phone) && (
            <div className="flex flex-wrap gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{email}</span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </a>
              )}
            </div>
          )}

          {/* Social links */}
          {social && social.length > 0 && (
            <div className="flex gap-2">
              {social.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={`${name}'s ${link.platform} profile`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {socialIcons[link.platform]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  )
}