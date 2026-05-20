<script setup lang="ts">
import { ref, computed } from 'vue'
import { PLAN_PRICES, TRIAL_DAYS } from '../../config/pricing'
import { APP_URL } from '../../config/urls'

type Plan  = 'plus' | 'pro'
type Cycle = 'monthly' | 'annual'

const props = defineProps<{
  plan: Plan
  billingCycle: Cycle
}>()

const emit = defineEmits<{ close: [] }>()

const cardName   = ref('')
const cardNumber = ref('')
const expiry     = ref('')
const cvv        = ref('')
const loading    = ref(false)
const done       = ref(false)

const planNames  = { plus: 'Plus', pro: 'Pro' }
const planName  = computed(() => planNames[props.plan])
const planPrice = computed(() => `$${PLAN_PRICES[props.plan][props.billingCycle]} COP`)
const billing   = computed(() => props.billingCycle === 'annual' ? 'Facturado anualmente' : 'Facturado mensualmente')

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
  const plan = props.plan === 'pro' ? 'pro' : 'free'
  const p = new URLSearchParams({ plan, ref: 'landing', cycle: props.billingCycle })
  window.location.href = `${APP_URL}/?${p.toString()}`
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
        <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden"></div>

        <div class="flex items-start justify-between mb-5">
          <div>
            <h3 class="font-extrabold text-slate-900 text-lg">
              Plan {{ planName }} — {{ TRIAL_DAYS }} días gratis
            </h3>
            <p class="text-xs text-slate-600 mt-0.5">
              {{ planPrice }}/mes · {{ billing }}
            </p>
          </div>
          <button
            @click="emit('close')"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex-shrink-0"
            aria-label="Cerrar modal"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
        </div>

        <div class="flex gap-3 bg-primary-50 border border-primary-200 rounded-xl p-4 mb-5">
          <span class="text-primary-500 text-lg flex-shrink-0">🎁</span>
          <div>
            <p class="text-primary-800 text-xs font-bold mb-0.5">
              {{ TRIAL_DAYS }} días con acceso Pro completo, gratis.
            </p>
            <p class="text-primary-700 text-xs leading-relaxed">
              Versión beta — no se realizará ningún cargo real hoy.
              Solo queremos que lo pruebes con calma.
            </p>
          </div>
        </div>

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
              inputmode="numeric"
              placeholder="CVV"
              maxlength="3"
              class="w-1/2 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300"
            />
          </div>
        </div>

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
          <span v-else>Activar prueba gratuita de {{ TRIAL_DAYS }} días →</span>
        </button>

        <p class="text-center text-xs text-slate-600 mt-3">
          Sin cobros durante la prueba · Cancelás cuando quieras
        </p>
      </div>
    </div>
  </Teleport>
</template>
