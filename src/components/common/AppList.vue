<script setup lang="ts">
type ListItem = {
  name: string
}

type Props = {
  list: ListItem[]
}
defineProps<Props>()
</script>

<template>
  <div v-if="list.length === 0">
    <p class="text-white">No data available</p>
  </div>
  <div v-else class="md:columns-2">
    <p class="text-white mb-3" v-for="(listItem, index) in list" :key="`${index}-${listItem.name}`">
      {{ listItem.name }}
    </p>
  </div>
</template>
