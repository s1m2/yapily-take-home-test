<script setup lang="ts">
import { useMarvelStore } from '@/stores/marvel'
import { storeToRefs } from 'pinia'
import { onBeforeMount, defineAsyncComponent } from 'vue'
import { checkFromLocalStorage, invalidateLocalStorageIfExpired } from '@/lib/utils'

import MarvelLogo from '@/components/icons/MarvelLogo.vue'
import HeroCard from '@/components/HeroCard.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import AppButton from '@/components/common/AppButton.vue'

const AppNotification = defineAsyncComponent(
  () => import('@/components/common/AppNotification.vue')
)

const { nextPage, previousPage, useFromLocalStorage } = useMarvelStore()
const { currentPageResults, loading, error } = storeToRefs(useMarvelStore())

const { getCharacters } = useMarvelStore()

onBeforeMount(async () => {
  invalidateLocalStorageIfExpired()
  if (checkFromLocalStorage('marvelCharacters')) {
    useFromLocalStorage()
  } else {
    await getCharacters()
  }
})
</script>

<template>
  <main class="mx-4 max-w-screen-xl md:mx-auto mt-10">
    <MarvelLogo data-cy="marvel-logo" class="mx-auto mb-12" />

    <p data-cy="heading" class="text-white font-extrabold text-6xl md:text-8xl mb-12 text-center">
      KNOW YOUR LEGENDS
    </p>

    <div class="grid-style md:mx-4" data-cy="container">
      <AppLoader v-if="loading" />

      <AppNotification v-if="error" type="error">
        <h4 class="font-bold">Unable to retrieve your legends</h4>
        <p class="font-semibold">
          We could not connect to the server due to a technical issue on our end. Please try
          reconnecting again
        </p>
      </AppNotification>

      <AppNotification v-if="!loading && !currentPageResults.length && !error" type="info">
        <h4 class="font-bold">No legends found</h4>
        <p class="font-semibold">We could not find any legends matching your search criteria</p>
      </AppNotification>

      <template v-if="!loading && currentPageResults.length">
        <HeroCard
          v-for="character in currentPageResults"
          :key="character.id"
          :character="character"
        />
      </template>
    </div>

    <div class="flex justify-between gap-4 my-28">
      <AppButton data-cy="previous" @click="previousPage">Previous</AppButton>
      <AppButton data-cy="next" @click="nextPage">Next</AppButton>
    </div>
  </main>
</template>

<style scoped>
.grid-style {
  --min: 18rem;
  --gap: 5rem;

  display: grid;
  grid-gap: var(--gap);
  /* min() with 100% prevents overflow
  in extra narrow spaces */
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
}
</style>
