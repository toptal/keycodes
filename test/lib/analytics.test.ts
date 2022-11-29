import { trackEvent, trackPageRead, trackPageView } from '~/lib/analytics'
import type { TrackEventType } from '~/lib/types/analytics'

jest.mock('~/lib/utils/is-gtag-defined', () => ({
  isGtagDefined: true
}))

Object.defineProperty(global, 'window', {
  writable: true,
  value: { gtag: jest.fn() }
})

const gtagSpy = jest.spyOn(window, 'gtag')

const event: TrackEventType = {
  action: 'ButtonClick',
  params: { event_category: 'Editor - Freebuild' }
}

const eventIdentifier = `${event.params.event_category} - ${event.action}`

describe('trackEvent', () => {
  it('triggers event with given category and action', () => {
    trackEvent(event)

    expect(gtagSpy).toHaveBeenCalledWith('event', eventIdentifier, event.params)
  })
})

describe('trackPageRead', () => {
  it('triggers a page read event', () => {
    trackPageRead()

    expect(gtagSpy).toHaveBeenCalledWith('event', 'read', {
      event_category: '15_seconds'
    })
  })
})

describe('trackPageView', () => {
  it('triggers a page read event', () => {
    const testURL = '/test-url'

    trackPageView(testURL)

    expect(gtagSpy).toHaveBeenCalledWith('config', expect.any(String), {
      page_path: testURL
    })
  })
})
