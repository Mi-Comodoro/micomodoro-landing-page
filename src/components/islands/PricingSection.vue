<script setup lang="ts">
import { ref } from 'vue'
import PaymentModal from './PaymentModal.vue'

const props = defineProps<{ appUrl: string }>()

const cycle    = ref<'monthly' | 'annual'>('monthly')
const showModal = ref(false)

const price = { monthly: '9.900', annual: '7.900' }

function goFree() {
  const p = new URLSearchParams({ plan: 'free', ref: 'landing' })
  window.location.href = `${props.appUrl}/auth?${p.toString()}`
}
</script>

<template>
  <section id="planes" class="py-24 px-4 sm:px-6 bg-slate-50">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <p class="text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">Planes</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Elige tu plan
        </h2>
        <p class="text-slate-500 mb-8">Empieza gratis. Actualiza cuando quieras.</p>

        <!-- Toggle -->
        <div class="inline-flex items-center bg-slate-200 rounded-xl p-1 gap-1">
          <button
            @click="cycle = 'monthly'"
            :class="[
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
              cycle === 'monthly'
                ? 'bg-white text-slate-900 shadow'
                : 'text-slate-500 hover:text-slate-700'
            ]"
          >
            Mensual
          </button>
          <button
            @click="cycle = 'annual'"
            :class="[
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2',
              cycle === 'annual'
                ? 'bg-white text-slate-900 shadow'
                : 'text-slate-500 hover:text-slate-700'
            ]"
          >
            Anual
            <span class="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">−20%</span>
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        <!-- FREE -->
        <div class="bg-white border border-slate-200 rounded-2xl p-7">
          <div class="mb-6">
            <h3 class="text-xl font-extrabold text-slate-900 mb-1">Gratis</h3>
            <p class="text-slate-400 text-sm">Para comenzar tu camino financiero</p>
          </div>
          <div class="mb-7">
            <span class="text-5xl font-extrabold text-slate-900">$0</span>
            <span class="text-slate-400 text-sm"> / siempre</span>
          </div>
          <ul class="space-y-3 mb-8 text-sm">
            <li class="flex gap-3 text-slate-700"><span class="text-primary-500 font-bold flex-shrink-0">✓</span> 1 presupuesto activo</li>
            <li class="flex gap-3 text-slate-700"><span class="text-primary-500 font-bold flex-shrink-0">✓</span> Registro de transacciones</li>
            <li class="flex gap-3 text-slate-700"><span class="text-primary-500 font-bold flex-shrink-0">✓</span> Metas de ahorro básicas</li>
            <li class="flex gap-3 text-slate-700"><span class="text-primary-500 font-bold flex-shrink-0">✓</span> Dashboard resumen</li>
            <li class="flex gap-3 text-slate-400"><span class="flex-shrink-0">✗</span> Analítica avanzada</li>
            <li class="flex gap-3 text-slate-400"><span class="flex-shrink-0">✗</span> Múltiples presupuestos</li>
            <li class="flex gap-3 text-slate-400"><span class="flex-shrink-0">✗</span> Exportación de reportes</li>
          </ul>
          <button
            @click="goFree"
            class="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-bold py-3.5 rounded-2xl transition-colors text-sm"
          >
            Empezar gratis →
          </button>
        </div>

        <!-- PREMIUM -->
        <div class="bg-primary-950 border-2 border-primary-500/50 rounded-2xl p-7 relative overflow-hidden">
          <!-- Badge -->
          <div class="absolute top-5 right-5">
            <span class="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Más popular
            </span>
          </div>
          <!-- Glow -->
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div class="mb-6">
            <h3 class="text-xl font-extrabold text-white mb-1">Premium</h3>
            <p class="text-white/40 text-sm">Para los que van en serio</p>
          </div>
          <div class="mb-7">
            <span class="text-5xl font-extrabold text-white">${{ price[cycle] }} COP</span>
            <span class="text-white/40 text-sm"> / mes</span>
            <p class="text-primary-400 text-xs mt-1">
              {{ cycle === 'annual' ? 'Facturado anualmente' : 'Facturado mensualmente' }}
            </p>
          </div>
          <ul class="space-y-3 mb-8 text-sm">
            <li class="flex gap-3 text-white/90"><span class="text-primary-400 font-bold flex-shrink-0">✓</span> Todo lo del plan gratis</li>
            <li class="flex gap-3 text-white/90"><span class="text-primary-400 font-bold flex-shrink-0">✓</span> Presupuestos ilimitados</li>
            <li class="flex gap-3 text-white/90"><span class="text-primary-400 font-bold flex-shrink-0">✓</span> Analítica avanzada</li>
            <li class="flex gap-3 text-white/90"><span class="text-primary-400 font-bold flex-shrink-0">✓</span> Proyecciones de ahorro</li>
            <li class="flex gap-3 text-white/90"><span class="text-primary-400 font-bold flex-shrink-0">✓</span> AP/AR (Cuentas por cobrar y pagar)</li>
            <li class="flex gap-3 text-white/90"><span class="text-primary-400 font-bold flex-shrink-0">✓</span> Exportación de reportes</li>
          </ul>
          <button
            @click="showModal = true"
            class="w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-primary-900/50 relative z-10"
          >
            Comenzar prueba Premium →
          </button>
        </div>

      </div>

      <!-- Trust line -->
      <p class="text-center text-xs text-slate-400 mt-8">
        Todos los planes incluyen período de prueba.
        <strong class="text-slate-600">No cobramos hasta que estés seguro.</strong>
      </p>

    </div>
  </section>

  <PaymentModal
    v-if="showModal"
    :appUrl="appUrl"
    :billingCycle="cycle"
    @close="showModal = false"
  />
</template>
