import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppList from '../common/AppList.vue'

describe('AppList', () => {
  it('should display a list', () => {
    const wrapper = mount(AppList, {
      props: {
        list: [{ name: 'Flash Gordon ' }]
      }
    })
    expect(wrapper.html()).toContain('Flash Gordon')
  })

  it('should display a message if the list is empty', async () => {
    const wrapper = mount(AppList, {
      props: {
        list: []
      }
    })
    expect(wrapper.html()).toContain('No data available')
  })
})
