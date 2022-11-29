import { createKeyVisual } from './create-key-visual'

import { META_KEYS } from '~/lib/constants/meta-keys'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

describe('Create key visual', () => {
  it.each<[Partial<KeyCodeEvent>, string]>([
    [{ metaKey: true, keyCode: 91 }, META_KEYS.metaKey.code],
    [{ shiftKey: true, keyCode: 16 }, META_KEYS.shiftKey.code],
    [{ altKey: true, keyCode: 17 }, META_KEYS.altKey.code],
    [{ ctrlKey: true, keyCode: 18 }, META_KEYS.ctrlKey.code],
    [{ keyCode: 9, key: 'Tab' }, '↹'],
    [{ keyCode: 3, key: 'key' }, 'KEY']
  ])('return correct result for %s', (input, output) => {
    expect(createKeyVisual(input as KeyCodeEvent)).toEqual(output)
  })
})
