import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

type DialogVariant = 'default' | 'destructive' | 'warning' | 'success'

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
  variant?: DialogVariant
  isLoading?: boolean
}

const variantConfig = {
  default: {
    icon: Info,
    iconColor: 'text-primary',
    buttonVariant: 'default' as const,
  },
  destructive: {
    icon: AlertTriangle,
    iconColor: 'text-destructive',
    buttonVariant: 'destructive' as const,
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-warning',
    buttonVariant: 'default' as const,
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-teal',
    buttonVariant: 'default' as const,
  },
}

/**
 * Blocking confirm — built on AlertDialog (not Dialog).
 * Prefer Sheet for create/edit; Sonner for non-blocking feedback.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex items-start gap-3 sm:text-left">
            <Icon className={`mt-0.5 size-5 shrink-0 ${config.iconColor}`} />
            <div className="space-y-1.5">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              {description ? (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              ) : null}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="secondary"
            disabled={isLoading}
            onClick={() => onCancel?.()}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={config.buttonVariant}
            disabled={isLoading}
            onClick={() => {
              onConfirm()
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
