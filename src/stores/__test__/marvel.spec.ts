import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMarvelStore } from '../marvel'

vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn()
  })
}))

vi.mock('@/lib/api', () => ({
  getMarvelCharacters: vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'Iron Man', thumbnail: 'ironman.jpg' },
          { id: 2, name: 'Captain America', thumbnail: 'captainamerica.jpg' }
        ]
      }
    })
  })
}))

describe('useMarvelStore', () => {
  let store: ReturnType<typeof useMarvelStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useMarvelStore()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should initialize with default values', () => {
    expect(store.loading).toBe(false)
    expect(store.error).toBe(false)
    expect(store.marvelCharacter).toBeUndefined()
    expect(store.searchTerm).toBe('')
    expect(store.currentPageResults).toEqual([])
  })

  it.skip('should fetch characters and update store', async () => {
    await store.getCharacters()

    expect(store.loading).toBe(false)
    expect(store.error).toBe(false)
    expect(store.marvelCharacters).toEqual(mockCharacters)
    expect(store.currentPageResults).toEqual(mockCharacters)
    expect(localStorage.getItem('marvelCharacters')).toBe(JSON.stringify(mockCharacters))
  })

  it('should fetch character details', () => {
    const mockCharacters = [
      { id: 1, name: 'Iron Man', thumbnail: 'ironman.jpg' },
      { id: 2, name: 'Captain America', thumbnail: 'captainamerica.jpg' },
    ]
    store.marvelCharacters = mockCharacters

    store.getCharacter(1)

    expect(store.marvelCharacter).toEqual(mockCharacters[0])
  })

  it.skip('should update character details', () => {
    const mockCharacters = [
      { id: 1, name: 'Iron Man', thumbnail: 'ironman.jpg' },
      { id: 2, name: 'Captain America', thumbnail: 'captainamerica.jpg' },
    ]
    store.marvelCharacters = mockCharacters

    const updatedName = 'Iron Man Updated'
    const updatedThumbnail = 'ironman-updated.jpg'
    store.updateCharacterDetails(1, { name: updatedName, thumbnail: updatedThumbnail })

    expect(store.marvelCharacters[0].name).toStrictEqual('Iron Man Updated')
    expect(localStorage.getItem('marvelCharacters')).toBe(JSON.stringify(store.marvelCharacters.value))
  })

  it('should navigate to the next page', () => {
    store.currentPage = 0
    store.paginatedResults = [[{ id: 1, name: 'Iron Man', thumbnail: 'ironman.jpg' }], []]

    store.nextPage()

    expect(store.currentPage).toBe(1)
    expect(store.currentPageResults).toEqual([])
  })

  it('should navigate to the previous page', () => {
    store.currentPage = 1
    store.paginatedResults = [[], [{ id: 1, name: 'Iron Man', thumbnail: 'ironman.jpg' }]]

    store.previousPage()

    expect(store.currentPage).toBe(0)
    expect(store.currentPageResults).toEqual([])
  })
})
