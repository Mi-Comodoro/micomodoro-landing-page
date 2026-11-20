# Mi Comodoro — Landing

Sitio público de Mi Comodoro: presentación del producto, planes y precios, privacidad y términos. Astro estático con islas Vue 3 y Tailwind.

## Requisitos

- Node 26 LTS (`nvm use` lee `.nvmrc`)
- npm

## Levantarlo

```bash
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:3001`.

## Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor de desarrollo (puerto 3001) |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |

No hay tests ni lint.

## Variables de entorno

Todas son `PUBLIC_*` y se incrustan al compilar: URL de la app y del sitio, precios de los planes, días de prueba y URL de la API de planes. Ver `.env.example`; si falta alguna se usa el valor por defecto del código.

## Despliegue

Un push a `develop` compila el sitio y publica `dist/` (`.github/workflows/deploy-develop.yaml`).

## Convenciones

Ramas y reglas para agentes: [AGENTS.md](AGENTS.md).
