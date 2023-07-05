<script setup lang="ts">
defineProps<{
  title: string
}>()
const open = ref(false)
</script>
<template>
  <div>
    <div
      class="p-2 transition duration-200 border-2 rounded-br-3xl rounded-tl-3xl"
      :class="open ? 'border-gray-500' : 'border-transparent'"
    >
      <div
        class="relative px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-br-2xl rounded-tl-2xl"
      >
        <dt class="text-lg leading-7">
          <button
            class="flex items-start justify-between w-full font-mono text-left text-gray-400 focus:outline-none focus:text-gray-900 dark:focus:text-accent"
            @click="open = !open"
          >
            <span class="font-bold text-gray-900 dark:text-white">
              {{ title }}
            </span>
            <span class="flex items-center">
              <span v-show="!open">
                <Icon
                  name="heroicons:plus"
                  class="w-8 h-8 rounded-full fill-current text-accent"
                />
              </span>
              <span v-show="open"
                ><Icon
                  name="heroicons:minus"
                  class="w-8 h-8 rounded-full fill-current text-accent"
              /></span>
            </span>
          </button>
        </dt>
        <dd v-show="open" class="mt-2">
          <div class="font-serif prose text-left dark:prose-invert">
            <slot />
          </div>
        </dd>
      </div>
    </div>
  </div>
</template>
