import { BASE_PATH } from '~/lib/constants/common'

const routes = {
  developers: 'https://www.toptal.com/developers',
  freelance: 'https://www.toptal.com/freelance-jobs',
  home: `/`,
  tos: 'https://www.toptal.com/tos',
  privacy: 'https://www.toptal.com/privacy',
  toptalHome: 'https://www.toptal.com/',
  utilities: 'https://www.toptal.com/utilities-tools',
  publicRelative: (fileName: string): string => `${BASE_PATH}${fileName}`
}

export default routes
