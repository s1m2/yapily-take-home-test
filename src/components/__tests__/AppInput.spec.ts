import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppInput from '@/components/shared/AppInput.vue'

describe('AppLoader', () => {
  it('render the input correctly and emits a value', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })
    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test')
  })
})
