import { createFileRoute } from '@tanstack/react-router'
import { AccountPage } from '#/components/admin/account'

export const Route = createFileRoute('/forgot-password')({
  component: () => <AccountPage mode="forgot-password" />,
})
