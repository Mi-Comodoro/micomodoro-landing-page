export const APP_URL = import.meta.env.PUBLIC_APP_URL ?? 'http://localhost:3000'

export const CTA_URLS = {
  free: `${APP_URL}/?plan=free&ref=landing`,
  pro: `${APP_URL}/?plan=pro&ref=landing`,
} as const
