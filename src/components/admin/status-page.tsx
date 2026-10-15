import type { LucideIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, SearchX, ShieldOff } from 'lucide-react'
import { Brand } from '#/components/brand/Logo'
import { Button } from '#/components/ui/button'
import { APP_NAME } from '#/lib/app'

type StatusPageProps = {
  code: '404' | '403'
  icon: LucideIcon
  title: string
  description: string
  /** Where the primary CTA goes */
  homeTo?: '/login' | '/app'
  homeLabel?: string
}

/**
 * Centered status card — logo + colored code + Lucide icon above copy.
 * Icons: https://lucide.dev/icons/
 */
export function StatusPage({
  code,
  icon: Icon,
  title,
  description,
  homeTo = '/login',
  homeLabel = 'Home screen',
}: StatusPageProps) {
  return (
    <main className="status-page">
      <div className="status-card">
        <div className="status-card-body">
          <Brand to="/login" size="sm" className="status-brand" />
          <p className={`status-code status-code--${code}`} aria-hidden>
            {code}
          </p>
          <Icon className="status-icon" aria-hidden strokeWidth={1.75} />
          <h1>{title}</h1>
          <p className="status-desc">{description}</p>
          <Button
            asChild
            className="status-home-btn bg-foreground text-background hover:bg-foreground/90"
          >
            <Link to={homeTo}>
              <ArrowLeft className="size-4" />
              {homeLabel}
            </Link>
          </Button>
          <div className="status-help">
            <p>If you need help, our team is here for you!</p>
            <a href="mailto:support@example.com">Contact support</a>
          </div>
        </div>
      </div>
      <p className="status-foot">{APP_NAME}</p>
    </main>
  )
}

export function NotFoundPage() {
  return (
    <StatusPage
      code="404"
      icon={SearchX}
      title="Page not found"
      description="The address you entered may be incorrect, or this page no longer exists."
      homeTo="/login"
      homeLabel="Home screen"
    />
  )
}

export function ForbiddenPage() {
  return (
    <StatusPage
      code="403"
      icon={ShieldOff}
      title="Access denied"
      description="You do not have permission to view this page. Ask an admin if you think this is a mistake."
      homeTo="/app"
      homeLabel="Back to admin"
    />
  )
}
