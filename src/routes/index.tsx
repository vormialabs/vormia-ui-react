import { createFileRoute, redirect } from '@tanstack/react-router'

/** App entry — send everyone to login. */
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
})
