"use client"

import React, { useCallback, useState } from 'react'
import { Phone, PhoneCall } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface ClickToCallProps {
  phoneNumber: string
  displayText?: string
  variant?: 'button' | 'link' | 'icon' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  trackingLabel?: string
  showIcon?: boolean
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
  onCall?: () => void
}

export function ClickToCall({
  phoneNumber,
  displayText,
  variant = 'button',
  size = 'md',
  className,
  trackingLabel = 'click_to_call',
  showIcon = true,
  iconPosition = 'left',
  ariaLabel,
  onCall,
}: ClickToCallProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Format phone number for display if no display text provided
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  }
  
  const displayPhoneText = displayText || formatPhoneNumber(phoneNumber)
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
  const telLink = `tel:${cleanPhoneNumber}`
  
  const handleClick = useCallback(() => {
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', trackingLabel, {
        event_category: 'engagement',
        event_label: phoneNumber,
      })
    }
    
    onCall?.()
  }, [trackingLabel, phoneNumber, onCall])
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }
  
  const Icon = isHovered ? PhoneCall : Phone
  const iconElement = showIcon && (
    <Icon className={cn(iconSizes[size], 'flex-shrink-0')} aria-hidden="true" />
  )
  
  if (variant === 'floating') {
    return (
      <a
        href={telLink}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'bg-primary-500 text-white rounded-full shadow-lg',
          'hover:bg-primary-600 hover:scale-110',
          'transition-all duration-300 ease-in-out',
          'focus:outline-none focus:ring-4 focus:ring-primary-500/50',
          size === 'sm' && 'p-3',
          size === 'md' && 'p-4',
          size === 'lg' && 'p-5',
          className
        )}
        aria-label={ariaLabel || `Call ${displayPhoneText}`}
      >
        <PhoneCall className={cn(iconSizes[size], 'animate-pulse')} aria-hidden="true" />
      </a>
    )
  }
  
  if (variant === 'icon') {
    return (
      <a
        href={telLink}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'inline-flex items-center justify-center',
          'text-primary-500 hover:text-primary-600',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded',
          size === 'sm' && 'p-1',
          size === 'md' && 'p-2',
          size === 'lg' && 'p-3',
          className
        )}
        aria-label={ariaLabel || `Call ${displayPhoneText}`}
      >
        {iconElement}
      </a>
    )
  }
  
  if (variant === 'link') {
    return (
      <a
        href={telLink}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'inline-flex items-center gap-2',
          'text-primary-500 hover:text-primary-600 hover:underline',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
          className
        )}
        aria-label={ariaLabel || `Call ${displayPhoneText}`}
      >
        {iconPosition === 'left' && iconElement}
        <span>{displayPhoneText}</span>
        {iconPosition === 'right' && iconElement}
      </a>
    )
  }
  
  // Default button variant
  const buttonSizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <a
      href={telLink}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-medium rounded-md',
        'bg-primary-500 text-white',
        'hover:bg-primary-600 hover:shadow-md',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        'active:scale-95',
        buttonSizes[size],
        className
      )}
      aria-label={ariaLabel || `Call ${displayPhoneText}`}
    >
      {iconPosition === 'left' && iconElement}
      <span>{displayPhoneText}</span>
      {iconPosition === 'right' && iconElement}
    </a>
  )
}