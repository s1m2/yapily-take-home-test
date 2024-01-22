import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useMarvelStore } from '@/stores/marvel'
import { checkFromLocalStorage, invalidateLocalStorageIfExpired } from '@/lib/utils'

vi.mock('@/lib/utils', () => {
  return {
    checkFromLocalStorage: vi.fn(),
    invalidateLocalStorageIfExpired: vi.fn()
  }
})

describe('HomeView', () => {

  let wrapper: any
  let store: any

  beforeEach(() => {
    wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    store = useMarvelStore()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('calls useFromLocalStorage when data is available in local storage', async () => {
    localStorage.setItem('marvelCharacters', JSON.stringify([]))

    const wrapper = mount(HomeView)
    await wrapper.vm.$nextTick()

    expect(invalidateLocalStorageIfExpired).toHaveBeenCalled()
    expect(checkFromLocalStorage).toHaveBeenCalledWith('marvelCharacters')
    //expect(store.useFromLocalStorage).toHaveBeenCalledOnce()
  })

  it('calls getCharacters when data is not available in local storage', async () => {

    localStorage.removeItem('marvelCharacters')

    const wrapper = mount(HomeView)
    await wrapper.vm.$nextTick()
 
    expect(invalidateLocalStorageIfExpired).toHaveBeenCalled()
    expect(checkFromLocalStorage).toHaveBeenCalledWith('marvelCharacters')
    expect(store.getCharacters).toHaveBeenCalled()
  })

  it('renders AppLoader when loading is true', () => {
    store.loading = true
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent({ name: 'AppLoader' }).exists()).toBe(true)
  })

  it('renders AppNotification with error type when error is present', async () => {
    store.error = true
    store.loading = false
    const wrapper = mount(HomeView)
    const appNotification = wrapper.findComponent({ name: 'AppNotification' })
    await wrapper.vm.$nextTick()
    console.log(appNotification)

    expect(appNotification.exists()).toBe(true)
    expect(appNotification.props('type')).toBe('error')
  })

  // it('renders AppNotification with info type when no legends are found', () => {
  //   store.loading = false
  //   store.error = false
  //   store.currentPageResults = []
  //   const wrapper = mount(HomeView)
  //   const appNotification = wrapper.findComponent({ name: 'AppNotification' })

  //   expect(appNotification.exists()).toBe(true)
  //   expect(appNotification.props('type')).toBe('info')
  //   expect(appNotification.find('h4').text()).toBe('No legends found')
  // })

  // it('renders HeroCard for each character in currentPageResults', () => {
  //   const currentPageResults = [
  //     { id: 1, name: 'Spider-Man' },
  //     { id: 2, name: 'Iron Man' }
  //   ]
  //   useMarvelStore.mockImplementation(() => ({
  //     ...useMarvelStore(),
  //     currentPageResults
  //   }))

  //   const wrapper = mount(HomeView)
  //   const heroCards = wrapper.findAllComponents({ name: 'HeroCard' })

  //   expect(heroCards.length).toBe(currentPageResults.length)
  //   currentPageResults.forEach((character, index) => {
  //     expect(heroCards[index].props('character')).toBe(character)
  //   })
  // })

  // it('calls previousPage when Previous button is clicked', async () => {
  //   const previousPage = jest.fn()
  //   useMarvelStore.mockImplementation(() => ({
  //     ...useMarvelStore(),
  //     previousPage
  //   }))

  //   const wrapper = mount(HomeView)
  //   const previousButton = wrapper.find('[data-cy="previous"]')
  //   await previousButton.trigger('click')

  //   expect(previousPage).toHaveBeenCalled()
  // })

  // it('calls nextPage when Next button is clicked', async () => {
  //   const nextPage = jest.fn()
  //   useMarvelStore.mockImplementation(() => ({
  //     ...useMarvelStore(),
  //     nextPage
  //   }))

  //   const wrapper = mount(HomeView)
  //   const nextButton = wrapper.find('[data-cy="next"]')
  //   await nextButton.trigger('click')

  //   expect(nextPage).toHaveBeenCalled()
  // })
})