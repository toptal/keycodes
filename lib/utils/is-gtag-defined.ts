import { isBrowser } from './is-browser'

export const isGtagDefined = isBrowser && typeof window.gtag === 'function'
