import { describe, it, beforeEach, vi, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useMarvelStore } from '@/stores/marvel'
import { mount } from '@vue/test-utils'
import AppHeader from '../common/AppHeader.vue'
import { useRoute } from 'vue-router'

vi.mock('vue-router')

describe('AppHeader', () => {
  let wrapper: any

  vi.mocked(useRoute).mockReturnValue({
    name: 'home'
  })

  beforeEach(() => {
    wrapper = mount(AppHeader, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: ['router-link']
      }
    })

    const store = useMarvelStore()
    store.searchTerm = 'Hulk'
  })

  it('renders properly', () => {
    expect(wrapper.find('input').isVisible()).toBe(true)
  })
})
