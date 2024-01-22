import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTab from '../common/AppTab.vue'

describe('AppLoader', () => {
  it('should display tab content if the tab is selected', () => {
    const wrapper = mount(AppTab, {
      global: {
        provide: {
          selectedTab: 'comics'
        }
      },
      props: {
        title: 'comics'
      },
      slots: {
        default: '<div>Lets do this</div>'
      }
    })

    expect(wrapper.html()).toContain('Lets do this')
  })

  it('should not display tab content if the tab is not selected', () => {
    const wrapper = mount(AppTab, {
      global: {
        provide: {
          selectedTab: 'series'
        }
      },
      props: {
        title: 'comics'
      },
      slots: {
        default: '<div>Lets do this</div>'
      }
    })

    expect(wrapper.find('div').isVisible()).toBe(false)
  })
})
