'use client'

import { clsx } from 'clsx'
import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={clsx(className, 'flex items-center gap-3 pr-4')}>
      <Image
        src="/vostracode-logo.svg"
        alt="VostraCode"
        width={56}
        height={56}
        className="h-14 w-auto"
      />
      <span className="text-xl font-bold text-gray-950">VostraCode</span>
    </div>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/vostracode-logo.svg"
      alt="VostraCode"
      width={32}
      height={32}
      className={className}
    />
  )
}
