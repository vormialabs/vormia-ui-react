import { createFileRoute } from '@tanstack/react-router'
import { ForbiddenPage } from '#/components/admin/status-page'

export const Route = createFileRoute('/forbidden')({
  component: ForbiddenPage,
})
