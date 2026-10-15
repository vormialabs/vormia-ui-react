import { createFileRoute } from '@tanstack/react-router'
import { AdminPage } from '#/components/admin/admin'

export const Route = createFileRoute('/app/')({
  component: AdminPage,
})
