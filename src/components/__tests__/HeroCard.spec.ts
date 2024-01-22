import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroCard from '@/components/HeroCard.vue'
import { character } from '@/mocks/charcterMock'

describe('HeroCard', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(HeroCard, {
      props: {
        character: character
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe(character.name)
  })
})
