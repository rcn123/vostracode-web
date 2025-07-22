import { type ReactNode } from 'react'

interface TextProps {
  children: ReactNode
  className?: string
}

export function Heading({ 
  as: Component = 'h1', 
  children, 
  className = '' 
}: TextProps & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }) {
  return (
    <Component className={`font-display font-medium tracking-tight text-gray-950 ${className}`}>
      {children}
    </Component>
  )
}

export function Subheading({ children, className = '' }: TextProps) {
  return (
    <p className={`text-base/7 font-semibold ${className}`}>
      {children}
    </p>
  )
}

export function Lead({ children, className = '' }: TextProps) {
  return (
    <p className={`text-xl/8 font-medium text-gray-950/75 ${className}`}>
      {children}
    </p>
  )
} 