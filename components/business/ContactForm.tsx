"use client"

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from './FormField'
import { TextAreaField } from './TextAreaField'
import { SelectField, SelectOption } from './SelectField'
import { cn } from '@/lib/utils/cn'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  preferredContact?: string
  preferredTime?: string
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
  onSuccess?: () => void
  onError?: (error: Error) => void
  className?: string
  serviceOptions?: SelectOption[]
  showPreferredContact?: boolean
  showPreferredTime?: boolean
  analyticsEvent?: string
}

const defaultServiceOptions: SelectOption[] = [
  { value: 'residential', label: 'Residential Services' },
  { value: 'commercial', label: 'Commercial Services' },
  { value: 'emergency', label: 'Emergency Services' },
  { value: 'consultation', label: 'Free Consultation' },
  { value: 'other', label: 'Other' },
]

const contactMethodOptions: SelectOption[] = [
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'text', label: 'Text Message' },
]

const timeOptions: SelectOption[] = [
  { value: 'morning', label: 'Morning (8am - 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
  { value: 'evening', label: 'Evening (5pm - 8pm)' },
  { value: 'anytime', label: 'Anytime' },
]

export function ContactForm({
  onSubmit,
  onSuccess,
  onError,
  className,
  serviceOptions = defaultServiceOptions,
  showPreferredContact = true,
  showPreferredTime = true,
  analyticsEvent = 'contact_form_submit',
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredContact: '',
    preferredTime: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const validateField = useCallback((name: keyof ContactFormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return ''
      case 'phone':
        if (value && !/^[\d\s\-\(\)\+]+$/.test(value)) {
          return 'Please enter a valid phone number'
        }
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        return ''
      default:
        return ''
    }
  }, [])

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Reset submit status when user modifies form
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }, [errors, submitStatus])

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const error = validateField(name as keyof ContactFormData, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [validateField])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    
    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'message']
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    
    // Validate optional phone field if provided
    if (formData.phone) {
      const phoneError = validateField('phone', formData.phone)
      if (phoneError) newErrors.phone = phoneError
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(`field-${firstErrorField}`)
      element?.focus()
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', analyticsEvent, {
          service_type: formData.service,
          has_phone: !!formData.phone,
        })
      }
      
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      setSubmitStatus('success')
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.')
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        preferredContact: '',
        preferredTime: '',
      })
      
      onSubmit?.(formData)
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error submitting your form. Please try again or call us directly.')
      onError?.(error as Error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />
      
      {/* Honeypot field for spam protection */}
      <div className="hidden">
        <label>
          Don't fill this out if you're human: 
          <input name="bot-field" />
        </label>
      </div>
      
      {/* Success/Error Messages */}
      {submitStatus !== 'idle' && (
        <div
          className={cn(
            'p-4 rounded-md flex items-start gap-3',
            submitStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          )}
          role="alert"
          aria-live="polite"
        >
          {submitStatus === 'success' ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm">{submitMessage}</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
          autoComplete="name"
          placeholder="John Smith"
        />
        
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
          autoComplete="email"
          placeholder="john@example.com"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          autoComplete="tel"
          placeholder="(555) 123-4567"
        />
        
        <SelectField
          label="Service Needed"
          name="service"
          value={formData.service}
          onChange={handleChange}
          options={serviceOptions}
          error={errors.service}
          placeholder="Select a service"
        />
      </div>
      
      {(showPreferredContact || showPreferredTime) && (
        <div className="grid md:grid-cols-2 gap-6">
          {showPreferredContact && (
            <SelectField
              label="Preferred Contact Method"
              name="preferredContact"
              value={formData.preferredContact || ''}
              onChange={handleChange}
              options={contactMethodOptions}
              placeholder="How should we contact you?"
            />
          )}
          
          {showPreferredTime && (
            <SelectField
              label="Best Time to Contact"
              name="preferredTime"
              value={formData.preferredTime || ''}
              onChange={handleChange}
              options={timeOptions}
              placeholder="When should we call?"
            />
          )}
        </div>
      )}
      
      <TextAreaField
        label="How Can We Help?"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        required
        rows={5}
        maxLength={1000}
        placeholder="Please describe your project or service needs..."
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || submitStatus === 'success'}
          className="w-full sm:w-auto min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
        
        <p className="text-sm text-gray-500">
          We typically respond within 24 hours
        </p>
      </div>
    </form>
  )
}