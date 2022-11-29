import { renderHook } from '@testing-library/react'

import { useTouchDevice } from './use-touch-device.hook'

const original = global.window.ontouchstart
const touchMock = jest.fn()
const originalTouchPoints = global.navigator

describe('Use touch device hook', () => {
  afterEach(() => {
    global.navigator = originalTouchPoints
    global.window.ontouchstart = original
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false
      }))
    })
  })

  it('returns false without device touch', () => {
    const response = renderHook(() => useTouchDevice())

    expect(response.result.current).toBe(false)
  })

  it('returns true with touch points', () => {
    Object.defineProperty(global.navigator, 'maxTouchPoints', {
      value: 2
    })

    const response = renderHook(() => useTouchDevice())

    expect(response.result.current).toBe(true)
  })

  it('returns true with touch start function on window', () => {
    global.window.ontouchstart = touchMock

    const response = renderHook(() => useTouchDevice())

    expect(response.result.current).toBe(true)
  })
})
