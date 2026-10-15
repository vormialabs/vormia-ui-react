import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { APP_NAME } from '#/lib/app'

type BrandProps = {
  className?: string
  size?: 'default' | 'sm'
  variant?: 'logo' | 'icon'
  to?: '/' | '/app' | '/login'
}

const assets = {
  logo: '/brand/vormia-logo-blue.png',
  icon: '/brand/vormia-icon-blue.png',
} as const

/**
 * Vormia mark — blue wordmark / icon on light or charcoal shell.
 * Natural aspect ratio — do not crop, recolour, or stretch.
 */
export function Brand({
  className,
  size = 'default',
  variant = 'logo',
  to = '/login',
}: BrandProps) {
  const src = variant === 'icon' ? assets.icon : assets.logo

  return (
    <Link
      to={to}
      className={cn(
        'brand',
        size === 'sm' && 'brand--sm',
        variant === 'icon' && 'brand--icon',
        className,
      )}
      aria-label={`${APP_NAME} home`}
    >
      <img src={src} alt={APP_NAME} decoding="async" />
    </Link>
  )
}

export function Logo(props: BrandProps) {
  return <Brand {...props} />
}
