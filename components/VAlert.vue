<template>
  <div
    :class="[
      'p-4 rounded-xl dark:brightness-90',
      {
        'bg-amber-100 text-amber-800': type === 'warning',
        'bg-red-100 text-red-800': type === 'error',
        'bg-green-100 text-green-800': type === 'success',
        'bg-blue-100 text-blue-800': type === 'info',
      },
    ]"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <component
          :is="iconMap[type]"
          :class="[
            'w-5 h-5',
            {
              'text-amber-600': type === 'warning',
              'text-red-600': type === 'error',
              'text-green-600': type === 'success',
              'text-blue-600': type === 'info',
            },
          ]"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/solid'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) =>
      ['info', 'success', 'warning', 'error'].includes(value),
  },
})

const iconMap = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
}
</script>
