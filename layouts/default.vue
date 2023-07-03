<script setup lang="ts">
const { progress, scrollToTop } = useScroll()
</script>
<template>
  <div
    class="relative flex flex-col min-h-screen overflow-hidden antialiased transition duration-150 bg-white visual-effects bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-700"
  >
    <div
      id="mouseLight"
      class="absolute top-0 rounded-full mouse-gradient transition-opacity h-[200px] w-[200px]"
      style="opacity: 0"
    />

    <div class="relative px-6 pt-6">
      <NavigationTheHeader />
    </div>

    <div class="relative text-gray-900">
      <slot />
    </div>
    <div id="nuxtImg"></div>

    <NavigationTheFooter />

    <div class="fixed z-10 bottom-4 left-4">
      <div class="flex items-center">
        <div class="relative">
          <RadialProgress
            :radius="25"
            :progress="progress"
            :stroke="5"
            class="text-accent/75"
          />
          <button
            v-if="progress >= 0.95"
            @click="() => scrollToTop()"
            class="absolute inset-0 flex items-center justify-center"
          >
            <Icon
              name="heroicons:arrow-up-20-solid"
              class="w-4 h-4 text-accent/75 hover:text-gray-500"
            />
          </button>
        </div>
        <span
          class="p-1 font-mono text-gray-700 bg-gray-300 bg-opacity-50 rounded-tl-lg rounded-br-lg dark:bg-gray-700 dark:text-gray-200"
          v-if="progress >= 0.95"
          >fin.</span
        >
      </div>
    </div>
    <DevOnly>
      <DevToolbar />
    </DevOnly>
    <ChatWidget />
  </div>
</template>
