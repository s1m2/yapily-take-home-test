import { describe, it, beforeEach, vi, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useMarvelStore } from '@/stores/marvel'
import { mount } from '@vue/test-utils'
import AppHeader from '../common/AppHeader.vue'

describe('AppHeader', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = mount(AppHeader, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const store = useMarvelStore()
    store.searchTerm = 'Hulk'
  })

  it('renders properly', () => {
    expect(wrapper.find('input').isVisible()).toBe(true)
  })
})
