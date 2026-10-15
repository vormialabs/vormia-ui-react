# Vormia — TanStack Start admin UI starter

Admin UI kit branded **Vormia**: charts, tables, sheets, toasts, login/forgot/reset, 404 & Forbidden pages. Domain labels are generic (Records / Inventory).

## Defaults

- **Dark shell** by default (`reactadmin-shell-theme`; only stores `light` when toggled)
- **Entry** `/` → `/login` (no register — `/register` redirects to login)
- **Brand**: `public/brand/vormia-logo-blue.png`, `vormia-icon-blue.png`, favicons in `public/brand/favicon/`
- Sidebar bottom includes demo links: **Not found** (404) and **Forbidden** (`/forbidden`)

## What you get

| Area | Details |
| :--- | :--- |
| Admin shell | Charcoal dark default / light toggle; white workspace; viewport lock |
| Topbar | Search, language switcher, theme, alerts, avatar |
| Dashboard | Recharts overview |
| Records / Inventory | Table + create Sheet + sample inventory |
| Auth | Login, forgot / reset password |
| Errors | 404 `notFoundComponent`, `/forbidden` |
| Cursor rules | `.cursor/rules/` |

## Run

```bash
cd reactadmin
bun install
bun run generate-routes
bun run dev
```

- `/` → login  
- `/app` — admin  
- `/forbidden` — 403  
- unknown path — 404  

## Hydration

Theme/locale use `useSyncExternalStore` (`src/lib/shell-prefs.ts`). Body uses `suppressHydrationWarning` for browser-extension attributes.
