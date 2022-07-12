import { isBrowser } from './is-browser'

export const isGtagDefined = isBrowser && window.gtag !== undefined
