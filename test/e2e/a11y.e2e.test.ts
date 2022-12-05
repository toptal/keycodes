import { devices, getPageLocators } from '~/test/e2e/lib'
import { testA11y } from '~/test/e2e/lib/a11y'
import { test } from '~/test/e2e/lib/baseFixtures'

test.describe('Accessibility scan', () => {
  for (const { device, viewport } of devices) {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewport)
    })

    test(`finds no issues on keycode page on ${device}`, async ({ page }) => {
      await page.goto('/capslock')
      await getPageLocators(page).CookieBannerAcceptButton.click()
      await testA11y(page)
    })

    test(`finds no issues on home page on ${device}`, async ({ page }) => {
      await page.goto('/')
      await getPageLocators(page).CookieBannerAcceptButton.click()
      await testA11y(page)
    })

    test(`finds no issues on table page on ${device}`, async ({ page }) => {
      await page.goto('/table')
      await getPageLocators(page).CookieBannerAcceptButton.click()
      await testA11y(page)
    })
  }
})
