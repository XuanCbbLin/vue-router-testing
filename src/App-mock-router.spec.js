import App from '@/App.vue'
import { vi, expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { useRouter } from 'vue-router'

// mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

describe('change page', () => {
  it('should switch to /about', async () => {
    // arrange
    // stubs router-link, router-view
    const wrapper = mount(App, {
      global: {
        stubs: ['router-link', 'router-view']
      }
    })

    // 設定 useRouter push 回傳值
    const mockRouter = {
      push: vi.fn()
    }

    useRouter.mockReturnValue(mockRouter)

    console.log(wrapper.html())

    // act
    await wrapper.find('[data-test="about"]').trigger('click')

    // assert
    expect(useRouter().push).toHaveBeenCalledTimes(1)
  })
})
