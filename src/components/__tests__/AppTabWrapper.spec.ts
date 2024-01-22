import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { character } from '@/mocks/charcterMock'
import AppTabWrapper from '@/components/common/AppTabWrapper.vue'
import AppList from '@/components/common/AppList.vue'

describe('AppTabWrapper', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AppTabWrapper, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    wrapper.vm.$nextTick(() => {
      wrapper.getComponent(AppList).props().list = character.comics.items
    })
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
