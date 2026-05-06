import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [vue(), tailwind()],
  server: {
    host: true,
    port: 3001,
  },
  prefetch: {
    prefetchAll: true,
  },
});
