import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { Toaster } from '#/components/ui/sonner'
import { NotFoundPage } from '#/components/admin/status-page'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Vormia | Admin' },
      {
        name: 'description',
        content: 'Vormia admin foundation for TanStack Start projects.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/brand/favicon/favicon.ico', sizes: 'any' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/brand/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/brand/favicon/favicon-32x32.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/brand/favicon/apple-touch-icon.png',
      },
      { rel: 'manifest', href: '/brand/favicon/site.webmanifest' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

/** Site shell — admin shell theme is toggled inside /app only. */
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      {/* suppressHydrationWarning: browser extensions (Grammarly, etc.) inject body attrs */}
      <body
        className="bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        {children}
        <Toaster />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return <Outlet />
}
