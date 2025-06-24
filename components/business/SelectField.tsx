import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  className?: string
  selectClassName?: string
  'aria-describedby'?: string
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = 'Select an option',
  disabled = false,
  className,
  selectClassName,
  'aria-describedby': ariaDescribedBy,
}: SelectFieldProps) {
  const selectId = `select-${name}`
  const errorId = `${selectId}-error`

  return (
    <div className={cn('space-y-1', className)}>
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${errorId} ${ariaDescribedBy || ''}`.trim() : ariaDescribedBy
        }
        className={cn(
          'w-full px-4 py-2 border rounded-md transition-colors appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'bg-white bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23374151%22%20d%3D%22M10.293%203.293%206%207.586%201.707%203.293A1%201%200%200%200%20.293%204.707l5%205a1%201%200%200%200%201.414%200l5-5a1%201%200%201%200-1.414-1.414z%22%2F%3E%3C%2Fsvg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          disabled && 'bg-gray-50 cursor-not-allowed',
          selectClassName
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}