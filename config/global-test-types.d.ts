import type { Page } from 'playwright'

declare global {
  const BASE_URL: string
  const page: Page
}
