import App from '@/App.vue'
import { expect, describe, it, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'

// reference: https://github.com/posva/vue-router-mock#introduction
describe.skip('change page', () => {
  // create router mock
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockReset()
    }
  })
  beforeEach(() => {
    // global inject router mock
    injectRouterMock(router)
  })

  it('should switch to /about', async () => {
    // arrange
    const wrapper = mount(App)

    // act
    // click changePage navigate to /about
    await wrapper.find('[data-test="changePage"]').trigger('click')

    // assert
    expect(router.push).toHaveBeenCalledTimes(1) // or expect(wrapper.rootVM['$router'].push).toBeCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith('/about')
  })
})
