import { findSimilarKeys } from './find-similar-keys'

import { keyCodesWithEvents } from '~/lib/keycodes/with-events'

describe('Find similar keys function', () => {
  it('correctly find similar keys', () => {
    const code = {
      keyCode: 1,
      key: '1',
      which: 1
    }

    expect(findSimilarKeys(code)).toEqual([
      keyCodesWithEvents[3],
      keyCodesWithEvents[8],
      keyCodesWithEvents[9]
    ])
  })

  it('correctly find similar for f keycodes', () => {
    const code = {
      keyCode: 115,
      key: '115',
      which: 115
    }

    expect(findSimilarKeys(code)).toEqual([
      keyCodesWithEvents[114],
      keyCodesWithEvents[116],
      keyCodesWithEvents[117]
    ])
  })

  it('correctly find similar keys for first keycode', () => {
    const code = {
      keyCode: 0,
      key: '0',
      which: 0
    }

    expect(findSimilarKeys(code)).toEqual([
      keyCodesWithEvents[3],
      keyCodesWithEvents[8],
      keyCodesWithEvents[9]
    ])
  })

  it('doesnt show similar keys if there is no code of the similar keys', () => {
    const code = {
      keyCode: 255,
      key: '255',
      which: 255
    }

    expect(findSimilarKeys(code)).toEqual([])
  })
})
