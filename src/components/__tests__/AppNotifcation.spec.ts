import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppNotification from '../common/AppNotification.vue'

describe('AppNotification', () => {
  it('should display a success class if prop is of type success', () => {
    const wrapper = mount(AppNotification, {
      props: {
        type: 'success'
      },
      slots: {
        default: 'Success message'
      }
    })
    expect(wrapper.find("[data-cy='notification']").classes()).toStrictEqual([
      'shadow-lg',
      'p-4',
      'bg-green-100',
      'text-green-800'
    ])
    expect(wrapper.html()).toContain('Success message')
  })

  it('should display a error class if prop is of type error', () => {
    const wrapper = mount(AppNotification, {
      props: {
        type: 'error'
      },
      slots: {
        default: 'Error message'
      }
    })
    expect(wrapper.find("[data-cy='notification']").classes()).toStrictEqual([
      'shadow-lg',
      'p-4',
      'bg-red-600',
      'text-white'
    ])
    expect(wrapper.html()).toContain('Error message')
  })

  it('should display a info class if prop is of info info', () => {
    const wrapper = mount(AppNotification, {
      props: {
        type: 'info'
      },
      slots: {
        default: 'Info message'
      }
    })
    expect(wrapper.find("[data-cy='notification']").classes()).toStrictEqual([
      'shadow-lg',
      'p-4',
      'bg-blue-100',
      'text-blue-800'
    ])
    expect(wrapper.html()).toContain('Info message')
  })
})
