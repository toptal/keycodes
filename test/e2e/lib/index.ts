import type { Page, Locator } from 'playwright'

import { TestIdEventDescriptionCard } from '~/components/key-code-cards/basic-cards/DescriptionCard/test-ids'
import { TestIdEventCodeCard } from '~/components/key-code-cards/basic-cards/EventCodeCard/test-ids'
import { TestIdEventKeyCard } from '~/components/key-code-cards/basic-cards/EventKeyCard/test-ids'
import { TestIdEvenLocationCard } from '~/components/key-code-cards/basic-cards/EventLocationCard/test-ids'
import { TestIdEvenWhichCard } from '~/components/key-code-cards/basic-cards/EventWhichCard/test-ids'
import { TestIdMessageBox } from '~/components/MessageBox/test-ids'
import { TestIdMobileInput } from '~/components/MobileInput/test-ids'
import { TestIdTopArea } from '~/components/TopArea/test-ids'

export enum Device {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Ipad = 'ipad'
}

export const devices = [
  { device: Device.Desktop, viewport: { width: 1440, height: 900 } },
  { device: Device.Mobile, viewport: { width: 375, height: 640 } },
  { device: Device.Ipad, viewport: { width: 768, height: 1024 } }
]

const byTestId = (testId: string) => `[data-testid=${testId}]`

export const pages = ['/', '/q', '/arrow-up', '/table']

function createTestIdSelectors<T>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([name, testId]) => [name, byTestId(testId)])
  ) as { [name in keyof T]: string }
}

const pageSelectors = {
  MetaDescription: 'meta[name="description"]',
  MetaOgDescription: 'meta[property="og:description"]',
  MetaOgTitle: 'meta[property="og:title"]',
  PageTitleHead: 'head > title',
  KeyCodesTable: 'main > table',
  KeyCodesList: 'main > div[role=list]',
  CookieBannerContainer: byTestId('cookie-banner'),
  CookieBannerAcceptButton: byTestId('cookie-banner-accept'),
  HeaderTableButton: 'header > div > button[role=button]',
  ...createTestIdSelectors(TestIdTopArea),
  ...createTestIdSelectors(TestIdEventCodeCard),
  ...createTestIdSelectors(TestIdEvenLocationCard),
  ...createTestIdSelectors(TestIdEvenWhichCard),
  ...createTestIdSelectors(TestIdEventDescriptionCard),
  ...createTestIdSelectors(TestIdEventKeyCard),
  ...createTestIdSelectors(TestIdMessageBox),
  ...createTestIdSelectors(TestIdMobileInput)
}

export const getPageLocators = (
  page: Page
): { [name in keyof typeof pageSelectors]: Locator } =>
  Object.fromEntries(
    Object.entries(pageSelectors).map(([key, selector]) => [
      key,
      page.locator(selector)
    ])
  ) as { [name in keyof typeof pageSelectors]: Locator }
