import { testA11y } from '~/test/e2e/helpers/a11y'
import { test } from '~/test/e2e/helpers/baseFixtures'

const devices = [
  { width: 1440, height: 900 },
  { width: 375, height: 640 }
]

test.describe('Accessibility scan', () => {
  devices.forEach(viewport => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto('/')
    })

    test(`finds no issues on main page with width ${viewport.width} and height ${viewport.height}`, async ({
      page
    }) => {
      await testA11y(page)
    })
  })
})
