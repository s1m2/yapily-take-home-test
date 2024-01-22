
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useMarvelStore } from '@/stores/marvel'
import { useRouter, useRoute } from 'vue-router'
import HeroView from '@/views/HeroView.vue'
import { character } from '@/mocks/charcterMock'

vi.mock('vue-router')

describe('HeroView', () => {
  let wrapper: any
  let store: any

  vi.mocked(useRouter).mockReturnValue({
    push: vi.fn()
  })

  vi.mocked(useRoute).mockReturnValue({
    params: {
      id: "1"
    }
  })

  beforeEach(() => {
    wrapper = mount(HeroView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: ['router-link']
      }
    })

    store = useMarvelStore()
    store.marvelCharacter = character
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the legend name', () => {
    expect(wrapper.find('[data-cy="legend-name"]').text()).toBe()
  })

  // it('uploads a file', async () => {
  //   const wrapper = mount(HeroView)
  //   const fileInput = wrapper.find('input[type="file"]')
  //   const file = new File([''], 'test.png', { type: 'image/png' })
  //   await fileInput.trigger('change', { target: { files: [file] } })
  //   expect(wrapper.vm.imageURL).toBe('data:image/png;base64,')
  // })

  // it('toggles edit mode', async () => {
  //   const wrapper = mount(HeroView)
  //   const editButton = wrapper.find('.edit-button')
  //   await editButton.trigger('click')
  //   expect(wrapper.vm.isEditMode).toBe(true)
  //   await editButton.trigger('click')
  //   expect(wrapper.vm.isEditMode).toBe(false)
  // })

  // it('saves character information', async () => {
  //   const wrapper = mount(HeroView)
  //   const saveButton = wrapper.find('.save-button')
  //   await saveButton.trigger('click')
  //   expect(wrapper.vm.isEditMode).toBe(false)
  // })

  // it('navigates back', async () => {
  //   const mockRouter = {
  //     back: jest.fn()
  //   }
  //   const wrapper = mount(HeroView, {
  //     global: {
  //       mocks: {
  //         $router: mockRouter
  //       }
  //     }
  //   })
  //   const backButton = wrapper.find('.back-button')
  //   await backButton.trigger('click')
  //   expect(mockRouter.back).toHaveBeenCalled()
  // })
})