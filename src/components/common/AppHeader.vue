<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMarvelStore } from '@/stores/marvel'
import AppInput from '@/components/shared/AppInput.vue'

const { searchTerm, currentPageResults } = storeToRefs(useMarvelStore())
const router = useRouter()
const route = useRoute()

function goToHeroDetails(id: number) {
  router.push(`/hero/${id}`)
  searchTerm.value = ''
}
</script>

<template>
  <header class="bg-red-600 p-5 relative">
    <AppInput
      v-model="searchTerm"
      class="p-3 w-full md:w-3/5"
      autocomplete="off"
      placeholder="Search for your favourite legend ......"
    />

    <div
      v-if="route.name !== 'home' && currentPageResults.length && searchTerm.length > 1"
      class="bg-white absolute p-7 top-20 w-full md:w-3/5 z-50"
    >
      <button
        class="text-left block p-2 w-full hover:bg-red-600 hover:text-white"
        v-for="legend in currentPageResults"
        :key="legend.id"
        @click="goToHeroDetails(legend.id)"
      >
        {{ legend.name }}
      </button>
    </div>
  </header>
</template>
