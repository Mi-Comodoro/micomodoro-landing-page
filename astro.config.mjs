import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    port: 3001,
  },
  prefetch: {
    prefetchAll: true,
  },
});
