import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import AppTabs from '../common/AppTabs.vue'

describe('AppTabs', () => {
  let wrapper: any
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3']
  beforeEach(() => {
    wrapper = mount(AppTabs, {
      propsData: { tabs }
    })
  })

  it('renders properly', async () => {
    const tabButtons = wrapper.findAll('button')
    expect(tabButtons.length).toBe(tabs.length)
  })

  it('should currentTab to the selected tab', async () => {
    wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.vm.currentTab).toBe(tabs[1])
  })
})
