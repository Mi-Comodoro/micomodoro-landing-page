import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  server: {
    host: true,
    port: 3001,
  },
  prefetch: {
    prefetchAll: true,
  },
});
