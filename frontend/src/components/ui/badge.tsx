import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-surface-raised text-text-primary',
        secondary: 'border-transparent bg-surface-raised text-text-muted',
        outline: 'border-border text-text-primary',
        success: 'border-transparent bg-signal-green-muted text-signal-green',
        warning: 'border-transparent bg-signal-amber-muted text-signal-amber',
        error: 'border-transparent bg-signal-red-muted text-signal-red',
        info: 'border-transparent bg-accent-indigo-muted text-accent-indigo',
        muted: 'border-transparent bg-surface-raised text-text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
