import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-2',
    'rounded-full border border-transparent bg-gray-950 shadow-md',
    'text-base font-medium whitespace-nowrap text-white',
    'disabled:bg-gray-950 disabled:opacity-40 hover:bg-gray-800 transition-colors',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-2',
    'rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'text-base font-medium whitespace-nowrap text-gray-950',
    'disabled:bg-white/15 disabled:opacity-40 hover:bg-white/20 transition-colors',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-1.5',
    'rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
    'text-sm font-medium whitespace-nowrap text-gray-950',
    'disabled:bg-transparent disabled:opacity-40 hover:bg-gray-50 transition-colors',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
