<script setup lang="ts">
// Import the $directus plugin
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()

// Get the params from the Nuxt route
const { params, path } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: projects,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('projects').readByQuery({
      filter: {
        // status: { _eq: 'published' },
      },

      fields: [],
    })
  },
  {
    transform: (data) => data.data,
    // pick: [],
  }
)

function isEven(n: number) {
  return n % 2 == 0
}

useHead({
  title: 'Projects',
})
</script>
<template>
  <PageContainer>
    <header class="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
      <TypographyTitle>Agency Projects</TypographyTitle>
      <TypographyHeadline
        content="<p>We kill it for you <em>(our clients)</em>.</p>"
      />
    </header>
    <section class="relative items-center w-full py-12">
      <TypographyTitle>Latest Projects</TypographyTitle>
      <div class="grid gap-6 mt-4 md:grid-cols-3">
        <NuxtLink
          v-for="(project, projectIdx) in projects"
          :key="project.id"
          :href="`/projects/${project.slug}`"
          :class="[
            {
              'rounded-br-3xl rounded-tl-3xl': isEven(projectIdx),
              'rounded-bl-3xl rounded-tr-3xl': !isEven(projectIdx),
            },
            'block relative w-full mb-6 overflow-hidden border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition duration-300 p-2',
          ]"
        >
          <div
            :class="[
              {
                'rounded-br-2xl rounded-tl-2xl': isEven(projectIdx),
                'rounded-bl-2xl rounded-tr-2xl': !isEven(projectIdx),
              },
              'relative group overflow-hidden h-56',
            ]"
          >
            <img
              :src="fileUrl(project.image)"
              class="object-cover transition duration-300 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75"
            >
              <div class="p-8">
                <TypographyTitle>{{ project.client }}</TypographyTitle>
                <TypographyHeadline :content="project.title" />
                <div class="mt-2">
                  <VBadge
                    class="mb-2 mr-2"
                    v-for="(item, itemIdx) in project.built_with"
                    size="lg"
                    color="#0f172a"
                  >
                    {{ item }}
                  </VBadge>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </PageContainer>
</template>
