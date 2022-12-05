import { Page } from 'playwright'

import { getPageLocators } from '.'

import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { expect } from '~/test/e2e/lib/baseFixtures'

export const checkKeyCodePage = async (
  page: Page,
  keycode: KeyCodeEvent
): Promise<void> => {
  expect(await getPageLocators(page).TopAreaKeyCode.textContent()).toEqual(
    keycode.keyCode.toString()
  )

  expect(
    await getPageLocators(page).EventCodeCardContainer.textContent()
  ).toEqual(keycode.code)

  expect(
    await getPageLocators(page).EventDescriptionCardContainer.textContent()
  ).toEqual(keycode.description)

  expect(
    await getPageLocators(page).EventWhichCardContainer.textContent()
  ).toEqual(keycode.which.toString())

  expect(
    await getPageLocators(page).EventKeyCardContainer.textContent()
  ).toEqual(keycode.key)
}

export const waitForTextToBeAttached = async (
  page: Page,
  text: string
): Promise<void> => {
  const hastebinText2 = page.locator(`text=${text}`).first()

  await hastebinText2.waitFor({ state: 'attached' })
}
