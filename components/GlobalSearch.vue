<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'

const props = defineProps({
  collections: {
    type: Array as PropType<string[]>,
    required: true,
    validator: (value) => {
      return value.every((collection) => {
        return [
          'posts',
          'pages',
          'categories',
          'projects',
          'help_articles',
        ].includes(collection)
      })
    },
  },
  placeholder: {
    type: String,
    default: 'Search items',
  },
})

const query = ref('')
const results = ref([])
const selected = ref(null)
const loading = ref(false)

const searchDebounced = useDebounceFn(() => {
  search()
}, 500)

const search = async () => {
  loading.value = true
  try {
    const { data } = await $fetch('/api/search', {
      params: {
        search: query.value,
        collections: props.collections, // Use the collections prop to filter the search
      },
    })
    results.value = data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const { fileUrl } = useFiles()

// Watch for changes to the query and search
watch(
  () => query.value,
  () => {
    searchDebounced()
  }
)

// If a result is selected, navigate to the URL
watch(
  () => selected.value,
  () => {
    if (selected.value) {
      return navigateTo(selected.value.url)
    }
  }
)
</script>
<template>
  <Combobox as="div" class="" v-model="selected">
    <div class="relative w-full mt-2">
      <ComboboxInput
        :placeholder="placeholder"
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
        class="absolute z-10 w-full pt-2 mt-4 overflow-auto scrollbar-hide bg-gray-100 dark:bg-gray-900 shadow-md max-h-[300px] border rounded-bl-xl dark:border-gray-700 border-gray-300 sm:text-sm"
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
                'relative text-left p-2 space-x-3 flex items-start overflow-hidden   w-full  rounded-bl rounded-tr cursor-pointer',
              ]"
            >
              <img
                v-if="hit.image"
                class="flex-shrink-0 object-cover w-10 h-10 duration-300 rounded-tr rounded-bl saturate-0"
                :src="fileUrl(hit.image)"
                alt=""
              />
              <div
                v-else
                class="w-10 h-10 bg-gray-200 rounded-tr rounded-bl dark:bg-gray-900"
              ></div>
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
