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
  </div>
</template>
