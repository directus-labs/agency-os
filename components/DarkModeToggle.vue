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
      <Icon name="heroicons:moon" v-if="isDark" class="w-8 h-8" />
      <Icon name="heroicons:sun" v-else-if="!isDark" class="w-8 h-8" />
    </transition>
  </button>
</template>

<script setup>
const { isDark, toggleDark } = useDark()
</script>
