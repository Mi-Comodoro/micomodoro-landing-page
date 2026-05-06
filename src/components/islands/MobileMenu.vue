<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ ctaUrl: string }>()

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="md:hidden">
    <button
      @click="toggle"
      class="p-2 text-slate-600 hover:text-primary-600 transition-colors"
      aria-label="Abrir menú"
    >
      <svg v-if="!isOpen" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
      </svg>
      <svg v-else width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-lg px-4 py-4 flex flex-col gap-4"
    >
      <a @click="close" href="#caracteristicas" class="text-sm text-slate-700 font-medium py-2">Características</a>
      <a @click="close" href="#como-funciona" class="text-sm text-slate-700 font-medium py-2">Cómo funciona</a>
      <a @click="close" href="#planes" class="text-sm text-slate-700 font-medium py-2">Planes</a>
      <a
        @click="close"
        :href="ctaUrl"
        class="bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
      >
        Empezar gratis
      </a>
    </div>
  </div>
</template>
