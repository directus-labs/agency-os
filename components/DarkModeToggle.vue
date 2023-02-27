<template>
  <button @click="(e) => toggleDark()" class="p-1">
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 "
      mode="out-in"
    >
      <MoonIcon v-if="isDark" class="w-8 h-8" />
      <SunIcon v-else-if="!isDark" class="w-8 h-8" />
    </transition>
  </button>
</template>

<script setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
// Currently having to import the composable directly because Nuxt 3 auto import is not working
// https://github.com/nuxt/framework/issues/3924
import { isDark, toggleDark } from '~~/composables/useDark'
</script>
