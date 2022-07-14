import { BASE_PATH } from '../constants/common'

export const withBasePath = (href: string): string => {
  return `${BASE_PATH}${href}`
}
