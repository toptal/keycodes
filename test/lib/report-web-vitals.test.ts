import { Metric } from 'web-vitals'

import * as analytics from '~/lib/analytics'
import { reportWebVitals } from '~/lib/analytics/report-web-vitals'
import { TrackEventType } from '~/lib/types/analytics'

jest.mock('~/lib/analytics', () => ({
  __esModule: true,
  ...jest.requireActual('~/lib/analytics')
}))

jest.spyOn(analytics, 'trackEvent')

describe('reportWebVitals', () => {
  it.each<[Metric['name'], number]>([
    ['FCP', 100],
    ['CLS', 100 * 1000]
  ])('reports web vitals for %s', (metric, value) => {
    reportWebVitals({ name: metric, delta: 100, id: '1' } as Metric)

    expect(analytics.trackEvent).toHaveBeenCalledWith({
      action: metric,
      isWebVitals: true,
      params: {
        event_category: 'web_vitals',
        event_label: '1',
        value
      }
    } as TrackEventType)
  })
})
