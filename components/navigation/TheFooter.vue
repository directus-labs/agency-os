<script setup lang="ts">
import { Bars3Icon, SparklesIcon } from '@heroicons/vue/24/outline'
// Import the $directus plugin
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata

const { data: navigation } = await useAsyncData(
  'footerNav',
  () => {
    return $directus.items('navigation').readOne('footer', {
      fields: ['items.*', 'items.page.slug', 'items.children.*'],
    })
  },
  {
    transform: (data) => data,
  }
)

const { data: form } = await useAsyncData(
  'newsletterForm',
  () => {
    return $directus.items('forms').readByQuery({
      filter: {
        key: {
          _eq: 'newsletter',
        },
      },
    })
  },
  {
    transform: (data) => data.data[0],
  }
)

const { tagline, title, social_links } = useRuntimeConfig()

function getUrl(item: object) {
  if (item.type === 'page') {
    return `/${item.page.slug}`
  } else {
    return item.url
  }
}
</script>
<template>
  <footer
    class="bg-white dark:bg-gray-900 rounded-tl-3xl rounded-br-3xl"
    aria-labelledby="footer-heading"
  >
    <div class="px-5 py-12 mx-auto md:px-12">
      <!-- Header -->
      <div class="flex justify-between">
        <div class="w-full">
          <NuxtLink href="/">
            <Logo class="h-8 dark:text-white" />
          </NuxtLink>
          <p class="mt-2 font-mono text-sm text-gray-500">
            {{ tagline }}
          </p>
        </div>
        <div class="flex items-center justify-end w-full space-x-2">
          <DarkModeToggle
            class="hidden text-gray-600 md:block hover:text-gray-400"
          />
          <button
            id="animation-toggle"
            class="hidden text-gray-600 md:block hover:text-gray-400"
          >
            <SparklesIcon class="w-8 h-8" />
          </button>
        </div>
      </div>

      <!-- Navigation + Form -->
      <nav class="grid gap-8 mt-8 md:grid-cols-2 xl:mt-0 xl:col-span-2">
        <div>
          <TypographyTitle>Menu</TypographyTitle>
          <ul role="list" class="grid grid-flow-col grid-cols-2 mt-4">
            <li v-for="(item, itemIdx) in navigation.items" :key="item.id">
              <NuxtLink
                :href="getUrl(item)"
                class="font-mono font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-accent"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div
          class="relative p-6 overflow-hidden border-2 lg:justify-end md:grid md:grid-cols-1 border-accent rounded-tl-3xl rounded-br-3xl"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
          />
          <div class="absolute inset-0 grain-bg dark:opacity-10" />
          <div class="relative w-full md:mt-0">
            <TypographyHeadline
              :content="`<p>Subscribe to our <em>newsletter</em></p>`"
            >
              Subscribe to our newsletter
            </TypographyHeadline>
            <VForm class="mt-4" :form="form" />
          </div>
        </div>
      </nav>
    </div>

    <!-- Bottom -->
    <div
      class="py-6 mx-6 border-t dark:border-t-gray-700 max-w-7xl md:flex md:items-center md:justify-between lg:px-16"
    >
      <div
        class="flex items-center justify-center space-x-6 md:order-last md:mb-0"
      >
        <NuxtLink
          v-for="link in social_links"
          target="_blank"
          :href="link.url"
          class="w-6 h-6 text-white"
        >
          <span class="sr-only">{{ link.service }}</span>
          <Icon
            class="w-8 h-8 text-gray-700 dark:text-white hover:opacity-75"
            :name="`uil:${link.service}`"
          />
        </NuxtLink>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <span class="mt-2 font-serif text-gray-700 dark:text-gray-300">
          Copyright © 1988 - {{ new Date().getFullYear() }}
          <NuxtLink
            href="/"
            class="mx-2 hover:text-accent"
            rel="noopener noreferrer"
            >{{ title }}.</NuxtLink
          >
          All rights reserved.
        </span>
      </div>
    </div>
  </footer>
</template>
