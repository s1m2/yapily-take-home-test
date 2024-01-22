import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { getMarvelCharacters } from '@/lib/api'
import { createPaginatedResults, updateDetails } from '@/lib/utils'
import type { Character } from '@/types/character'

export const useMarvelStore = defineStore('marvel', () => {
  const router = useRouter()
  const marvelCharacters = ref<Character[]>(
    JSON.parse(localStorage.getItem('marvelCharacters') || '[]')
  )
  const marvelCharacter = ref<Character>()
  const paginatedResults = ref()
  const currentPageResults = ref<Character[]>([])
  const currentPage = ref(0)
  const searchTerm = ref('')
  const loading = ref(false)
  const error = ref(false)

  const filteredCharacters = computed<Character[]>(() => {
    if (!searchTerm.value) return currentPageResults.value
    return marvelCharacters.value.filter((character) => {
      return character.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
  })

  function setDetails(data: Character[]) {
    marvelCharacters.value = data
    paginatedResults.value = createPaginatedResults(data).paginatedResults
    currentPageResults.value = paginatedResults.value[currentPage.value]
    localStorage.setItem('marvelCharacters', JSON.stringify(marvelCharacters.value))
  }

  function useFromLocalStorage() {
    const storedCharacters = localStorage.getItem('marvelCharacters')
    if (!storedCharacters) return
    setDetails(JSON.parse(storedCharacters))
  }

  async function getCharacters() {
    loading.value = true
    error.value = false
    try {
      const response = await getMarvelCharacters()
      const data = await response.json()
      setDetails(data.data.results)
      loading.value = false
      localStorage.setItem('timestamp', JSON.stringify({ timestamp: new Date().getTime() }))
    } catch (err) {
      loading.value = false
      error.value = true
      console.log(err)
    }
  }

  async function getCharacter(id: number) {
    marvelCharacter.value = marvelCharacters.value.find((character) => character.id === id)
  }

  function updateCharacterDetails(
    characterId: number,
    { name, thumbnail }: { name: string; thumbnail: string }
  ) {
    marvelCharacters.value = updateDetails(marvelCharacters.value, characterId, { name, thumbnail })
    localStorage.setItem('marvelCharacters', JSON.stringify(marvelCharacters.value))
  }

  function nextPage() {
    if (currentPage.value >= paginatedResults.value.length) return
    currentPage.value += 1
    router.push({ query: { page: currentPage.value } })
    currentPageResults.value = paginatedResults.value[currentPage.value]
  }

  function previousPage() {
    if (currentPage.value < 1) return
    currentPage.value -= 1
    router.push({ query: { page: currentPage.value } })
    currentPageResults.value = paginatedResults.value[currentPage.value]
  }

  return {
    currentPage,
    paginatedResults,
    marvelCharacters,
    loading,
    error,
    marvelCharacter,
    searchTerm,
    getCharacters,
    getCharacter,
    currentPageResults: filteredCharacters,
    nextPage,
    previousPage,
    updateCharacterDetails,
    useFromLocalStorage
  }
})
