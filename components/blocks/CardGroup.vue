<script setup lang="ts">
import { PropType } from 'vue'
type CardGroup = {
  id: string
  headline: string
  content: string
}
const props = defineProps({
  data: {
    type: Object as PropType<CardGroup>,
    required: true,
  },
})
</script>
<template>
  <BlockContainer>CardGroup</BlockContainer>
</template>
