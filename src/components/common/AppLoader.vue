<script setup lang="ts">
import { ref } from 'vue'

const cards = ref(new Array(9))
</script>

<template>
  <div class="animate-pulse" v-for="(card, index) in cards" :key="index">
    <div data-cy="card" class="bg-slate-500 h-72 w-full md:w-72"></div>
  </div>
</template>
