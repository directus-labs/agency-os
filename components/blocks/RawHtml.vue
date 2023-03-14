<script setup lang="ts">
import { PropType } from 'vue'
type RawHtml = {
  id: string
  raw_html: string
}
const props = defineProps({
  data: {
    type: Object as PropType<RawHtml>,
    default: () => ({}),
  },
})
</script>
<template>
  <section v-html="data.raw_html" />
</template>
