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
