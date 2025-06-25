"use client"

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from './FormField'
import { TextAreaField } from './TextAreaField'
import { SelectField, SelectOption } from './SelectField'
import { cn } from '@/lib/utils/cn'
import { CheckCircle, AlertCircle, Loader2, Calendar, MapPin, DollarSign, Camera } from 'lucide-react'

export interface QuoteRequestData {
  // Contact Information
  name: string
  email: string
  phone: string
  company?: string
  
  // Project Details
  service: string
  projectType: string
  urgency: string
  budget: string
  
  // Location
  address: string
  city: string
  state: string
  zipCode: string
  
  // Additional Details
  startDate?: string
  description: string
  preferredContact?: string
  hearAbout?: string
  
  // File upload placeholder
  photos?: string
}

export interface QuoteRequestFormProps {
  onSubmit?: (data: QuoteRequestData) => void
  onSuccess?: () => void
  onError?: (error: Error) => void
  className?: string
  serviceOptions?: SelectOption[]
  showCompanyField?: boolean
  analyticsEvent?: string
}

const defaultServiceOptions: SelectOption[] = [
  { value: 'residential', label: 'Residential Services' },
  { value: 'commercial', label: 'Commercial Services' },
  { value: 'emergency', label: 'Emergency Services' },
  { value: 'maintenance', label: 'Regular Maintenance' },
  { value: 'installation', label: 'New Installation' },
  { value: 'repair', label: 'Repair Service' },
  { value: 'other', label: 'Other' },
]

const projectTypeOptions: SelectOption[] = [
  { value: 'new_installation', label: 'New Installation' },
  { value: 'replacement', label: 'Replacement' },
  { value: 'repair', label: 'Repair' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'inspection', label: 'Inspection' },
  { value: 'other', label: 'Other' },
]

const urgencyOptions: SelectOption[] = [
  { value: 'emergency', label: 'Emergency - ASAP' },
  { value: '24_hours', label: 'Within 24 hours' },
  { value: 'this_week', label: 'This week' },
  { value: 'next_week', label: 'Next week' },
  { value: 'flexible', label: 'Flexible timing' },
]

const budgetOptions: SelectOption[] = [
  { value: 'under_500', label: 'Under $500' },
  { value: '500_1000', label: '$500 - $1,000' },
  { value: '1000_2500', label: '$1,000 - $2,500' },
  { value: '2500_5000', label: '$2,500 - $5,000' },
  { value: '5000_10000', label: '$5,000 - $10,000' },
  { value: 'over_10000', label: 'Over $10,000' },
  { value: 'not_sure', label: 'Not sure yet' },
]

const hearAboutOptions: SelectOption[] = [
  { value: 'google', label: 'Google Search' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'referral', label: 'Friend/Family Referral' },
  { value: 'repeat', label: 'Previous Customer' },
  { value: 'other', label: 'Other' },
]

const stateOptions: SelectOption[] = [
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  // Add more states as needed
]

export function QuoteRequestForm({
  onSubmit,
  onSuccess,
  onError,
  className,
  serviceOptions = defaultServiceOptions,
  showCompanyField = true,
  analyticsEvent = 'quote_request_submit',
}: QuoteRequestFormProps) {
  const [formData, setFormData] = useState<QuoteRequestData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    projectType: '',
    urgency: '',
    budget: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    startDate: '',
    description: '',
    preferredContact: '',
    hearAbout: '',
    photos: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteRequestData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const validateField = useCallback((name: keyof QuoteRequestData, value: string): string => {
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
        if (!value.trim()) return 'Phone number is required'
        if (!/^[\d\s\-\(\)\+]+$/.test(value)) return 'Please enter a valid phone number'
        return ''
      case 'service':
        if (!value) return 'Please select a service'
        return ''
      case 'projectType':
        if (!value) return 'Please select a project type'
        return ''
      case 'urgency':
        if (!value) return 'Please select urgency level'
        return ''
      case 'budget':
        if (!value) return 'Please select a budget range'
        return ''
      case 'address':
        if (!value.trim()) return 'Street address is required'
        return ''
      case 'city':
        if (!value.trim()) return 'City is required'
        return ''
      case 'state':
        if (!value) return 'State is required'
        return ''
      case 'zipCode':
        if (!value.trim()) return 'ZIP code is required'
        if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Please enter a valid ZIP code'
        return ''
      case 'description':
        if (!value.trim()) return 'Project description is required'
        if (value.trim().length < 20) return 'Please provide more details (at least 20 characters)'
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
    if (errors[name as keyof QuoteRequestData]) {
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
    const error = validateField(name as keyof QuoteRequestData, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [validateField])

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Partial<Record<keyof QuoteRequestData, string>> = {}
    let fieldsToValidate: (keyof QuoteRequestData)[] = []
    
    switch (step) {
      case 1:
        fieldsToValidate = ['name', 'email', 'phone']
        break
      case 2:
        fieldsToValidate = ['service', 'projectType', 'urgency', 'budget']
        break
      case 3:
        fieldsToValidate = ['address', 'city', 'state', 'zipCode', 'description']
        break
    }
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    
    setErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }, [currentStep, validateStep])

  const handlePrevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateStep(3)) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', analyticsEvent, {
          service_type: formData.service,
          project_type: formData.projectType,
          urgency: formData.urgency,
          budget_range: formData.budget,
        })
      }
      
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'quote-request',
          ...formData,
        }).toString(),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      setSubmitStatus('success')
      setSubmitMessage('Thank you for your quote request! We&apos;ll review your project details and get back to you within 24 hours with a detailed estimate.')
      
      onSubmit?.(formData)
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error submitting your request. Please try again or call us directly.')
      onError?.(error as Error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepTitles = ['Contact Info', 'Project Details', 'Location & Description']

  return (
    <form
      name="quote-request"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      <input type="hidden" name="form-name" value="quote-request" />
      
      {/* Honeypot field for spam protection */}
      <div className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: 
          <input name="bot-field" />
        </label>
      </div>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center',
                index < stepTitles.length - 1 && 'flex-1'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium',
                  currentStep > index + 1
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : currentStep === index + 1
                    ? 'border-primary-500 text-primary-500'
                    : 'border-gray-300 text-gray-300'
                )}
              >
                {currentStep > index + 1 ? '✓' : index + 1}
              </div>
              {index < stepTitles.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4',
                    currentStep > index + 1 ? 'bg-primary-500' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {stepTitles.map((title, index) => (
            <p
              key={index}
              className={cn(
                'text-sm',
                currentStep === index + 1 ? 'text-primary-500 font-medium' : 'text-gray-500'
              )}
            >
              {title}
            </p>
          ))}
        </div>
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
      
      {/* Step 1: Contact Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          
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
            
            {showCompanyField && (
              <FormField
                label="Company Name"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                autoComplete="organization"
                placeholder="ABC Company (optional)"
              />
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
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
            
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              required
              autoComplete="tel"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <SelectField
            label="Preferred Contact Method"
            name="preferredContact"
            value={formData.preferredContact || ''}
            onChange={handleChange}
            options={[
              { value: 'phone', label: 'Phone Call' },
              { value: 'text', label: 'Text Message' },
              { value: 'email', label: 'Email' },
              { value: 'any', label: 'Any Method' },
            ]}
            placeholder="How should we contact you?"
          />
        </div>
      )}
      
      {/* Step 2: Project Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <SelectField
              label="Service Needed"
              name="service"
              value={formData.service}
              onChange={handleChange}
              options={serviceOptions}
              error={errors.service}
              required
              placeholder="Select a service"
            />
            
            <SelectField
              label="Project Type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              options={projectTypeOptions}
              error={errors.projectType}
              required
              placeholder="Select project type"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <SelectField
              label="When do you need this?"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              options={urgencyOptions}
              error={errors.urgency}
              required
              placeholder="Select timeframe"
            />
            
            <SelectField
              label="Estimated Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              options={budgetOptions}
              error={errors.budget}
              required
              placeholder="Select budget range"
            />
          </div>
          
          <FormField
            label="Preferred Start Date"
            name="startDate"
            type="date"
            value={formData.startDate || ''}
            onChange={handleChange}
            inputClassName="cursor-pointer"
          />
        </div>
      )}
      
      {/* Step 3: Location & Description */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Project Location & Details</h3>
          
          <FormField
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address}
            required
            autoComplete="street-address"
            placeholder="123 Main Street"
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.city}
              required
              autoComplete="address-level2"
              placeholder="Phoenix"
            />
            
            <SelectField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              options={stateOptions}
              error={errors.state}
              required
              placeholder="Select state"
            />
            
            <FormField
              label="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.zipCode}
              required
              autoComplete="postal-code"
              placeholder="85001"
            />
          </div>
          
          <TextAreaField
            label="Project Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.description}
            required
            rows={6}
            maxLength={2000}
            placeholder="Please provide detailed information about your project, including any specific requirements, current issues, or goals you have in mind..."
          />
          
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="h-5 w-5 text-gray-600" />
              <p className="font-medium text-gray-700">Photo Upload</p>
            </div>
            <p className="text-sm text-gray-600">
              After submitting this form, you&apos;ll have the option to email us photos of your project for a more accurate quote.
            </p>
          </div>
          
          <SelectField
            label="How did you hear about us?"
            name="hearAbout"
            value={formData.hearAbout || ''}
            onChange={handleChange}
            options={hearAboutOptions}
            placeholder="Select an option"
          />
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Previous
          </Button>
        )}
        
        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full sm:w-auto ml-auto"
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || submitStatus === 'success'}
            className="w-full sm:w-auto ml-auto min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Quote Request'
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
