<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Plan {
  id?: string
  name: string
  price: number
  currency: string
  features: string[]
  isActive: boolean
  isPublic: boolean
}

const API_URL = (import.meta.env.PUBLIC_API_URL ?? 'https://api.micomodoro.com') + '/api/v1/plans'
const APP_URL = import.meta.env.PUBLIC_APP_URL ?? 'https://app.micomodoro.com'

const PLAN_ORDER: Record<string, number> = { free: 0, plus: 1, pro: 2 }

const plans = ref<Plan[]>([])
const isLoading = ref(true)
const hasError = ref(false)

const sortedPlans = computed(() =>
  [...plans.value]
    .filter(p => p.isActive && p.isPublic)
    .sort((a, b) => {
      const ai = PLAN_ORDER[a.name.toLowerCase()] ?? 99
      const bi = PLAN_ORDER[b.name.toLowerCase()] ?? 99
      return ai - bi
    })
)

const ctaUrl = (plan: Plan) =>
  `${APP_URL}/auth?plan=${plan.name.toLowerCase()}&ref=landing`

const isPopular = (plan: Plan) => plan.name.toLowerCase() === 'plus'
const isPro = (plan: Plan) => plan.name.toLowerCase() === 'pro'

onMounted(async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('API error')
    const json = await res.json()
    plans.value = Array.isArray(json) ? json : (json.data ?? json.result ?? [])
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section id="planes" class="py-24 px-4 sm:px-6 bg-slate-50">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <p class="text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">Planes</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Elige tu plan
        </h2>
        <p class="text-slate-600 text-sm">
          Todos los planes son <strong class="text-primary-600">gratuitos durante la Beta</strong>.
          Sin tarjeta. Sin permanencia.
        </p>
      </div>

      <!-- Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse"
        >
          <div class="h-5 bg-slate-200 rounded w-1/3 mb-3" />
          <div class="h-3 bg-slate-100 rounded w-2/3 mb-6" />
          <div class="h-8 bg-slate-200 rounded w-1/2 mb-6" />
          <div class="space-y-3 mb-6">
            <div v-for="j in 6" :key="j" class="h-3 bg-slate-100 rounded" />
          </div>
          <div class="h-10 bg-slate-200 rounded-xl" />
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="hasError"
        class="text-center py-16 text-slate-500 text-sm"
      >
        No pudimos cargar los planes. Intenta de nuevo en unos segundos.
      </div>

      <!-- Plans grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        <div
          v-for="plan in sortedPlans"
          :key="plan.name"
          :class="[
            'rounded-2xl p-6 relative overflow-hidden',
            isPro(plan)
              ? 'bg-primary-950 border-2 border-primary-500/60'
              : isPopular(plan)
                ? 'bg-white border-2 border-primary-500 shadow-xl shadow-primary-100 scale-[1.02]'
                : 'bg-white border border-slate-200'
          ]"
        >
          <!-- Glow decoration for Pro -->
          <div
            v-if="isPro(plan)"
            class="absolute -bottom-8 -right-8 w-36 h-36 bg-primary-400/10 rounded-full blur-2xl pointer-events-none"
          />

          <!-- Badges -->
          <div class="flex items-center gap-2 mb-4">
            <span
              v-if="isPopular(plan)"
              class="bg-primary-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide"
            >
              Más popular
            </span>
            <span
              :class="[
                'text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide',
                isPro(plan)
                  ? 'bg-primary-200/20 text-primary-200'
                  : 'bg-primary-50 text-primary-700'
              ]"
            >
              Beta gratuito
            </span>
          </div>

          <!-- Name -->
          <h3
            :class="[
              'text-lg font-extrabold mb-5',
              isPro(plan) ? 'text-white' : 'text-slate-900'
            ]"
          >
            {{ plan.name }}
          </h3>

          <!-- Price -->
          <div class="flex items-baseline gap-1 mb-6">
            <span
              :class="[
                'text-4xl font-extrabold',
                isPro(plan) ? 'text-white' : 'text-slate-900'
              ]"
            >
              $0
            </span>
            <span
              :class="[
                'text-sm',
                isPro(plan) ? 'text-primary-200' : 'text-slate-500'
              ]"
            >
              durante Beta
            </span>
          </div>

          <!-- Features -->
          <ul class="space-y-2.5 mb-6 text-xs relative z-10">
            <li
              v-for="feature in plan.features"
              :key="feature"
              :class="[
                'flex gap-2.5 font-medium',
                isPro(plan) ? 'text-slate-100' : 'text-slate-700'
              ]"
            >
              <span
                :class="[
                  'flex-shrink-0 font-bold',
                  isPro(plan) ? 'text-primary-200' : 'text-primary-600'
                ]"
              >✓</span>
              {{ feature }}
            </li>
          </ul>

          <!-- CTA -->
          <a
            :href="ctaUrl(plan)"
            :class="[
              'block w-full font-bold py-3 rounded-xl transition-all text-sm text-center relative z-10',
              isPro(plan)
                ? 'bg-primary-200 hover:bg-primary-100 text-primary-950 shadow-lg shadow-primary-950/40'
                : isPopular(plan)
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200'
                  : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
            ]"
          >
            Empezar gratis →
          </a>
        </div>
      </div>

      <!-- Footer note -->
      <p class="text-center text-slate-500 text-xs mt-10">
        La disciplina no se limita —
        <strong class="text-slate-600">transacciones y metas son ilimitadas en todos los planes.</strong>
      </p>
    </div>
  </section>
</template>
