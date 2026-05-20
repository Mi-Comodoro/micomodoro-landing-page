export const APP_URL = import.meta.env.PUBLIC_APP_URL ?? 'https://app.micomodoro.com'

export const CTA_URLS = {
  generic: `${APP_URL}/?ref=landing`,
  free:    `${APP_URL}/?plan=free&ref=landing`,
  plus:    `${APP_URL}/?plan=plus&ref=landing`,
  pro:     `${APP_URL}/?plan=pro&ref=landing`,
} as const
