<script setup lang="ts">
defineProps<{ list: any[] }>()
</script>

<template>
  <div class="md:h-80" v-if="list.length === 0">
    <p class="text-white">No data available</p>
  </div>
  <div v-else class="md:columns-2 md:h-80">
    <p class="text-white mb-3" v-for="(listItem, index) in list" :key="index">
      {{ listItem.name }}
    </p>
  </div>
</template>
