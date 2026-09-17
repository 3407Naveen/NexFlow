import * as React from 'react';
import { cn } from '@/lib/utils';
import { TaskStatus } from '@/types';

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: TaskStatus | 'active' | 'inactive' | 'success' | 'error' | 'warning' | 'info' | 'default' | 'idle';
}

export function StatusIndicator({ status, className, ...props }: StatusIndicatorProps) {
  const isPulsing = status === 'running' || status === 'waiting_approval' || status === 'warning';
  
  const isGreen = status === 'completed' || status === 'active' || status === 'success';
  const isRed = status === 'failed' || status === 'error';
  const isAmber = status === 'waiting_approval' || status === 'warning';
  const isIndigo = status === 'running';

  return (
    <div className={cn('relative flex h-3 w-3 items-center justify-center', className)} {...props}>
      {isPulsing && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
            {
              'bg-accent-indigo': isIndigo,
              'bg-signal-amber': isAmber,
            }
          )}
        />
      )}
      <span
        className={cn(
          'relative inline-flex h-2 w-2 rounded-full',
          {
            'bg-accent-indigo': isIndigo,
            'bg-signal-green': isGreen,
            'bg-signal-red': isRed,
            'bg-signal-amber': isAmber,
            'bg-text-muted': !isGreen && !isRed && !isAmber && !isIndigo,
          }
        )}
      />
    </div>
  );
}
