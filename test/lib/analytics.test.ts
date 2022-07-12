import { TrackEventType, trackEvent } from '~/lib/analytics'

jest.mock('~/lib/utils/is-gtag-defined', () => ({
  isGtagDefined: true
}))

describe('trackEvent', () => {
  it('triggers event with given category and action', () => {
    Object.defineProperty(global, 'window', {
      writable: true,
      value: { gtag: jest.fn() }
    })

    const gtagSpy = jest.spyOn(window, 'gtag')

    const event: TrackEventType = {
      action: 'ButtonClick',
      params: { category: 'Editor - Freebuild' }
    }

    trackEvent(event)
    expect(gtagSpy).toHaveBeenCalledWith('event', event.action, event.params)
  })
})
