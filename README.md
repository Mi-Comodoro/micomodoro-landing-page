# Mi Comodoro — Landing

Sitio público de Mi Comodoro: presentación del producto, ahorro primero, funciones, ecosistema, planes en beta, preguntas, acceso a la beta, privacidad y términos. Astro estático; la portada tiene su propio CSS y las páginas legales usan Tailwind.

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

Todas son `PUBLIC_*` y se incrustan al compilar: URL del sitio, endpoint del formulario de acceso (`PUBLIC_ACCESS_URL`, opcional) y versión de la política que se registra como evidencia (`PUBLIC_POLICY_VERSION`). Ver `.env.example`.

## Despliegue

Un push a `develop` compila el sitio y publica `dist/` (`.github/workflows/deploy-develop.yaml`).

## Convenciones

Ramas y reglas para agentes: [AGENTS.md](AGENTS.md).
