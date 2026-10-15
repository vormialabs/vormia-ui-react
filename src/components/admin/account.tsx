import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { Brand } from '#/components/brand/Logo'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

const OCEAN = '/marketing/serene-blue-ocean.png'

type Mode = 'login' | 'register' | 'forgot-password' | 'reset-password'

const copy = {
  login: {
    title: 'Welcome back.',
    intro: 'Sign in to your workspace.',
    submit: 'Open workspace',
  },
  register: {
    title: 'Create your account.',
    intro: 'Create an account to get started.',
    submit: 'Create account',
  },
  'forgot-password': {
    title: 'Forgot your password?',
    intro: 'Enter your email and we’ll send a reset link.',
    submit: 'Send reset link',
  },
  'reset-password': {
    title: 'Set a new password.',
    intro: 'Choose a strong password for your account.',
    submit: 'Update password',
  },
} as const

function PasswordField({ name, label }: { name: string; label: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <label className="form-field">
      <span>{label}</span>
      <div className="password-wrap">
        <Input
          required
          name={name}
          type={visible ? 'text' : 'password'}
          minLength={8}
          maxLength={128}
          placeholder="At least 8 characters"
          autoComplete={name === 'confirm' ? 'new-password' : undefined}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    </label>
  )
}

/** Account split — light grey canvas, white form panel. */
export function AccountPage({ mode }: { mode: Mode }) {
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const navigate = useNavigate()
  const c = copy[mode]

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const email = z.string().trim().email().max(255)
    const password = z.string().min(8).max(128)
    const shape =
      mode === 'forgot-password'
        ? z.object({ email })
        : mode === 'reset-password'
          ? z
              .object({ password, confirm: password })
              .refine((d) => d.password === d.confirm, {
                message: 'Passwords do not match.',
              })
          : mode === 'register'
            ? z
                .object({
                  name: z.string().trim().min(2).max(100),
                  company: z.string().trim().min(2).max(100),
                  email,
                  password,
                  confirm: password,
                  agreement: z.literal('on'),
                })
                .refine((d) => d.password === d.confirm, {
                  message: 'Passwords do not match.',
                })
            : z.object({ email, password })

    const result = shape.safeParse(data)
    if (!result.success) {
      setError(
        result.error.issues[0]?.message === 'Passwords do not match.'
          ? 'Passwords do not match.'
          : 'Please check your details and use a password of at least 8 characters.',
      )
      return
    }
    e.currentTarget.reset()
    if (mode === 'login') {
      void navigate({ to: '/app' })
      return
    }
    setDone(true)
  }

  return (
    <main className="account-page">
      <aside className="account-art">
        <img src={OCEAN} alt="Blue ocean stretching to the horizon" />
        <Brand />
        <div>
          <h2>
            Build faster.
            <br />
            Start with a
            <br />
            solid admin.
          </h2>
          <p>
            Shell, auth screens, and UI patterns ready for your next TanStack Start product.
          </p>
          <small>Vormia · Admin starter kit</small>
        </div>
      </aside>

      <section className="account-main">
        <div className="account-form">
          <div className="account-topline">
            <Link to="/" className="text-link">
              <ArrowLeft className="size-4" /> Back to home
            </Link>
          </div>

          {done ? (
            <div className="success-panel">
              <CheckCircle2 size={42} />
              <h1>
                {mode === 'register'
                  ? 'Account created.'
                  : mode === 'forgot-password'
                    ? 'Check your email.'
                    : 'Password updated.'}
              </h1>
              <p className="intro">
                {mode === 'register'
                  ? 'You’re ready to open your workspace.'
                  : mode === 'forgot-password'
                    ? 'If an account exists for that email, you’ll receive a reset link shortly.'
                    : 'You can now sign in with your new password.'}
              </p>
              <Button asChild className="submit" variant="marine">
                <Link
                  to={
                    mode === 'forgot-password'
                      ? '/reset-password'
                      : mode === 'register'
                        ? '/app'
                        : '/login'
                  }
                >
                  {mode === 'forgot-password'
                    ? 'Continue to password reset'
                    : mode === 'register'
                      ? 'Explore workspace'
                      : 'Back to sign in'}
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <h1>{c.title}</h1>
              <p className="intro">{c.intro}</p>
              <form onSubmit={submit}>
                {mode === 'register' ? (
                  <>
                    <label className="form-field">
                      <span>Full name</span>
                      <Input
                        name="name"
                        placeholder="Your full name"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                      />
                    </label>
                    <label className="form-field">
                      <span>Company</span>
                      <Input
                        name="company"
                        placeholder="Your company name"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="organization"
                      />
                    </label>
                  </>
                ) : null}

                {mode !== 'reset-password' ? (
                  <label className="form-field">
                    <span>Work email</span>
                    <Input
                      name="email"
                      type="email"
                      required
                      maxLength={255}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </label>
                ) : null}

                {mode !== 'forgot-password' ? (
                  <PasswordField
                    name="password"
                    label={mode === 'reset-password' ? 'New password' : 'Password'}
                  />
                ) : null}

                {mode === 'register' || mode === 'reset-password' ? (
                  <PasswordField name="confirm" label="Confirm password" />
                ) : null}

                {mode === 'login' ? (
                  <div className="form-options">
                    <label>
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <Link to="/forgot-password" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>
                ) : null}

                {mode === 'register' ? (
                  <div className="form-options">
                    <label>
                      <input type="checkbox" name="agreement" required />I agree to the
                      terms of service.
                    </label>
                  </div>
                ) : null}

                {error ? (
                  <p role="alert" className="form-error">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="submit" variant="marine">
                  {c.submit}
                  <ArrowUpRight />
                </Button>
              </form>

              {mode !== 'login' ? (
                <p className="account-bottom">
                  <Link to="/login" className="text-primary font-semibold">
                    Back to sign in
                  </Link>
                </p>
              ) : null}
            </>
          )}

          <p className="account-note">
            Preview only. No accounts, passwords or personal details are saved, and no emails
            are sent.
          </p>
        </div>
      </section>
    </main>
  )
}
