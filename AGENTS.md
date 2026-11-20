# AGENTS.md

Landing de Mi Comodoro: Astro estático, islas Vue 3 y Tailwind.

## Comandos

- Node 26 LTS (`.nvmrc`, igual que dashboard y server). Solo npm (hay `package-lock.json`).
- `npm install` · `npm run dev` (puerto 3001) · `npm run build` (salida en `dist/`) · `npm run preview`
- No hay tests ni lint.
- Variables: `.env.example`.

## Notion

Tareas, estado, roadmap y decisiones van en Notion, nunca en el repo.
Página: «🚀 Mi Comodoro — Project Tracker», sección «🛸 Landing». Al cerrar una tarea, actualizar su Estado.

## Ramas y despliegue

- Rama de producción: `master`. Trabajo en `feature/...` o `fix/...` con PR a `develop`; nunca push directo.
- Un push a `develop` compila y publica `dist/` (`deploy-develop.yaml`).

## Trampas

- Las variables `PUBLIC_*` se incrustan en el build estático; cambiarlas exige recompilar.
- `deploy-develop.yaml` no define ninguna `PUBLIC_*`, así que el sitio desplegado usa los valores por defecto del código (`src/config/pricing.ts`, `src/config/urls.ts`, `PricingSection.vue`), no los de `.env.example`.
