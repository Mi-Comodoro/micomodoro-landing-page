/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_ACCESS_URL?: string;
  readonly PUBLIC_POLICY_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
