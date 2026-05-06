<script setup lang="ts">
import { ref } from 'vue'
import PaymentModal from './PaymentModal.vue'

const props = defineProps<{ appUrl: string }>()

const billingCycle = ref<'monthly' | 'annual'>('monthly')
const showModal = ref(false)

const monthlyPrice = '9.900'
const annualPrice = '7.900'

function getPrice() {
  return billingCycle.value === 'annual' ? annualPrice : monthlyPrice
}

function handleFree() {
  const params = new URLSearchParams({ plan: 'free', ref: 'landing' })
  window.location.href = `${props.appUrl}/auth?${params.toString()}`
}
</script>

<template>
  <section id="planes" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-extrabold text-slate-900 mb-4">Elige tu plan</h2>
        <p class="text-slate-500 mb-6">Empieza gratis. Actualiza cuando quieras.</p>

        <div class="inline-flex items-center gap-3 bg-slate-100 rounded-xl p-1">
          <button
            @click="billingCycle = 'monthly'"
            :class="['px-4 py-1.5 rounded-lg text-sm font-medium transition-all', billingCycle === 'monthly' ? 'bg-white shadow text-slate-900' : 'text-slate-500']"
          >
            Mensual
          </button>
          <button
            @click="billingCycle = 'annual'"
            :class="['px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2', billingCycle === 'annual' ? 'bg-white shadow text-slate-900' : 'text-slate-500']"
          >
            Anual
            <span class="bg-primary-100 text-primary-700 text-xs font-bold px-1.5 py-0.5 rounded-md">-20%</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-slate-200 rounded-2xl p-6">
          <h3 class="text-xl font-bold text-slate-900 mb-1">Gratis</h3>
          <p class="text-slate-500 text-sm mb-4">Para comenzar tu camino financiero</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">$0</span>
            <span class="text-slate-400 text-sm"> / mes</span>
          </div>
          <ul class="space-y-2 mb-6 text-sm">
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> 1 presupuesto activo</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Registro de transacciones</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Metas de ahorro básicas</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Dashboard resumen</li>
            <li class="flex items-center gap-2 text-slate-400"><span>✗</span> Analítica avanzada</li>
            <li class="flex items-center gap-2 text-slate-400"><span>✗</span> Múltiples presupuestos</li>
            <li class="flex items-center gap-2 text-slate-400"><span>✗</span> Exportación de reportes</li>
          </ul>
          <button
            @click="handleFree"
            class="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            Empezar gratis
          </button>
        </div>

        <div class="border-2 border-primary-600 rounded-2xl p-6 relative">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Más popular
          </span>
          <h3 class="text-xl font-bold text-slate-900 mb-1">Premium</h3>
          <p class="text-slate-500 text-sm mb-4">Para quienes toman sus finanzas en serio</p>
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-slate-900">${{ getPrice() }} COP</span>
            <span class="text-slate-400 text-sm"> / mes</span>
          </div>
          <ul class="space-y-2 mb-6 text-sm">
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Presupuestos ilimitados</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Registro de transacciones</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Metas de ahorro avanzadas</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Dashboard completo</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Analítica avanzada</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> AP/AR (Cuentas por pagar/cobrar)</li>
            <li class="flex items-center gap-2 text-slate-700"><span class="text-primary-500">✓</span> Exportación de reportes</li>
          </ul>
          <button
            @click="showModal = true"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            Comenzar prueba gratis
          </button>
        </div>
      </div>
    </div>
  </section>

  <PaymentModal
    v-if="showModal"
    :appUrl="appUrl"
    :billingCycle="billingCycle"
    @close="showModal = false"
  />
</template>
