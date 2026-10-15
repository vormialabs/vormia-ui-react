/**
 * SSR-safe shell preferences via useSyncExternalStore.
 * getServerSnapshot always returns defaults so hydration matches.
 */
import { useSyncExternalStore } from 'react'
import {
  LOCALES,
  LOCALE_KEY,
  getLocale,
  type LocaleCode,
} from '#/lib/locale'

export type ShellTheme = 'light' | 'dark'

export const SHELL_THEME_KEY = 'reactadmin-shell-theme'

type Listener = () => void

const themeListeners = new Set<Listener>()
const localeListeners = new Set<Listener>()

function emit(set: Set<Listener>) {
  set.forEach((l) => l())
}

function readTheme(): ShellTheme {
  // Default dark — only 'light' when user explicitly stored it
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(SHELL_THEME_KEY) === 'light' ? 'light' : 'dark'
}

function readLocaleCode(): LocaleCode {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(LOCALE_KEY)
  const codes = new Set(LOCALES.map((l) => l.code))
  return stored && codes.has(stored as LocaleCode) ? (stored as LocaleCode) : 'en'
}

export function setShellTheme(next: ShellTheme) {
  window.localStorage.setItem(SHELL_THEME_KEY, next)
  emit(themeListeners)
}

export function toggleShellTheme() {
  setShellTheme(readTheme() === 'light' ? 'dark' : 'light')
}

export function setLocalePref(code: LocaleCode) {
  window.localStorage.setItem(LOCALE_KEY, code)
  const opt = getLocale(code)
  document.documentElement.lang = opt.htmlLang
  emit(localeListeners)
}

export function useShellTheme(): ShellTheme {
  return useSyncExternalStore(
    (onStoreChange) => {
      themeListeners.add(onStoreChange)
      return () => themeListeners.delete(onStoreChange)
    },
    readTheme,
    () => 'dark' as ShellTheme,
  )
}

export function useLocalePref(): LocaleCode {
  return useSyncExternalStore(
    (onStoreChange) => {
      localeListeners.add(onStoreChange)
      return () => localeListeners.delete(onStoreChange)
    },
    readLocaleCode,
    () => 'en' as LocaleCode,
  )
}
