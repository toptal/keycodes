const PROJECT_DISPLAY_NAME = 'Keycodes'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
const PROJECT_URL = `${process.env.NEXT_PUBLIC_PROJECT_URL}${BASE_PATH}`
const PROJECT_DESCRIPTION =
  'KeyCode.Info allows users to press any key and instantly get the JavaScript Key or Key Code KeyboardEvent. Check out the Tool and Event List.'
const TWITTER_HANDLE = '@toptal'
const OG_TITLE = 'JavaScript Key Code Event Tool | Toptal®'
const OG_IMAGE_URL = `${PROJECT_URL}og-image.png`
const CONTENT_GROUP = PROJECT_DISPLAY_NAME
const BOUNCE_RATE_TIMEOUT = 15000

const TABLE_OG_TITLE = 'JavaScript Key Code List & Table | Toptal®'
const TABLE_OG_DESCRIPTION =
  'Easily find every JavaScript Key Code in one table. Get started now.'

export {
  BASE_PATH,
  BOUNCE_RATE_TIMEOUT,
  CONTENT_GROUP,
  OG_IMAGE_URL,
  OG_TITLE,
  PROJECT_DESCRIPTION,
  PROJECT_DISPLAY_NAME,
  PROJECT_URL,
  TWITTER_HANDLE,
  TABLE_OG_TITLE,
  TABLE_OG_DESCRIPTION
}
