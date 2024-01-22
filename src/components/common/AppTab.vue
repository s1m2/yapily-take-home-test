<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  title: string
}>()

const selectedTab = inject('selectedTab')
</script>

<template>
  <div v-show="title === selectedTab">
    <slot />
  </div>
</template>
