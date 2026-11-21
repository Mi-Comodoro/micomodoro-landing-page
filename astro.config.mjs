import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // Tailwind solo lo usan las páginas legales (BaseLayout + global.css); la portada usa landing.css.
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
