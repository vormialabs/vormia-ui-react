import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#/lib/utils'
import { Label } from '#/components/ui/label'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn('flex w-full flex-col gap-5', className)}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'group/field flex w-full gap-2 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: 'flex-col [&>*]:w-full',
        horizontal: 'flex-row items-center',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('flex flex-1 flex-col gap-1.5 leading-snug', className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  required,
  ...props
}: React.ComponentProps<typeof Label> & {
  /** Shows a red asterisk via `label.required:after` in styles.css */
  required?: boolean
}) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'text-[12px] font-semibold leading-snug group-data-[disabled=true]/field:opacity-50',
        required && 'required',
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-[11px] leading-normal text-muted-foreground', className)}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors?.length) return null
    const unique = [
      ...new Map(errors.map((e) => [e?.message, e])).values(),
    ]
    if (unique.length === 1) return unique[0]?.message
    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {unique.map(
          (error, i) =>
            error?.message && <li key={i}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-[11px] font-normal text-destructive', className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldContent,
}
