import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-[4px] text-center text-sm font-semibold uppercase leading-tight tracking-[0.16em] whitespace-normal break-words transition-[transform,background-color,color,border-color,box-shadow,filter] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55 active:translate-y-0 sm:tracking-[0.22em] sm:whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        gold:
          'bg-brand text-brand-foreground shadow-[0_22px_46px_-28px_rgba(236,57,56,0.78),inset_0_1px_0_rgba(255,255,255,0.18)] hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_28px_60px_-28px_rgba(236,57,56,0.9),inset_0_1px_0_rgba(255,255,255,0.24)]',
        outline:
          'border border-brand/70 bg-transparent text-foreground shadow-[inset_0_0_0_1px_rgba(236,57,56,0.15),0_20px_50px_-38px_rgba(236,57,56,0.52)] hover:-translate-y-0.5 hover:bg-brand/8 hover:text-brand-foreground hover:shadow-[inset_0_0_0_1px_rgba(236,57,56,0.3),0_24px_56px_-34px_rgba(236,57,56,0.7)]',
        whatsapp:
          'bg-whatsapp text-whatsapp-foreground shadow-[0_18px_44px_-22px_rgba(67,167,109,0.74),inset_0_1px_0_rgba(255,255,255,0.14)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_24px_56px_-24px_rgba(67,167,109,0.88),inset_0_1px_0_rgba(255,255,255,0.2)]',
        ghost: 'text-foreground hover:text-brand',
      },
      size: {
        default: 'h-14 px-4 text-sm sm:h-15 sm:px-7',
        lg: 'h-14 px-4 text-sm sm:h-16 sm:px-8 sm:text-base',
        icon: 'size-14 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
