import { createFileRoute } from '@tanstack/react-router'
import { KitLanding } from '#/components/admin/kit-landing'

/** Kit landing — menu, hero, services, sections, footer. */
export const Route = createFileRoute('/')({
  component: KitLanding,
})
