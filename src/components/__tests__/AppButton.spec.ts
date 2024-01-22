import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppButton from '../common/AppButton.vue'

describe('AppButton', () => {
  it('renders properly', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Select Your Hero'
      }
    })
    expect(wrapper.html()).toContain('Select Your Hero')
  })
})
