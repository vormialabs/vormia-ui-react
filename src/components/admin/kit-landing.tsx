import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  LayoutDashboard,
  Lock,
  Menu,
  PanelRight,
  Sparkles,
  X,
} from 'lucide-react'
import { Brand } from '#/components/brand/Logo'
import { Button } from '#/components/ui/button'
import { APP_NAME, APP_TAGLINE, COPYRIGHT_YEAR } from '#/lib/app'

const HERO_IMG = '/marketing/container-ship-horizon.png'
const BAND_IMG = '/marketing/serene-blue-ocean.png'

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#platform', label: 'Platform' },
  { href: '#how', label: 'How it works' },
] as const

const services = [
  {
    icon: LayoutDashboard,
    title: 'Admin shell',
    text: 'Dark-default chrome, light workspace, sticky sidebar, and topbar patterns ready to fork.',
  },
  {
    icon: PanelRight,
    title: 'Lists & sheets',
    text: 'Table toolbars, create/edit sheets, and overlay forms using the shared UI kit.',
  },
  {
    icon: ChartColumn,
    title: 'Charts & skeletons',
    text: 'Recharts overview plus page skeletons so loading states match Editorial Humanism.',
  },
] as const

const steps = [
  {
    title: 'Shell',
    text: 'Viewport-locked admin layout with theme and locale prefs.',
  },
  {
    title: 'Auth',
    text: 'Login, forgot, and reset pages branded for your product.',
  },
  {
    title: 'Workspace',
    text: 'Dashboard, records lists, and settings wired to your API.',
  },
] as const

/**
 * Public kit landing — menu, hero, service boxes, sections, footer.
 * Real exits: Sign in → /login, Open admin → /app.
 * Other CTAs are UI samples (type="button", no navigation).
 */
export function KitLanding() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="site-header wrap">
        <Brand to="/" />
        <nav className="site-nav" aria-label="Main navigation">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="sign-link" to="/login">
            Sign in
          </Link>
          <Button asChild size="sm" variant="marine">
            <Link to="/app">
              Open admin <ArrowUpRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link to="/app" onClick={() => setOpen(false)}>
            Open admin
          </Link>
        </nav>
      ) : null}

      <main>
        {/* Hero */}
        <section className="hero">
          <img
            className="hero-image"
            src={HERO_IMG}
            alt=""
            decoding="async"
          />
          <div className="hero-content wrap fade-up">
            <h1>
              <span>{APP_NAME}</span> Admin UI
            </h1>
            <p>
              {APP_TAGLINE}. A TanStack Start shell you can fork — branded,
              dark by default, with lists, sheets, charts, and skeletons.
            </p>
            <div className="hero-actions">
              <Button type="button" variant="marine">
                Get started <ArrowUpRight />
              </Button>
              <Button asChild variant="outline" className="hero-cta-secondary">
                <a href="#services">
                  Explore services <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
          <div className="hero-foot">
            {[
              { icon: LayoutDashboard, text: 'Admin shell & topbar' },
              { icon: Lock, text: 'Auth pages included' },
              { icon: Sparkles, text: 'Lucide + skeletons' },
            ].map((c) => (
              <span key={c.text}>
                <c.icon strokeWidth={1.5} />
                {c.text}
              </span>
            ))}
          </div>
        </section>

        {/* Service boxes */}
        <section id="services" className="section wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Services</span>
              <h2>
                Everything you need to start
                <br />
                your next <span className="text-primary">admin app.</span>
              </h2>
            </div>
            <p>
              Sample cards and buttons so you can see hierarchy, spacing, and
              Lucide icons before wiring your product.
            </p>
          </div>
          <div className="feature-grid">
            {services.map((s, i) => (
              <article className="feature" key={s.title}>
                <s.icon className="feature-icon" strokeWidth={1.5} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Button type="button" variant="outline" size="sm" className="mt-5">
                  Learn more <ArrowRight />
                </Button>
                <span className="feature-no">0{i + 1} / KIT</span>
              </article>
            ))}
          </div>
        </section>

        {/* Section 1 — purpose */}
        <section id="platform" className="section wrap mission">
          <div className="mission-brand">
            <Brand to="/" />
          </div>
          <div>
            <h2>
              Built as a developer foundation.
              <br />
              Fork it, rebrand it, connect your API.{' '}
              <span>Keep the shell patterns that already work.</span>
            </h2>
            <div className="mission-bottom">
              <p>Editorial Humanism tokens — borders, radii, and type roles shared with Veyra.</p>
              <Button type="button" variant="ghost" className="text-link h-auto p-0">
                View docs <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2 — how it works + CTA */}
        <section id="how" className="workflow section">
          <img
            className="workflow-water"
            src={BAND_IMG}
            alt=""
            decoding="async"
          />
          <div className="wrap">
            <div className="section-heading">
              <h2>
                How the kit is organized,
                <span className="text-primary"> in three layers.</span>
              </h2>
              <p>
                Shell chrome, auth entry, then the light workspace where lists
                and dashboards live.
              </p>
            </div>
            <div className="workflow-grid kit-workflow-grid">
              {steps.map((s, i) => (
                <article className="workflow-step" key={s.title}>
                  <span className="number">0{i + 1} —</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="wrap">
            <div>
              <h2>Ready to explore the workspace?</h2>
              <p>Sign in for auth UI, or open the admin shell with demo data.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="marine" size="lg">
                Book a demo <ArrowUpRight />
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/app">Open admin</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap">
        <div className="footer-main">
          <div>
            <Brand to="/" />
            <p>
              {APP_NAME} admin foundation.
              <br />
              TanStack Start · Tailwind 4 · Lucide.
            </p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#platform">Platform</a>
            <a href="#how">How it works</a>
            <Link to="/login">Sign in</Link>
            <Link to="/app">
              Open admin <ArrowUpRight className="inline size-3" />
            </Link>
            <Link to="/forbidden">Forbidden</Link>
            <a href="/this-page-does-not-exist">Not found</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {COPYRIGHT_YEAR} {APP_NAME}. All rights reserved.
          </span>
          <span>Sample CTAs above do not navigate — UI reference only.</span>
        </div>
      </footer>
    </>
  )
}
