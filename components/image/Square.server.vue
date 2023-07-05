<script setup lang="ts">
export interface SquareImageProps {
  imageUrl?: string
  title?: string
  summary?: string
  authorName?: string
  authorImage?: string
  readTime?: string
  badgeLabel?: string
  badgeColor?: string
}

defineProps<SquareImageProps>()
</script>
<template>
  <div class="relative w-[800px] h-[800px] overflow-hidden">
    <!-- Image  -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-accent"
    />
    <div class="absolute inset-0 grain-bg opacity-20" />
    <div v-if="imageUrl" class="absolute inset-0 w-full h-full overflow-hidden">
      <img
        :src="imageUrl"
        class="object-cover w-full h-full saturate-0 dark:brightness-90 opacity-30"
        alt=""
      />
      <div
        class="absolute inset-0 mix-blend-multiply bg-gradient-to-r from-gray-100 to-gray-900/10"
      />
    </div>

    <header class="absolute inset-0 flex items-center justify-end">
      <!-- Title Container -->
      <div class="relative w-[900px] px-12 py-12">
        <div
          class="relative flex w-full px-2 py-2 overflow-hidden text-gray-900 border-4 rounded-br-3xl rounded-tl-3xl border-accent"
        >
          <div
            class="relative w-full px-12 py-12 bg-white rounded-br-xl rounded-tl-xl"
          >
            <h1
              v-if="title"
              class="font-serif text-5xl font-extrabold text-gray-900 color-em"
            >
              {{ title }}
            </h1>
            <p
              v-if="summary"
              class="mt-4 font-mono font-semibold text-gray-500 md:text-lg font-display"
            >
              {{ summary }}
            </p>
            <div class="flex items-center justify-between pt-4 mt-4 border-t">
              <VAvatar
                v-if="authorName"
                :author="{
                  first_name: authorName,
                  avatar_url: authorImage,
                }"
              />
              <p
                v-if="readTime"
                class="flex font-mono text-gray-500 dark:text-gray-300"
              >
                <Icon name="heroicons:clock" class="w-6 h-6 mr-2" />
                {{ readTime }}
              </p>
              <VBadge
                v-if="badgeLabel"
                size="lg"
                :color="badgeColor ?? 'gray'"
                >{{ badgeLabel }}</VBadge
              >
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="absolute top-8 right-8">
      <Logo class="h-12 text-white" />
    </div>
  </div>
</template>
