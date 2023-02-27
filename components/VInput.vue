<template>
  <div>
    <VLabel v-if="label" :label="label" />
    <div>
      <input
        :value="modelValue"
        :inputmode="type === 'number' ? 'decimal' : 'text'"
        :type="type"
        :name="name"
        :id="name"
        :class="['input', { 'text-right': type === 'number' }]"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
<script setup>
defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
})
</script>
<style>
.input {
  @apply block w-full dark:bg-gray-800 dark:text-white text-lg md:text-base border-gray-300 dark:border-gray-700  shadow-sm focus:ring-accent focus:border-accent placeholder:text-gray-400 dark:placeholder:text-gray-600;
}
</style>
