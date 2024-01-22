import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DetailsCard from '@/components/DetailsCard.vue'
import { character } from '@/mocks/charcterMock'

describe('AppLoader', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(DetailsCard, {
      props: {
        character: character,
        isEditMode: false,
        modelValue: character.name
      }
    })
    expect(wrapper.find('h3').text()).toBe('Name')
    expect(wrapper.findAll('p')[0].text()).toBe(character.name)
  })

  it('should show the input element if edit mode is true', async () => {
    const wrapper = mount(DetailsCard, {
      props: {
        character: character,
        isEditMode: true,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })
    expect(wrapper.find('input').exists()).toBe(true)
    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test')
  })
})
