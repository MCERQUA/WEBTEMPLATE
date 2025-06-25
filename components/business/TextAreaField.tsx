import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface TextAreaFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  rows?: number
  maxLength?: number
  className?: string
  textareaClassName?: string
  'aria-describedby'?: string
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  disabled = false,
  rows = 4,
  maxLength,
  className,
  textareaClassName,
  'aria-describedby': ariaDescribedBy,
}: TextAreaFieldProps) {
  const textareaId = `textarea-${name}`
  const errorId = `${textareaId}-error`

  return (
    <div className={cn('space-y-1', className)}>
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${errorId} ${ariaDescribedBy || ''}`.trim() : ariaDescribedBy
        }
        className={cn(
          'w-full px-4 py-2 border rounded-md transition-colors resize-y',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          disabled && 'bg-gray-50 cursor-not-allowed resize-none',
          textareaClassName
        )}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {maxLength && (
        <p className="text-xs text-gray-500 text-right">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  )
}