import { Metric } from 'web-vitals'

import { isGtagDefined } from './utils/is-gtag-defined'

export interface EventParams {
  category: string
  label?: string | number
  value?: string | number
}

export interface ViewPageParams {
  // eslint-disable-next-line camelcase
  page_path: string
}

export interface TrackEventType {
  action: string
  params: EventParams
}

export const trackPageView = (url: string): void => {
  isGtagDefined &&
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
}

// log specific events happening.
export const trackEvent = ({ action, params }: TrackEventType): void => {
  isGtagDefined && window?.gtag('event', action, params)
}

export const sendToGoogleAnalytics = ({ name, delta, id }: Metric): void => {
  trackEvent({
    action: name,
    params: {
      category: 'web_vitals',
      label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    },
  })
}
