export interface EventParams {
  // eslint-disable-next-line camelcase
  event_category: string
  // eslint-disable-next-line camelcase
  event_label?: string | number
  value?: string | number
}

export interface ViewPageParams {
  // eslint-disable-next-line camelcase
  page_path: string
}

export interface TrackEventType {
  action: string
  params: EventParams
  isWebVitals?: boolean
}
