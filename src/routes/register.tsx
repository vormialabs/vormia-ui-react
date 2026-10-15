import { createFileRoute, redirect } from '@tanstack/react-router'

/** Register disabled — redirect to login. */
export const Route = createFileRoute('/register')({
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
})
