import { keyCodes } from '~/test/mock/key-code'
import {
  checkKeyCodePage,
  waitForTextToBeAttached
} from '~/test/e2e/lib/helpers'
import { test } from '~/test/e2e/lib/baseFixtures'
import { siteCopy } from '~/lib/constants/site-copy'

test.describe('Keycode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  for (const [key, keycode, keyURL] of keyCodes) {
    test(`opens the keycode page with url ${keyURL}`, async ({ page }) => {
      await page.goto(keyURL)
      await checkKeyCodePage(page, keycode)
    })

    test(`press ${key} on keyboard on keycode page and opens home page with keycode content`, async ({
      page
    }) => {
      await page.goto(keyURL)
      await page.keyboard.press(key)
      await waitForTextToBeAttached(
        page,
        `${siteCopy.titles.main} ${keycode.which}`
      )
      await checkKeyCodePage(page, keycode)
    })
  }
})
