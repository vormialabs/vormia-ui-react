import { createFileRoute } from '@tanstack/react-router'
import { AccountPage } from '#/components/admin/account'

export const Route = createFileRoute('/login')({
  component: () => <AccountPage mode="login" />,
})
