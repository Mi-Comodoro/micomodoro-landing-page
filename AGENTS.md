# AGENTS.md

Landing de Mi Comodoro: Astro estático, sin frameworks de UI en el cliente. La portada (`src/pages/index.astro`) usa componentes en `src/components/v2/` y su propio CSS (`src/styles/landing.css`); las páginas legales (`privacidad`, `terminos`) usan `BaseLayout` con Tailwind.

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

- Las variables `PUBLIC_*` se incrustan en el build estático; cambiarlas exige recompilar. `deploy-develop.yaml` no define ninguna: sin `PUBLIC_ACCESS_URL` el formulario de acceso no envía nada y lo dice en pantalla.
- Solo se promete lo que existe en el código. Todo límite por plan, exportación, categorías propias, varios presupuestos y conexión con Mi Despensa va como «próximamente»; sin duración de trial, sin cifras de usuarios, sin precios en COP. Toda cifra de ejemplo se rotula «ejemplo ilustrativo». Verificación detallada en la página de Notion «Review comercial y decisiones de refresh de la landing».
- Colores: base crema, teal y verde profundo `#0c4746` (60/30/10). Los colores de datos del simulador (`--c-save`, `--c-need`, `--c-want`) siguen la semántica del dashboard; están en `landing.css` y se cambian ahí.
- Fuentes autohospedadas con `@fontsource-variable/*` (sin llamadas a Google). Los enlaces a política y T&C apuntan a `#` hasta publicar las versiones nuevas.
