<script setup lang="ts">
const props = defineProps({
  imageUrl: { type: String, default: '' },
  title: { type: String, default: '' },
  summary: { type: String, default: '' },
  authorName: { type: String, default: '' },
  authorImage: { type: String, default: '' },
  readTime: { type: String, default: '' },
  badgeLabel: { type: String, default: '' },
  badgeColor: { type: String, default: '' },
})
</script>
<template>
  <div class="relative w-[1200px] h-[630px] overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-accent"
    />
    <div class="absolute inset-0 grain-bg opacity-20" />
    <div
      v-if="imageUrl"
      class="absolute top-0 left-0 ml-6 mt-6 rounded-bl-3xl border-2 border-gray-700 overflow-hidden h-[450px] dark:outline-gray-800"
    >
      <img
        :src="imageUrl"
        class="object-cover w-full h-full saturate-0 dark:brightness-90"
        alt=""
      />
      <div
        class="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-gray-100 to-gray-900"
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
              <p class="flex font-mono text-gray-500 dark:text-gray-300">
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
    <div class="absolute bottom-8 right-8">
      <Logo class="h-12 text-white opacity-50" />
    </div>
  </div>
</template>
