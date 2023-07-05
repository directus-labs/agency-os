<script setup lang="ts">
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const { params, path } = useRoute()

const {
  data: project,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('projects').readByQuery({
      filter: { slug: { _eq: params.slug } },
      limit: 1,
      fields: ['*', 'gallery.directus_files_id.*'],
    })
  },
  {
    transform: (data) => data.data[0],
  }
)
</script>
<template>
  <div class="py-12">
    <div
      class="relative h-[400px] overflow-hidden flex justify-center items-center rounded-tr-[48px] rounded-bl-[48px]"
    >
      <img
        class="absolute inset-0 object-cover w-full h-full"
        :src="fileUrl(project.image)"
      />
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
      <div
        class="relative max-w-3xl p-8 mx-auto overflow-hidden bg-gray-900 bg-opacity-50 rounded-tr-3xl rounded-bl-3xl"
      >
        <TypographyHeadline
          :content="project.title"
          class="text-white"
          size="xl"
        />
        <p
          class="mt-4 font-mono font-semibold text-gray-300 md:text-lg font-display"
        >
          {{ project.summary }}
        </p>
      </div>
    </div>
    <main class="relative">
      <PageContainer class="max-w-6xl mx-auto md:flex">
        <main class="p-4">
          <article class="w-full">
            <!-- Main -->
            <TypographyProse :content="project.content" ref="article" />
          </article>

          <BlocksGallery
            v-if="project.gallery && project.gallery.length > 0"
            class="mt-8 overflow-hidden bg-white dark:bg-gray-800 rounded-tr-3xl rounded-bl-3xl"
            :data="{
              id: project.id,
              title: 'Gallery',
              gallery_items: project.gallery,
            }"
          />
        </main>
        <aside class="">
          <div
            class="space-y-8 md:w-[300px] flex-shrink-0 p-4 border-2 dark:border-gray-700 rounded-tr-2xl rounded-bl-2xl"
          >
            <div>
              <TypographyTitle>Client</TypographyTitle>
              <p class="font-mono font-bold dark:text-white">
                {{ project.client }}
              </p>
            </div>
            <div>
              <TypographyTitle>Built With</TypographyTitle>
              <div v-for="(item, itemIdx) in project.built_with" class="mt-2">
                <VBadge size="lg" color="#0f172a">{{ item }}</VBadge>
              </div>
            </div>
            <div>
              <TypographyTitle>Cost</TypographyTitle>
              <p class="font-mono font-bold dark:text-white">
                {{ project.cost }}
              </p>
            </div>
          </div>
        </aside>
      </PageContainer>
    </main>
  </div>
</template>
