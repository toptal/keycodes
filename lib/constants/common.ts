// FIXME: fill up with actual data
const PROJECT_DISPLAY_NAME = 'Keycodes'
const PROJECT_URL = 'http://localhost:3000/'
const PROJECT_DESCRIPTION = `${PROJECT_DISPLAY_NAME} project description`
const TWITTER_HANDLE = '@toptal'
const OG_TITLE = `${PROJECT_DISPLAY_NAME}  - Project description`
const OG_IMAGE_URL = `${PROJECT_URL}og-image.png`
const CONTENT_GROUP = PROJECT_DISPLAY_NAME
const BOUNCE_RATE_TIMEOUT = 15000
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export {
  BASE_PATH,
  BOUNCE_RATE_TIMEOUT,
  CONTENT_GROUP,
  OG_IMAGE_URL,
  OG_TITLE,
  PROJECT_DESCRIPTION,
  PROJECT_DISPLAY_NAME,
  PROJECT_URL,
  TWITTER_HANDLE
}
