import { test, expect } from '~/test/e2e/lib/baseFixtures'
import { getPageLocators } from '~/test/e2e/lib'

test.describe('Homepage - Cookie Banner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays cookie banner', async ({ page }) => {
    expect(
      await getPageLocators(page).CookieBannerContainer.isVisible()
    ).toBeTruthy()
  })

  test('closes cookie banner when accept', async ({ page }) => {
    await getPageLocators(page).CookieBannerAcceptButton.click()

    expect(
      await getPageLocators(page).CookieBannerContainer.isVisible()
    ).toBeFalsy()
  })
})
