/**
 * Admin UI locale preference (switcher only — no translation catalogs yet).
 * Chinese shows badge "CH"; internal code is `zh`. Flag = country ISO2.
 */

export type LocaleCode = 'en' | 'ar' | 'so' | 'zh' | 'sw'

export type LocaleOption = {
  code: LocaleCode
  /** Short badge in the UI (CH for Chinese as requested) */
  badge: string
  label: string
  /** Country ISO2 used for the flag icon */
  flagCountry: string
  /** BCP 47 / html lang */
  htmlLang: string
}

export const LOCALE_KEY = 'reactadmin-locale'

export const LOCALES: readonly LocaleOption[] = [
  { code: 'en', badge: 'EN', label: 'English', flagCountry: 'GB', htmlLang: 'en' },
  { code: 'ar', badge: 'AR', label: 'Arabic', flagCountry: 'SA', htmlLang: 'ar' },
  { code: 'so', badge: 'SO', label: 'Somali', flagCountry: 'SO', htmlLang: 'so' },
  { code: 'zh', badge: 'CH', label: 'Chinese', flagCountry: 'CN', htmlLang: 'zh' },
  { code: 'sw', badge: 'SW', label: 'Swahili', flagCountry: 'KE', htmlLang: 'sw' },
] as const

const CODES = new Set<string>(LOCALES.map((l) => l.code))

export function readLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(LOCALE_KEY)
  return stored && CODES.has(stored) ? (stored as LocaleCode) : 'en'
}

export function writeLocale(code: LocaleCode): void {
  window.localStorage.setItem(LOCALE_KEY, code)
  const opt = LOCALES.find((l) => l.code === code)
  if (opt && typeof document !== 'undefined') {
    document.documentElement.lang = opt.htmlLang
  }
}

export function getLocale(code: LocaleCode): LocaleOption {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0]
}

/** Regional-indicator emoji flag from ISO 3166-1 alpha-2 (e.g. GB → 🇬🇧). */
export function flagEmoji(countryIso2: string): string {
  const cc = countryIso2.trim().toUpperCase()
  if (cc.length !== 2) return ''
  const A = 0x1f1e6
  return String.fromCodePoint(
    A + (cc.charCodeAt(0) - 65),
    A + (cc.charCodeAt(1) - 65),
  )
}

/** Inline flag for nav / menus — emoji, no extra assets. */
export function FlagIcon({
  country,
  className,
  title,
}: {
  country: string
  className?: string
  title?: string
}) {
  return (
    <span
      className={className}
      role="img"
      aria-label={title ?? country}
      title={title ?? country}
      style={{ fontSize: '1.05em', lineHeight: 1 }}
    >
      {flagEmoji(country)}
    </span>
  )
}
