/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_APP_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_API_URL?: string;
  readonly PUBLIC_PLAN_PLUS_MONTHLY_PRICE?: string;
  readonly PUBLIC_PLAN_PLUS_ANNUAL_PRICE?: string;
  readonly PUBLIC_PLAN_PRO_MONTHLY_PRICE?: string;
  readonly PUBLIC_PLAN_PRO_ANNUAL_PRICE?: string;
  readonly PUBLIC_TRIAL_DAYS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
