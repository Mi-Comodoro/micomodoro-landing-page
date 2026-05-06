import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Configuración de salida
  output: 'static',
  
  // Configuración de build
  vite: {
    ssr: {
      external: ['svgo']
    }
  },

  // Integrations
  integrations: [],

  // Configuración de servidor
  server: {
    port: 3000,
    host: true
  },

  // Configuración de prefetch
  prefetch: {
    prefetchAll: true
  }
});
