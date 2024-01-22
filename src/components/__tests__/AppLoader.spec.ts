import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppLoader from '../common/AppLoader.vue'

describe('AppLoader', () => {
  it('should display 9 card that are pulsation', () => {
    const wrapper = mount(AppLoader)
    expect(wrapper.findAll("[data-cy='card']").length).toBe(9)
  })
})
