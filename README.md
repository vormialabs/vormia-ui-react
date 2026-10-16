# Vormia — TanStack Start admin UI starter

Admin UI kit branded **Vormia**: charts, tables, sheets, toasts, login/forgot/reset, 404 & Forbidden pages, loading skeletons. Domain labels are generic (Records / Inventory).

## Defaults

- **Dark shell** by default (`reactadmin-shell-theme`; only stores `light` when toggled)
- **Entry** `/` — kit landing (menu, hero, services, sections, footer). Working links: Sign in → `/login`, Open admin → `/app`. Other CTAs are UI samples. No register — `/register` redirects to login.
- **Brand**: `public/brand/vormia-logo-blue.png`, `vormia-icon-blue.png`, favicons in `public/brand/favicon/`
- Sidebar bottom includes demo links: **Not found** (404) and **Forbidden** (`/forbidden`)

## What you get

| Area | Details |
| :--- | :--- |
| Kit landing | `/` — menu, hero, service boxes, sections, footer; sample CTAs do not navigate |
| Admin shell | Charcoal dark default / light toggle; white workspace; viewport lock |
| Topbar | Search, language switcher, theme, alerts, avatar |
| Dashboard | Recharts overview |
| Records / Inventory | Table + create Sheet + sample inventory |
| Auth | Login, forgot / reset password |
| Errors | 404 `notFoundComponent`, `/forbidden` |
| Skeletons | `ui/skeleton` + `DashboardSkeleton` / `TablePageSkeleton` / `SettingsSkeleton` |
| Cursor rules | `.cursor/rules/` (incl. `skeletons.mdc`) |

## Skeletons

```tsx
import { Skeleton } from '#/components/ui/skeleton'
import { TablePageSkeleton } from '#/components/admin/page-skeletons'

// Atomic placeholder
<Skeleton className="h-4 w-32" />

// Full page while data loads
{isPending ? <TablePageSkeleton /> : <YourTable />}
```

In Settings → **Developer**, use **Preview skeletons** to inspect loading UI for Dashboard / table / Settings (~800ms, no `useEffect`).

## Run

```bash
cd admin-ui
bun install
bun run generate-routes
bun run dev
```

- `/` — kit landing (menu → copyright)  
- `/login` — auth  
- `/app` — admin  
- `/forbidden` — 403  
- unknown path — 404  

## Hydration

Theme/locale use `useSyncExternalStore` (`src/lib/shell-prefs.ts`). Body uses `suppressHydrationWarning` for browser-extension attributes.

If the console shows a hydration mismatch whose only diff is `data-cursor-ref`, that comes from **Cursor’s in-IDE browser** injecting attributes into the DOM — it is not in this repo. Ignore it, or confirm in Chrome/Safari/Firefox after `bun run dev`. Do not add `suppressHydrationWarning` on every control to hide it.
