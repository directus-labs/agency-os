<template>
  <component :is="as" v-if="show || !leaved" v-motion="name">
    <slot />
  </component>
</template>

<script setup>
import { useMotions } from '@vueuse/motion'
const props = defineProps({
  as: { type: [String, Object], default: 'div' },
  name: { type: String, required: true },
  show: { type: Boolean, default: true },
})
const motions = useMotions()
const leaved = ref(!props.show)
watch(
  () => props.show,
  async (newShow) => {
    const motion = motions[props.name]
    if (motion && motion.isAnimating.value) {
      motion.stop('leave')
      if (newShow) {
        motion.apply('enter')
      }
    }
    if (!newShow) {
      leaved.value = false
      motion.leave(() => {
        leaved.value = true
      })
    }
  }
)
</script>
