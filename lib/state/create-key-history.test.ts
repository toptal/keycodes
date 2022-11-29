import { KeyCodeEvent } from '../types/key-code-events'

import { createKeyHistory } from './create-key-history'

import { keyCodeMock, mockSimilarKeyCodeEvents } from '~/test/mock/key-code'

describe('Create key history function', () => {
  it('correctly sets history when there is no key on history', () => {
    const keyHistory: KeyCodeEvent[] = []

    expect(createKeyHistory(keyHistory, keyCodeMock)).toEqual([keyCodeMock])
  })

  it('correctly sets history when there are some key on history', () => {
    const keyHistory = [...mockSimilarKeyCodeEvents]

    expect(createKeyHistory(keyHistory, keyCodeMock)).toEqual([
      keyCodeMock,
      ...mockSimilarKeyCodeEvents
    ])
  })

  it('correctly sets history when there are maximum key on history', () => {
    const keyHistory = [keyCodeMock, ...mockSimilarKeyCodeEvents]

    expect(createKeyHistory(keyHistory, keyCodeMock)).toEqual([
      keyCodeMock,
      ...mockSimilarKeyCodeEvents
    ])
  })
})
