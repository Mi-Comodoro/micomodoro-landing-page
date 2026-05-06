<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  appUrl: string
  billingCycle: 'monthly' | 'annual'
}>()

const emit = defineEmits<{ close: [] }>()

const cardName = ref('')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const loading = ref(false)
const success = ref(false)

function formatCardNumber(e: Event) {
  const input = e.target as HTMLInputElement
  const v = input.value.replace(/\D/g, '').slice(0, 16)
  cardNumber.value = v.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(e: Event) {
  const input = e.target as HTMLInputElement
  const v = input.value.replace(/\D/g, '').slice(0, 4)
  cardExpiry.value = v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v
}

async function confirm() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 1500))
  success.value = true
  await new Promise((r) => setTimeout(r, 500))
  const params = new URLSearchParams({ plan: 'premium', ref: 'landing', cycle: props.billingCycle })
  window.location.href = `${props.appUrl}/auth?${params.toString()}`
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
      <div class="flex items-center justify-between mb-5">
        <h3 class="font-bold text-slate-900 text-lg">Suscripción Premium</h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600" aria-label="Cerrar modal">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-3 mb-5">
        ⚠️ Estás en una versión beta. No se realizará ningún cargo real.
        Tu plan de prueba incluye todas las funciones Premium.
      </div>

      <div class="bg-slate-50 rounded-xl p-4 mb-5">
        <div class="flex justify-between items-center">
          <span class="text-sm text-slate-600">Plan Premium</span>
          <span class="font-bold text-slate-900">
            {{ billingCycle === 'annual' ? '$7.900 COP/mes' : '$9.900 COP/mes' }}
          </span>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          {{ billingCycle === 'annual' ? 'Facturado anualmente' : 'Facturado mensualmente' }}
        </p>
      </div>

      <div class="flex flex-col gap-3 mb-5">
        <input
          v-model="cardName"
          type="text"
          placeholder="Nombre en la tarjeta"
          class="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500"
        />
        <input
          :value="cardNumber"
          @input="formatCardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          class="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500"
        />
        <div class="flex gap-3">
          <input
            :value="cardExpiry"
            @input="formatExpiry"
            type="text"
            placeholder="MM/AA"
            maxlength="5"
            class="w-1/2 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500"
          />
          <input
            v-model="cardCvv"
            type="password"
            placeholder="CVV"
            maxlength="3"
            class="w-1/2 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      <button
        @click="confirm"
        :disabled="loading || success"
        class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        <span v-if="loading">Procesando...</span>
        <span v-else-if="success">¡Pago exitoso! Redirigiendo...</span>
        <span v-else>Confirmar suscripción</span>
      </button>
    </div>
  </div>
</template>
