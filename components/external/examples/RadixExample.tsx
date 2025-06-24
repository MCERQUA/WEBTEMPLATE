'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Switch from '@radix-ui/react-switch'
import * as Tooltip from '@radix-ui/react-tooltip'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ComponentWrapper } from '../adapters/ComponentWrapper'

/**
 * Example integration of Radix UI components with our design system
 * This shows how to properly style and integrate Radix primitives
 */

// Modal/Dialog Example
export function RadixModal({ 
  children, 
  trigger,
  title,
  description 
}: {
  children: React.ReactNode
  trigger: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <ComponentWrapper>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          {trigger}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )} />
          <Dialog.Content className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4",
            "border bg-background p-6 shadow-lg duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "sm:rounded-lg md:w-full"
          )}>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm text-muted-foreground">
                  {description}
                </Dialog.Description>
              )}
            </div>
            {children}
            <Dialog.Close className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background",
              "transition-opacity hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            )}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ComponentWrapper>
  )
}

// Switch/Toggle Example
export function RadixSwitch({
  checked,
  onCheckedChange,
  label,
  disabled
}: {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}) {
  return (
    <ComponentWrapper className="flex items-center space-x-2">
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full",
          "border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
        )}
      >
        <Switch.Thumb className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
          "transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )} />
      </Switch.Root>
      {label && (
        <label
          htmlFor={undefined}
          className={cn(
            "text-sm font-medium leading-none",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          )}
        >
          {label}
        </label>
      )}
    </ComponentWrapper>
  )
}

// Tooltip Example
export function RadixTooltip({
  children,
  content,
  side = 'top',
  align = 'center'
}: {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}) {
  return (
    <ComponentWrapper>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {children}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side={side}
              align={align}
              sideOffset={5}
              className={cn(
                "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5",
                "text-sm text-popover-foreground shadow-md",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2",
                "data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              {content}
              <Tooltip.Arrow className="fill-popover" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </ComponentWrapper>
  )
}

// Example usage component
export function RadixExamplePage() {
  const [switchChecked, setSwitchChecked] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  
  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Radix UI Integration Examples</h2>
        <p className="mb-6 text-muted-foreground">
          These examples show how to integrate Radix UI components with our design system.
        </p>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Modal/Dialog</h3>
        <RadixModal
          trigger={
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Open Modal
            </button>
          }
          title="Example Modal"
          description="This is an example of a Radix Dialog styled with our design system."
        >
          <div className="space-y-4">
            <p>Modal content goes here. All styling matches our design system.</p>
            <div className="flex justify-end space-x-2">
              <Dialog.Close className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                Cancel
              </Dialog.Close>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Confirm
              </button>
            </div>
          </div>
        </RadixModal>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Switch/Toggle</h3>
        <div className="space-y-2">
          <RadixSwitch
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
            label="Enable notifications"
          />
          <p className="text-sm text-muted-foreground">
            Status: {switchChecked ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Tooltip</h3>
        <div className="flex space-x-4">
          <RadixTooltip content="This is a tooltip">
            <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
              Hover me
            </button>
          </RadixTooltip>
          
          <RadixTooltip content="Right-aligned tooltip" side="right">
            <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
              Right tooltip
            </button>
          </RadixTooltip>
        </div>
      </section>
    </div>
  )
}