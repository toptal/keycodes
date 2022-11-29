import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { keyCodesWithEvents } from '../keycodes/with-events'

import {
  useKeyHistory,
  setKeyFromHistoryOrKeyCodes
} from './use-key-history.hook'

import { MOCK_CONTEXT_PROPS } from '~/test/mock/context'
import * as UseKeyCode from '~/lib/state/use-key-code'
import { keyCodeMock, mockKeyCodeEvent } from '~/test/mock/key-code'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockBeforePopState = jest.fn()
const router = { push: jest.fn(), beforePopState: mockBeforePopState }

useRouter.mockReturnValue(router)

jest.mock('~/lib/state/use-key-code', () => ({
  __esModule: true,
  ...jest.requireActual('~/lib/state/use-key-code')
}))

describe('Use Key history hook', () => {
  it('does not add to key history if history is not empty', async () => {
    const mockUseKeyCodeState = jest.spyOn(UseKeyCode, 'useKeyCodeState')

    mockUseKeyCodeState.mockReturnValue({
      ...MOCK_CONTEXT_PROPS,
      keyHistory: [keyCodeMock, keyCodeMock, keyCodeMock]
    })

    renderHook(() => useKeyHistory(mockKeyCodeEvent))

    expect(MOCK_CONTEXT_PROPS.addToKeyHistory).not.toHaveBeenCalledWith(
      mockKeyCodeEvent
    )
  })

  it('add to key history if history is empty', async () => {
    const mockUseKeyCodeState = jest.spyOn(UseKeyCode, 'useKeyCodeState')

    mockUseKeyCodeState.mockReturnValue({
      ...MOCK_CONTEXT_PROPS,
      keyHistory: []
    })

    renderHook(() => useKeyHistory(mockKeyCodeEvent))

    expect(MOCK_CONTEXT_PROPS.addToKeyHistory).toHaveBeenCalledWith(
      mockKeyCodeEvent
    )
  })

  it('returns false without device touch', async () => {
    renderHook(() => useKeyHistory())

    await act(async () => {
      history.back()
    })

    await waitFor(() => {
      expect(mockBeforePopState).toHaveBeenCalled()
    })
  })

  describe('SetKeyFromHistoryOrKeyCodes function', () => {
    const setKey = jest.fn()
    const keyHistory = [keyCodeMock]

    it('sets key from history when url is home page', async () => {
      const result = setKeyFromHistoryOrKeyCodes('/', setKey, keyHistory)

      expect(setKey).toHaveBeenCalledWith(keyCodeMock)
      expect(result).toBeTruthy()
    })

    it('sets key from keycodes and history when url is not home page', async () => {
      const result = setKeyFromHistoryOrKeyCodes(
        '/capslock',
        setKey,
        keyHistory
      )

      expect(setKey).toHaveBeenCalledWith(keyCodesWithEvents[20])

      expect(result).toBeTruthy()
    })

    it('it does not set key from history or keycodes when keycode is not found', async () => {
      setKeyFromHistoryOrKeyCodes('/teststestest', setKey, keyHistory)

      expect(setKey).not.toHaveBeenCalledWith()
    })
  })
})
