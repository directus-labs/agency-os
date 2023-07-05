<script setup lang="ts">
interface GalleryProps {
  items: [
    {
      id?: string
      title?: string
      description?: string
      tags?: string
    }
  ]
}

const props = defineProps<GalleryProps>()

const { fileUrl } = useFiles()

const isOpen = ref(false)
const currentItemIdx = ref(0)

const currentItem = computed(() => {
  return props.items[currentItemIdx.value].id
})

function next() {
  // If the current item is the last item, go back to the first item
  currentItemIdx.value =
    currentItemIdx.value === props.items.length - 1
      ? 0
      : currentItemIdx.value + 1
}

function prev() {
  // If the current item is the first item, go to the last item
  currentItemIdx.value =
    currentItemIdx.value === 0
      ? props.items.length - 1
      : currentItemIdx.value - 1
}

function toggle() {
  isOpen.value = !isOpen.value
}

// Add keyboard navigation
function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    toggle()
  }
  if (e.key === 'ArrowRight') {
    next()
  }
  if (e.key === 'ArrowLeft') {
    prev()
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>
<template>
  <!-- Gallery -->
  <div class="gap-4 mt-4 md:columns-3">
    <button
      v-for="(item, itemIdx) in items"
      :key="itemIdx"
      @click="
        () => {
          currentItemIdx = itemIdx
          toggle()
        }
      "
      :class="[
        {
          'rounded-br-3xl rounded-tl-3xl': isEven(itemIdx),
          'rounded-bl-3xl rounded-tr-3xl': !isEven(itemIdx),
        },
        'block relative w-full mb-6 overflow-hidden p-2 group border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition duration-300',
      ]"
    >
      <div
        class="relative"
        :class="[
          {
            'rounded-br-2xl rounded-tl-2xl': isEven(itemIdx),
            'rounded-bl-2xl rounded-tr-2xl': !isEven(itemIdx),
          },
          'block relative w-full overflow-hidden group ',
        ]"
      >
        <img
          :src="fileUrl(item.id)"
          class="object-cover w-full transition duration-300 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75"
        >
          <Icon
            name="heroicons:magnifying-glass-plus"
            class="w-12 h-12 text-gray-500 dark:text-white"
          />
        </div>
      </div>
    </button>
  </div>
  <!-- Gallery Modal -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-900 bg-opacity-75"
  >
    <!-- Tips for using the gallery -->
    <div
      class="absolute z-50 hidden font-mono text-white md:block top-4 left-4"
    >
      <div class="p-4 bg-gray-900 rounded-tl-3xl rounded-br-3xl">
        <p>Press 'esc' to close</p>
        <p>Press 'left' or 'right' to navigate</p>
      </div>
    </div>
    <div class="absolute z-50 font-mono text-white bottom-4 right-4">
      <VBadge
        v-for="(item, itemIdx) in currentItem.tags"
        :key="itemIdx"
        size="lg"
        class="rounded-br-xl"
      >
        {{ item }}
      </VBadge>
    </div>
    <div
      class="relative flex flex-col items-center justify-center w-full h-full max-w-7xl"
    >
      <button
        @click="toggle"
        class="absolute z-50 p-4 text-2xl text-white transition duration-300 top-4 right-4 bg-accent hover:bg-opacity-75 rounded-tr-xl rounded-bl-xl"
      >
        <div>
          <span class="sr-only">Close</span>
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </div>
      </button>
      <div class="flex items-center justify-center w-full h-full">
        <button
          @click="prev"
          class="absolute z-50 p-4 text-2xl text-white transition duration-300 left-4 bg-accent hover:bg-opacity-75 rounded-tr-xl rounded-bl-xl"
        >
          <span class="sr-only">Previous</span>
          <Icon name="heroicons:arrow-left" class="w-6 h-6" />
        </button>
        <button
          @click="next"
          class="absolute z-50 p-4 text-2xl text-white transition duration-300 right-4 bg-accent hover:bg-opacity-75 rounded-br-xl rounded-tl-xl"
        >
          <span class="sr-only">Next</span>
          <Icon name="heroicons:arrow-right" class="w-6 h-6" />
        </button>
        <!-- Image -->
        <div class="relative flex items-center justify-center">
          <div class="relative w-full h-full p-20">
            <!-- Metadata -->
            <div class="flex">
              <p
                class="inline-block px-6 py-2 font-serif font-bold text-white bg-gray-900 track rounded-tl-3xl"
              >
                {{ currentItem.title }}
              </p>
              <p
                v-if="currentItem.description"
                class="flex-1 hidden px-6 py-2 font-mono text-white bg-gray-700 md:inline-block"
              >
                {{ currentItem.description }}
              </p>
            </div>
            <template v-for="(item, itemIdx) in items" :key="itemIdx">
              <img
                v-if="currentItemIdx === itemIdx"
                :src="fileUrl(item.id)"
                class="object-contain w-full rounded-br-3xl"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
