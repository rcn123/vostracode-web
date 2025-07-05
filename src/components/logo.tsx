'use client'

import { clsx } from 'clsx'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={clsx(className, 'flex items-center gap-3 pr-4')}>
      <img
        src="/vostra-code-logo.svg"
        alt="VostraCode"
        className="h-14 w-auto"
      />
      <span className="text-xl font-bold text-gray-950">VostraCode</span>
    </div>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <img
      src="/vostra-code-logo.svg"
      alt="VostraCode"
      className={className}
    />
  )
}
