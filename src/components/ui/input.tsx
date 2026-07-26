import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-14 w-full min-w-0 rounded-[4px] border border-black/70 bg-black px-4 text-base tracking-[0.01em] text-foreground shadow-[0_18px_35px_-30px_rgba(0,0,0,0.9)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-foreground-muted/85 focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-60 sm:h-16 sm:px-5 sm:text-lg',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
