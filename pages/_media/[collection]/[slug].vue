<script setup lang="ts">
import { calculateReadTime } from '~/utils/strings'

definePageMeta({
  layout: 'blank',
})

const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const { params, path, query } = useRoute()

const components = {
  og: resolveComponent('ImageOg'),
  square: resolveComponent('ImageSquare'),
}

const defaultImage =
  'https://images.unsplash.com/photo-1603202662706-62ead3176b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1569&q=80'
const defaultAuthorImage = fileUrl('d4fd6edc-4cc5-48c1-8bc7-e646924bbdca')
const defaultPropMap = {
  imageUrl: null,
  authorName: '',
  authorImage: '',
  readTime: '',
  badgeLabel: '',
  badgeColor: '',
}

const getQuery = (slug) => ({
  filter: {
    slug: { _eq: slug },
  },
  fields: ['*', 'seo.*'],
})

const mapping = (slug) => {
  return {
    posts: {
      query: getQuery(slug),
      propMap: (data) => ({
        ...defaultPropMap,
        title: data.seo ? data.seo.title : data.title,
        summary: data.seo ? data.seo.meta_description : data.summary,
        imageUrl: fileUrl(data.image),
        authorName: data.author
          ? `${data.author.first_name} ${data.author.last_name}`
          : '',
        authorImage: data.author ? fileUrl(data.author.avatar) : '',
        readTime: calculateReadTime(data.content),
        badgeLabel: data.category.title,
        badgeColor: data.category.color,
      }),
    },
    pages: {
      query: getQuery(slug),
      propMap: (data) => ({
        ...defaultPropMap,
        title: data.seo ? data.seo.title : data.title,
        summary: data.seo ? data.seo.meta_description : '',
        imageUrl: defaultImage,
        authorName: 'Your Web Experts',
        authorImage: defaultAuthorImage,
      }),
    },
    categories: {
      query: getQuery(slug),
      propMap: (data) => ({
        ...defaultPropMap,
        title: data.seo ? data.seo.title : data.title,
        summary: data.seo ? data.seo.title : data.title,
        badgeLabel: data.title,
        badgeColor: data.color,
      }),
    },
    projects: {
      query: getQuery(slug),
      propMap: (data) => ({
        ...defaultPropMap,
        title: data.seo ? data.seo.title : data.title,
        summary: data.seo ? data.seo.meta_description : '',
      }),
    },
  }
}

const {
  data: page,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus
      .items(params.collection)
      .readByQuery(mapping(params.slug)[params.collection].query)
  },
  {
    transform: (data) => data.data[0],
  }
)

const type = query.type || 'og'
</script>
<template>
  <component
    :is="components[type]"
    v-bind="mapping(params.slug)[params.collection].propMap(page)"
  />
</template>
