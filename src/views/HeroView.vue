<script setup lang="ts">
import { onBeforeMount, ref, defineAsyncComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMarvelStore } from '@/stores/marvel'
import { checkImagePath } from '@/lib/utils'
import type { Character } from '@/types/character'

const DetailsCard = defineAsyncComponent(() => import('@/components/DetailsCard.vue'))
const AppTabWrapper = defineAsyncComponent(() => import('@/components/common/AppTabWrapper.vue'))
const AppButton = defineAsyncComponent(() => import('@/components/common/AppButton.vue'))

const { marvelCharacter, currentPage } = storeToRefs(useMarvelStore())
const { getCharacter, updateCharacterDetails } = useMarvelStore()
const router = useRouter()
const route = useRoute()
const isEditMode = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const imageURL = ref()
const legendName = ref('')

function uploadFile(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  const reader = new FileReader()

  reader.onload = (e: ProgressEvent<FileReader>) => {
    imageURL.value = e.target?.result
  }

  if (!file) return
  reader.readAsDataURL(file)
}

function editDetails() {
  isEditMode.value = !isEditMode.value
}

async function initializeComponent() {
  await getCharacter(Number(route.params.id))
  if (marvelCharacter.value === undefined) return
  imageURL.value = checkImagePath(marvelCharacter.value as Character)
  legendName.value = marvelCharacter.value.name as string
  window.scrollTo(0, 0)
}

function saveInformation() {
  editDetails()
  if (marvelCharacter.value === undefined) return
  updateCharacterDetails(marvelCharacter.value.id, {
    name: legendName.value,
    thumbnail: imageURL.value
  })
}

onBeforeMount(async () => {
  initializeComponent()
})

watch(
  () => route.params.id,
  () => {
    initializeComponent()
  }
)
</script>

<template>
  <div class="mx-4 max-w-screen-xl md:mx-auto mt-20">
    <div class="-rotate-6 -skew-y-6 bg-red-600 p-6 w-fit mb-6">
      <p data-cy="legend-name" class="text-2xl md:text-3xl text-white font-extrabold">
        LEGEND: {{ legendName }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <img :src="imageURL" :alt="marvelCharacter?.name" class="w-96 h-96 object-cover" />
        <input
          ref="fileInput"
          type="file"
          name="file"
          id="file"
          v-if="isEditMode"
          class="w-4/5 text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-red-600 file:hover:bg-gray-700 file:text-white"
          @change="uploadFile"
        />
      </div>

      <div>
        <DetailsCard
          v-model="legendName"
          :character="marvelCharacter"
          :isEditMode="isEditMode"
          v-if="marvelCharacter"
        />
        <AppTabWrapper v-if="marvelCharacter" />
      </div>
    </div>

    <div class="flex justify-between gap-4 my-28">
      <AppButton @click="editDetails" v-if="!isEditMode"> Edit Details </AppButton>
      <AppButton @click="saveInformation" v-if="isEditMode"> Save Information </AppButton>
      <AppButton @click="router.push({ name: 'home', params: { page: currentPage } })">
        Go Back Home
      </AppButton>
    </div>
  </div>
</template>
