<template>
  <button
    :type="type"
    :class="[
      'btn',
      {
        'btn-default': variant === 'default',
        'btn-primary': variant === 'primary',
        'btn-outline': variant === 'outline',
        'btn-danger': variant === 'danger',
      },
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'default',
  },
})
</script>
