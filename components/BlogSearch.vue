<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'

const query = ref('')
const results = ref([])
const selected = ref(null)
const loading = ref(false)

const { $directus } = useNuxtApp()

const searchPostsFn = useDebounceFn(() => {
  searchPosts()
}, 500)

const searchPosts = async () => {
  loading.value = true
  try {
    const { data } = await $directus.items('posts').readByQuery({
      search: query.value,
      fields: [
        '*',
        'author.*',
        'category.title',
        'category.slug',
        'category.color',
      ],
    })
    results.value = data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const { fileUrl } = useFiles()

watch(
  () => query.value,
  () => {
    searchPostsFn()
  }
)

watch(
  () => selected.value,
  () => {
    if (selected.value) {
      return navigateTo(`/posts/${selected.value.slug}`)
    }
  }
)
</script>
<template>
  <Combobox as="div" class="" v-model="selected">
    <div class="relative w-full mt-2">
      <ComboboxInput
        class="pr-10 input"
        @change="query = $event.target.value"
        :display-value="(value) => query"
      />
      <button
        v-if="query.length > 0"
        class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none"
        @click="query = ''"
      >
        <Icon
          name="heroicons:x-mark"
          class="w-5 h-5 text-gray-400"
          aria-hidden="true"
        />
      </button>

      <ComboboxOptions
        class="absolute z-10 w-full md:w-[400px] pt-2 mt-4 overflow-auto scrollbar-hide bg-gray-100 dark:bg-gray-900 shadow-lg shadow-gray-500 max-h-[300px] border rounded-bl-3xl rounded-tr-3xl dark:border-gray-700 border-gray-300 sm:text-sm"
      >
        <div class="relative px-2 space-y-2">
          <div
            v-if="loading"
            class="flex items-center justify-center w-full h-12"
          >
            <VLoading
              name="heroicons:refresh"
              class="w-8 h-8 text-gray-700 dark:text-white"
            />
          </div>
          <ComboboxOption
            v-for="hit in results"
            :key="hit.id"
            :value="hit"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-accent' : 'dark:bg-gray-800 bg-white',
                'relative text-left p-2 space-x-2 flex items-start overflow-hidden   w-full  rounded-bl-2xl rounded-tr-2xl',
              ]"
            >
              <img
                class="flex-shrink-0 object-cover w-10 h-10 duration-300 rounded-tr-lg rounded-bl-lg saturate-0"
                :src="fileUrl(hit.image)"
                alt=""
              />
              <p
                class="font-mono text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent"
              >
                {{ truncateString(hit.title, 50) }}
              </p>
            </li>
          </ComboboxOption>
          <div
            class="w-full py-2 font-mono text-center text-gray-500 border-t dark:border-t-gray-700"
          >
            {{ results.length > 0 ? 'End of results' : 'No results' }}
          </div>
        </div>
        <div
          class="sticky bottom-0 flex items-center justify-center w-full h-12 font-mono bg-gradient-to-t from-white dark:from-gray-900"
        />
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
