import App from '@/App.vue'
import { vi, expect, describe, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

// Using a real router with Composition API(https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-real-router-with-composition-api)
const router = createRouter({
  history: createWebHistory(),
  routes
})

describe.skip('change page', () => {
  beforeEach(async () => {
    // navigate to the home page
    router.push('/')
    await router.isReady()
  })

  it('should switch to /about', async () => {
    // Arrange
    const wrapper = mount(App, {
      global: {
        // install vue-router
        plugins: [router]
      }
    })

    // Act
    // spy on router.push
    const push = vi.spyOn(router, 'push')

    await wrapper.find('[data-test="about"]').trigger('click')

    // Assert
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/about')
  })
})
