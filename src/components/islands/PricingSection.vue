<script setup lang="ts">
import { ref } from 'vue'
import { PLAN_PRICES, TRIAL_DAYS } from '../../config/pricing'
import { CTA_URLS } from '../../config/urls'

type Cycle = 'monthly' | 'annual'

const cycle     = ref<Cycle>('monthly')

const prices = PLAN_PRICES
</script>

<template>
  <section id="planes" class="py-24 px-4 sm:px-6 bg-slate-50">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">Planes</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Elige tu plan
        </h2>
        <p class="text-slate-600 mb-2">
          Todos empiezan con <strong class="text-primary-600">{{ TRIAL_DAYS }} días de prueba Pro gratis</strong>.
          Sin tarjeta.
        </p>
        <p class="text-slate-600 text-sm mb-8">Cancelas cuando quieras. Sin permanencia.</p>

        <div class="inline-flex items-center bg-slate-300 rounded-xl p-1 gap-1 ring-1 ring-slate-300">
          <button
            @click="cycle = 'monthly'"
            :class="[
              'px-5 py-2 rounded-lg text-sm font-extrabold transition-all',
              cycle === 'monthly' ? 'bg-primary-700 text-white shadow' : 'text-slate-700 hover:text-slate-950'
            ]"
          >
            Mensual
          </button>
          <button
            @click="cycle = 'annual'"
            :class="[
              'px-5 py-2 rounded-lg text-sm font-extrabold transition-all flex items-center gap-2',
              cycle === 'annual' ? 'bg-primary-700 text-white shadow' : 'text-slate-700 hover:text-slate-950'
            ]"
          >
            Anual
            <span :class="[
              'text-xs font-bold px-2 py-0.5 rounded-md',
              cycle === 'annual' ? 'bg-white text-primary-800' : 'bg-primary-600 text-white'
            ]">
              −20%
            </span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        <div class="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 class="text-lg font-extrabold text-slate-900 mb-1">Gratis</h3>
          <p class="text-slate-600 text-xs mb-5">Para comenzar el hábito</p>
          <div class="mb-5">
            <span class="text-4xl font-extrabold text-slate-900">$0</span>
            <span class="text-slate-600 text-sm"> / siempre</span>
          </div>
          <ul class="space-y-2.5 mb-6 text-xs">
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>1 presupuesto activo</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Transacciones <strong>ilimitadas</strong></li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Metas de ahorro <strong>ilimitadas</strong></li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>3 cuentas de ahorro</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Proyecciones 1 año</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Reporte mensual básico</li>
            <li class="flex gap-2.5 text-slate-500"><span class="flex-shrink-0">✗</span> Múltiples presupuestos</li>
            <li class="flex gap-2.5 text-slate-500"><span class="flex-shrink-0">✗</span> Presupuesto compartido</li>
            <li class="flex gap-2.5 text-slate-500"><span class="flex-shrink-0">✗</span> Exportación de reportes</li>
          </ul>
          <a
            :href="CTA_URLS.free"
            class="block w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-bold py-3 rounded-xl transition-colors text-sm text-center"
          >
            Empezar gratis →
          </a>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 class="text-lg font-extrabold text-slate-900 mb-1">Plus</h3>
          <p class="text-slate-600 text-xs mb-5">Para organizar toda tu vida financiera</p>
          <div class="mb-1">
            <span class="text-4xl font-extrabold text-slate-900">
              ${{ prices.plus[cycle] }} COP
            </span>
          </div>
          <p class="text-slate-600 text-xs mb-5">
            {{ cycle === 'annual' ? 'facturado anualmente' : 'facturado mensualmente' }}
          </p>
          <ul class="space-y-2.5 mb-6 text-xs">
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span><strong>3 presupuestos</strong> activos</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Cuentas de ahorro ilimitadas</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Categorías personalizadas</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Proyecciones 3 años</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Compartido con <strong>2 personas</strong></li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Historial 18 meses</li>
            <li class="flex gap-2.5 text-slate-700 font-medium"><span class="text-primary-700 font-bold flex-shrink-0">✓</span>Exportar en CSV</li>
            <li class="flex gap-2.5 text-slate-500"><span class="flex-shrink-0">✗</span> Presupuestos ilimitados</li>
            <li class="flex gap-2.5 text-slate-500"><span class="flex-shrink-0">✗</span> Simulador de escenarios</li>
          </ul>
          <a
            :href="CTA_URLS.free"
            class="block w-full bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors text-sm text-center"
          >
            Probar Plus {{ TRIAL_DAYS }} días gratis →
          </a>
        </div>

        <div class="bg-primary-950 border-2 border-primary-500/60 rounded-2xl p-6 relative overflow-hidden">
          <div class="absolute top-4 right-4">
            <span class="bg-primary-200 text-primary-950 text-[10px] font-extrabold px-3 py-1 rounded-full">
              MÁS COMPLETO
            </span>
          </div>
          <div class="absolute -bottom-8 -right-8 w-36 h-36 bg-primary-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <h3 class="text-lg font-extrabold text-white mb-1">Pro</h3>
          <p class="text-slate-100 text-xs mb-5">Sin límites, para los que van en serio</p>
          <div class="mb-1">
            <span class="text-4xl font-extrabold text-white">
              ${{ prices.pro[cycle] }} COP
            </span>
          </div>
          <p class="text-primary-200 text-xs mb-5">
            {{ cycle === 'annual' ? 'facturado anualmente' : 'facturado mensualmente' }}
          </p>
          <ul class="space-y-2.5 mb-6 text-xs relative z-10">
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span><strong>Presupuestos ilimitados</strong></li>
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span>Todo lo del plan Plus</li>
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span>Proyecciones <strong>10+ años</strong></li>
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span>Compartido con <strong>6 personas</strong></li>
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span>Historial <strong>ilimitado</strong></li>
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span>CSV + PDF + Excel</li>
            <li class="flex gap-2.5 text-slate-100 font-medium"><span class="text-primary-200 font-bold flex-shrink-0">✓</span>Simulador de escenarios financieros</li>
          </ul>
          <a
            :href="CTA_URLS.pro"
            class="block w-full bg-primary-200 hover:bg-primary-100 text-primary-950 font-extrabold py-3 rounded-xl transition-all text-sm shadow-lg shadow-primary-950/50 relative z-10 text-center"
          >
            Probar Pro {{ TRIAL_DAYS }} días gratis →
          </a>
        </div>
      </div>

      <div class="text-center mt-10">
        <p class="text-slate-600 text-xs mb-2">
          🎁 Los {{ TRIAL_DAYS }} días de prueba incluyen acceso <strong class="text-slate-600">Pro completo</strong>,
          sin tarjeta de crédito.
        </p>
        <p class="text-slate-600 text-xs">
          La disciplina no se limita —
          <strong class="text-slate-600">transacciones y metas son ilimitadas en todos los planes.</strong>
        </p>
      </div>
    </div>
  </section>
</template>
