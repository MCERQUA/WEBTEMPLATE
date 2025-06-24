import Link from "next/link"
import { cn } from "@/lib/utils/cn"

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
    outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }
  
  const styles = cn(baseStyles, variants[variant], sizes[size], disabled && "opacity-50 cursor-not-allowed", className)
  
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}