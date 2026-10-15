import { createFileRoute } from '@tanstack/react-router'
import { AccountPage } from '#/components/admin/account'

export const Route = createFileRoute('/reset-password')({
  component: () => <AccountPage mode="reset-password" />,
})
