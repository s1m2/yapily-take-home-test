import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import NotFoundView from '@/views/NotFoundView.vue'

describe('NotFoundView', () => {
  it('renders the correct error message', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const errorMessage = wrapper.find('[data-cy="error-message"]')
    expect(errorMessage.text()).toBe("Sorry, we couldn't find that page")
  })

  it('renders the "Go back to Home" link', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const link = wrapper.find('[data-cy="go-back-home"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Go back to Home')
  })
})
