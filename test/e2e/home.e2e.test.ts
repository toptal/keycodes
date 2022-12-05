import { keyCodes } from '~/test/mock/key-code'
import {
  checkKeyCodePage,
  waitForTextToBeAttached
} from '~/test/e2e/lib/helpers'
import { Device, devices, getPageLocators } from '~/test/e2e/lib'
import { siteCopy } from '~/lib/constants/site-copy'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'
import { test, expect } from '~/test/e2e/lib/baseFixtures'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows proper title', async ({ page }) => {
    const title = siteCopy.titles.main
    const actualTitle = await page.textContent('h1')

    expect(actualTitle).toEqual(title)
  })

  for (const [key, keycode] of keyCodes) {
    test(`press ${key} on keyboard and shows the keycode content on home page`, async ({
      page
    }) => {
      await waitForTextToBeAttached(page, siteCopy.titles.homePageMessage)
      await page.keyboard.press(key)
      await waitForTextToBeAttached(
        page,
        `${siteCopy.titles.main} ${keycode.which}`
      )
      await checkKeyCodePage(page, keycode)
    })
  }

  for (const { device, viewport } of devices.filter(
    device => device.device !== Device.Desktop
  )) {
    test.describe(`on ${device}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize(viewport)
        await page.goto('/')
      })

      test('clicks to mobile input and shows the keycode content on home page', async ({
        page
      }) => {
        await getPageLocators(page).MobileInputElement.type('t')
        await checkKeyCodePage(page, keyCodesWithEvents[84])
      })
    })
  }
})
