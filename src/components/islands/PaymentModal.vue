<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  appUrl: string
  billingCycle: 'monthly' | 'annual'
}>()

const emit = defineEmits<{ close: [] }>()

const cardName   = ref('')
const cardNumber = ref('')
const expiry     = ref('')
const cvv        = ref('')
const loading    = ref(false)
const done       = ref(false)

const price = computed(() =>
  props.billingCycle === 'annual' ? '$7.900 COP/mes' : '$9.900 COP/mes'
)
const billing = computed(() =>
  props.billingCycle === 'annual' ? 'Facturado anualmente' : 'Facturado mensualmente'
)

function onCardNumber(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16)
  cardNumber.value = raw.replace(/(.{4})/g, '$1 ').trim()
}

function onExpiry(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4)
  expiry.value = raw.length >= 2 ? `${raw.slice(0,2)}/${raw.slice(2)}` : raw
}

async function confirm() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1600))
  done.value = true
  await new Promise(r => setTimeout(r, 700))
  const p = new URLSearchParams({ plan: 'premium', ref: 'landing', cycle: props.billingCycle })
  window.location.href = `${props.appUrl}/auth?${p.toString()}`
}

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-0 sm:px-4"
      @click="onBackdrop"
    >
      <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl">

        <!-- Handle (mobile) -->
        <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden"></div>

        <!-- Header -->
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="font-extrabold text-slate-900 text-lg">Suscripción Premium</h3>
            <p class="text-xs text-slate-400 mt-0.5">{{ price }} · {{ billing }}</p>
          </div>
          <button
            @click="emit('close')"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
        </div>

        <!-- Beta notice -->
        <div class="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
          <span class="text-amber-500 text-lg flex-shrink-0">⚠️</span>
          <p class="text-amber-800 text-xs leading-relaxed">
            <strong>Versión beta.</strong> No se realizará ningún cargo real.
            Tu período de prueba incluye <strong>todas las funciones Premium</strong>.
          </p>
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-3 mb-5">
          <input
            v-model="cardName"
            type="text"
            placeholder="Nombre en la tarjeta"
            class="w-full border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300"
          />
          <input
            :value="cardNumber"
            @input="onCardNumber"
            type="text"
            inputmode="numeric"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
            class="w-full border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300 font-mono tracking-wider"
          />
          <div class="flex gap-3">
            <input
              :value="expiry"
              @input="onExpiry"
              type="text"
              inputmode="numeric"
              placeholder="MM/AA"
              maxlength="5"
              class="w-1/2 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300"
            />
            <input
              v-model="cvv"
              type="password"
              placeholder="CVV"
              maxlength="3"
              inputmode="numeric"
              class="w-1/2 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300"
            />
          </div>
        </div>

        <!-- CTA -->
        <button
          @click="confirm"
          :disabled="loading || done"
          class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 rounded-2xl transition-all text-sm shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"/>
            <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span v-if="loading">Procesando...</span>
          <span v-else-if="done">¡Listo! Redirigiendo a tu cuenta...</span>
          <span v-else>Confirmar y empezar →</span>
        </button>

        <p class="text-center text-xs text-slate-400 mt-3">
          Cancelás cuando quieras. Sin permanencia.
        </p>

      </div>
    </div>
  </Teleport>
</template>
