export const PLAN_PRICES = {
  plus: {
    monthly: import.meta.env.PUBLIC_PLAN_PLUS_MONTHLY_PRICE ?? '19.900',
    annual: import.meta.env.PUBLIC_PLAN_PLUS_ANNUAL_PRICE ?? '15.900',
  },
  pro: {
    monthly: import.meta.env.PUBLIC_PLAN_PRO_MONTHLY_PRICE ?? '34.900',
    annual: import.meta.env.PUBLIC_PLAN_PRO_ANNUAL_PRICE ?? '27.900',
  },
} as const

export const TRIAL_DAYS = import.meta.env.PUBLIC_TRIAL_DAYS ?? '75'
