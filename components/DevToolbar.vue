<script setup lang="ts">
const showTailwindBreakpoints = ref(true)
</script>
<template>
  <div
    v-if="showTailwindBreakpoints"
    class="fixed bottom-0 right-0 z-50 flex items-center justify-center w-6 h-6 p-3 m-8 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-accent"
  >
    <div class="block sm:hidden md:hidden lg:hidden xl:hidden">--</div>
    <div class="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
    <div class="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
    <div class="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
    <div class="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
  </div>
</template>
