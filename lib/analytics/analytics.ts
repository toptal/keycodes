import type { TrackEventType } from '../types/analytics'
import { isGtagDefined } from '../utils/is-gtag-defined'

export const trackPageRead = (): void => {
  isGtagDefined &&
    window.gtag('event', 'read', { event_category: '15_seconds' })
}

export const trackPageView = (url: string): void => {
  isGtagDefined &&
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url
    })
}

// log specific events happening.
export const trackEvent = ({
  action,
  params,
  isWebVitals
}: TrackEventType): void => {
  if (!isGtagDefined) {
    return
  }

  const eventIdentifier = isWebVitals
    ? action
    : `${params.event_category} - ${action}`

  window?.gtag('event', eventIdentifier, params)
}
