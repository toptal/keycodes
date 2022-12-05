import type { Page } from 'playwright'

import {
  OG_TITLE,
  PROJECT_DESCRIPTION,
  TABLE_OG_DESCRIPTION,
  TABLE_OG_TITLE
} from '~/lib/constants/common'
import { test, expect } from '~/test/e2e/lib/baseFixtures'
import { getPageLocators, pages } from '~/test/e2e/lib'
import { siteCopy } from '~/lib/constants/site-copy'

const keyPages = ['/q', '/arrow-up']

const META_FOR_PAGES: Record<
  string,
  { title: string; description: string } | undefined
> = {
  '/': {
    title: 'JavaScript Key Code Event Tool | Toptal®',
    description:
      'KeyCode.Info allows users to press any key and instantly get the JavaScript Key or Key Code KeyboardEvent. Check out the Tool and Event List.'
  },
  '/q': {
    title: 'JavaScript Key Code for Q | Toptal®',
    description:
      'Find the JavaScript Key Code, event.key, event.location, similar values, and more for Q. Get started now.'
  },
  '/arrow-up': {
    title: 'JavaScript Key Code for Arrow up | Toptal®',
    description:
      'Find the JavaScript Key Code, event.key, event.location, similar values, and more for Arrow up. Get started now.'
  },
  '/Space': {
    title: 'JavaScript Key Code for Space | Toptal®',
    description:
      'Find the JavaScript Key Code, event.key, event.location, similar values, and more for Space. Get started now.'
  },
  '/table': {
    title: 'JavaScript Key Code List & Table | Toptal®',
    description:
      'Easily find every JavaScript Key Code in one table. Get started now.'
  }
}

test.describe('SEO validation', () => {
  test(`has correct title and description for homepage`, async ({ page }) => {
    await page.goto('/')

    const actualOgTitle = await getPageLocators(page).MetaOgTitle.getAttribute(
      'content'
    )
    const actualOgDescriptions = await getPageLocators(
      page
    ).MetaOgDescription.getAttribute('content')

    expect(actualOgTitle).toEqual(OG_TITLE)
    expect(actualOgDescriptions).toEqual(PROJECT_DESCRIPTION)
  })

  test(`has correct title and description for table page`, async ({ page }) => {
    await page.goto('/table')

    const actualOgTitle = await getPageLocators(page).MetaOgTitle.getAttribute(
      'content'
    )
    const actualOgDescriptions = await getPageLocators(
      page
    ).MetaOgDescription.getAttribute('content')

    expect(actualOgTitle).toEqual(TABLE_OG_TITLE)
    expect(actualOgDescriptions).toEqual(TABLE_OG_DESCRIPTION)
  })

  test('shows the keyCode in h2 on key page', async ({ page }) => {
    await page.goto('/q')

    const qKeyCode = 81
    const expectedH2 = `${siteCopy.titles.main} ${qKeyCode}`

    expect(await page.locator(`text=${expectedH2}`).isVisible()).toEqual(true)
  })

  for (const keyPage of keyPages) {
    test(`has correct title and description for key page ${keyPage}`, async ({
      page
    }) => {
      await page.goto(keyPage)

      const actualOgTitle = await getPageLocators(
        page
      ).MetaOgTitle.getAttribute('content')
      const actualOgDescriptions = await getPageLocators(
        page
      ).MetaOgDescription.getAttribute('content')
      const metaPageText = META_FOR_PAGES[keyPage]

      expect(actualOgTitle).toEqual(metaPageText?.title)
      expect(actualOgDescriptions).toEqual(metaPageText?.description)
    })
  }

  for (const pageUrl of pages) {
    test.describe('title and description validation for all pages', () => {
      let page: Page

      test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto(pageUrl)
      })

      test(`has non-empty title and description for page ${pageUrl}`, async () => {
        const title = await page.title()
        const ogTitle = await getPageLocators(page).MetaOgTitle.getAttribute(
          'content'
        )
        const description = await getPageLocators(
          page
        ).MetaDescription.getAttribute('content')
        const ogDescriptions = await getPageLocators(
          page
        ).MetaOgDescription.getAttribute('content')

        expect(title).toBeTruthy()
        expect(ogTitle).toBeTruthy()
        expect(description).toBeTruthy()
        expect(ogDescriptions).toBeTruthy()

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(title).toHaveLength(META_FOR_PAGES[pageUrl]!.title.length)
        expect(ogTitle?.length).toBeGreaterThan(20)
        expect(description?.length).toBeGreaterThan(20)
        expect(ogDescriptions?.length).toBeGreaterThan(20)
      })

      test(`has one title and one meta description tag for page ${pageUrl}`, async () => {
        const title = getPageLocators(page).PageTitleHead
        const titleTags = await title.evaluateAll(tags => tags.length)
        const description = getPageLocators(page).MetaDescription
        const descriptionTags = await description.evaluateAll(
          tags => tags.length
        )

        expect(titleTags).toEqual(1)
        expect(descriptionTags).toEqual(1)
      })
    })
  }
})
