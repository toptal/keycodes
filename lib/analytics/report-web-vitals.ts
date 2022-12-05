import { Metric } from 'web-vitals'

import { trackEvent } from '.'

export const reportWebVitals = ({ name, delta, id }: Metric): void => {
  trackEvent({
    action: name,
    isWebVitals: true,
    params: {
      event_category: 'web_vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta)
    }
  })
}
