<script setup lang="ts">
const { $directus } = useNuxtApp()
const { title } = useRuntimeConfig()

const {
  data: navigation,
  pending,
  error,
} = await useAsyncData(
  'mainNavigation',
  () => {
    return $directus.items('navigation').readOne('main', {
      fields: ['items.*', 'items.page.slug', 'items.children.*'],
    })
  },
  {
    transform: (data) => data,
  }
)
</script>
<template>
  <header
    class="relative w-full space-y-4 md:flex md:items-center md:space-x-6 md:space-y-0"
  >
    <div
      class="flex items-center bg-gray-800 md:justify-between rounded-tl-xl rounded-br-xl md:flex-1"
    >
      <NuxtLink href="/" class="px-4 py-4">
        <Logo class="h-6 text-white" />
        <span class="sr-only">{{ title }}</span>
      </NuxtLink>
      <nav
        class="hidden font-mono md:flex md:space-x-4 lg:space-x-6"
        aria-label="Global"
      >
        <NavigationMenuItem
          v-for="item in navigation.items"
          :key="item.id"
          :item="item"
        />
      </nav>
      <div class="flex items-center justify-end flex-shrink-0 p-3 space-x-2">
        <DarkModeToggle
          class="hidden text-gray-200 md:block hover:text-gray-400"
        />
      </div>
    </div>

    <div class="hidden md:block">
      <VButton href="/contact-us" variant="primary" class="uppercase">
        Let's Talk
      </VButton>
    </div>

    <NavigationMobileMenu :navigation="navigation" />
  </header>
</template>
