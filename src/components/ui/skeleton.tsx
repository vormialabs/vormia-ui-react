import * as React from 'react'
import { cn } from '#/lib/utils'

/**
 * Pulse placeholder — use while data is loading.
 * @see https://ui.shadcn.com/docs/components/skeleton
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
