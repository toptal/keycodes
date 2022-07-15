import { PROJECT_DISPLAY_NAME } from '~/lib/constants/common'
import { test, expect } from '~/test/e2e/helpers/baseFixtures'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows proper title', async ({ page }) => {
    const title = PROJECT_DISPLAY_NAME
    const actualTitle = await page.textContent('h1')

    expect(actualTitle).toEqual(title)
  })
})
