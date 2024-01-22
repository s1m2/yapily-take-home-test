<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  type: 'success' | 'error' | 'info'
}>()

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100 text-green-800'
    case 'error':
      return 'bg-red-600 text-white'
    case 'info':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
})
</script>

<template>
  <div data-cy="notification" class="shadow-lg p-4" :class="typeClass">
    <slot></slot>
  </div>
</template>
