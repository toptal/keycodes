/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitForTextToBeAttached } from './lib/helpers'

import { Device, devices, getPageLocators } from '~/test/e2e/lib'
import routes from '~/lib/constants/routes'
import { test, expect } from '~/test/e2e/lib/baseFixtures'
import { siteCopy } from '~/lib/constants/site-copy'

test.describe('Table page', () => {
  const ipad = devices.find(device => device.device === Device.Ipad)!
  const mobile = devices.find(device => device.device === Device.Mobile)!

  test(`shows table for ${ipad.device} and higher`, async ({ page }) => {
    await page.setViewportSize(ipad.viewport)
    await page.goto(routes.table)

    const table = getPageLocators(page).KeyCodesTable
    const list = getPageLocators(page).KeyCodesList

    expect(await table.isVisible()).toBe(true)
    expect(await list.isVisible()).toBe(false)
  })

  test(`shows list for ${mobile.device}`, async ({ page }) => {
    await page.setViewportSize(mobile.viewport)
    await page.goto(routes.table)

    const table = getPageLocators(page).KeyCodesTable
    const list = getPageLocators(page).KeyCodesList

    expect(await list.isVisible()).toBe(true)
    expect(await table.isVisible()).toBe(false)
  })

  test(`accessed through table button for ${ipad.device} and higher`, async ({
    page
  }) => {
    await page.setViewportSize(ipad.viewport)
    await page.goto(routes.home)

    await getPageLocators(page).HeaderTableButton.click()
    await waitForTextToBeAttached(page, siteCopy.titles.tablePage)
    await page.waitForURL(routes.table)

    const table = getPageLocators(page).KeyCodesTable
    const list = getPageLocators(page).KeyCodesList

    expect(await table.isVisible()).toBe(true)
    expect(await list.isVisible()).toBe(false)
  })

  test(`accessed through table button for ${mobile.device}`, async ({
    page
  }) => {
    await page.setViewportSize(mobile.viewport)
    await page.goto(routes.home)

    await getPageLocators(page).HeaderTableButton.click()
    await waitForTextToBeAttached(page, siteCopy.titles.tablePage)
    await page.waitForURL(routes.table)

    const table = getPageLocators(page).KeyCodesTable
    const list = getPageLocators(page).KeyCodesList

    expect(await list.isVisible()).toBe(true)
    expect(await table.isVisible()).toBe(false)
  })
})
