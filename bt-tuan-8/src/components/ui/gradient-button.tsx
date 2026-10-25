'use client';

import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const gradientButtonVariants = cva(
  [
    'gradient-button',
    'inline-flex items-center justify-center',
    'rounded-[11px] min-w-[132px] px-9 py-4',
    'text-base leading-[19px] font-[500] text-white',
    'font-sans font-bold',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: '',
        variant: 'gradient-button-variant',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type GradientButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof gradientButtonVariants>;

const GradientButton = ({ ref, className, variant, asChild = false, ...props }: GradientButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(gradientButtonVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  );
};

GradientButton.displayName = 'GradientButton';

export { GradientButton, gradientButtonVariants };
