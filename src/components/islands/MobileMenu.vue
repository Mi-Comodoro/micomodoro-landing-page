<script setup lang="ts">
import { ref } from 'vue'
import { CTA_URLS } from '../../config/urls'

const open = ref(false)

function close() { open.value = false }
</script>

<template>
  <div class="md:hidden">
    <button
      @click="open = !open"
      class="p-2 rounded-lg text-slate-100 hover:text-white hover:bg-white/10 transition-colors"
      :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
    >
      <svg v-if="!open" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="6" x2="19" y2="6"/>
        <line x1="3" y1="12" x2="19" y2="12"/>
        <line x1="3" y1="18" x2="19" y2="18"/>
      </svg>
      <svg v-else width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="4" y1="4" x2="18" y2="18"/>
        <line x1="18" y1="4" x2="4" y2="18"/>
      </svg>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="absolute top-16 left-0 right-0 bg-primary-950/95 backdrop-blur-sm border-t border-white/10 px-6 py-6 flex flex-col gap-5"
      >
        <a @click="close" href="#el-problema" class="text-slate-100 hover:text-white font-medium text-sm transition-colors">El problema</a>
        <a @click="close" href="#como-funciona" class="text-slate-100 hover:text-white font-medium text-sm transition-colors">Cómo funciona</a>
        <a @click="close" href="#planes" class="text-slate-100 hover:text-white font-medium text-sm transition-colors">Planes</a>
        <a
          :href="CTA_URLS.generic"
          class="bg-primary-200 hover:bg-primary-100 text-primary-950 font-extrabold px-5 py-3 rounded-xl text-sm text-center transition-colors"
        >
          Empezar gratis →
        </a>
      </div>
    </Transition>
  </div>
</template>
