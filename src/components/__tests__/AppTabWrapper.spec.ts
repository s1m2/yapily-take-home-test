import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { character } from '@/mocks/charcterMock'
import { useMarvelStore } from '@/stores/marvel'
import AppTabWrapper from '@/components/common/AppTabWrapper.vue'

describe('AppTabWrapper', () => {
  let wrapper: any
  let store: any;

  beforeEach(() => {
    wrapper = mount(AppTabWrapper, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    store = useMarvelStore()
    store.marvelCharacter = character
  })

  it('renders the correct tabs', () => {
    const tabs = wrapper.findAll('[data-cy="tab-button"]')
    expect(tabs.length).toBe(4)
    expect(tabs.at(0).text()).toBe('Comics')
    expect(tabs.at(1).text()).toBe('Series')
    expect(tabs.at(2).text()).toBe('Stories')
    expect(tabs.at(3).text()).toBe('Events')
  })
})
