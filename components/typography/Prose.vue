<script setup lang="ts">
interface ProseProps {
  content: string
}

defineProps<ProseProps>()

const config = useRuntimeConfig()
const contentEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!contentEl.value) return

  // Intercept all the local links
  const anchors = contentEl.value.getElementsByTagName('a')

  Array.from(anchors).forEach((anchor) => {
    const url = anchor.getAttribute('href')
    if (!url) return

    // Skip external links
    if (!url.startsWith(config.public.siteUrl) && !url.startsWith('/')) return
    const path = url.replace(config.public.siteUrl, '')

    // Add on click event to anchor
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      navigateTo(url)
    })
  })
})
</script>

<template>
  <div
    ref="contentEl"
    :class="[
      'prose prose-sm md:prose-base lg:prose-lg dark:prose-invert prose-img:rounded-br-3xl prose-img:rounded-tl-3xl prose-img:border-2 prose-img:border-gray-500 prose-headings:font-serif prose-p:font-mono',
    ]"
    v-html="content"
  />
</template>
