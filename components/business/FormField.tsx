import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'number'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
  className?: string
  inputClassName?: string
  'aria-describedby'?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  disabled = false,
  autoComplete,
  className,
  inputClassName,
  'aria-describedby': ariaDescribedBy,
}: FormFieldProps) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className={cn('space-y-1', className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${errorId} ${ariaDescribedBy || ''}`.trim() : ariaDescribedBy
        }
        className={cn(
          'w-full px-4 py-2 border rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          disabled && 'bg-gray-50 cursor-not-allowed',
          inputClassName
        )}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}