<script setup lang="ts">
import { PropType } from 'vue'
type Columns = {
  id: string
  title: string
  headline: string
  rows: Array<{
    id: string
    title: string
    headline: string
    content: string
    image: string
    image_position: string
  }>
}
const props = defineProps({
  data: {
    type: Object as PropType<Columns>,
    required: true,
  },
})
</script>
<template>
  <section>Columns</section>
</template>
