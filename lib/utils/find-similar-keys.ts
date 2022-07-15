import { findBestMatch, Rating } from 'string-similarity'

import { keyCodesWithEvents } from '../keycodes/with-events'
import type { KeyCodeEvent } from '../types/key-code-events'

export function findSimilarKeys(key: KeyCodeEvent): KeyCodeEvent[] {
  const allKeys = Object.values(keyCodesWithEvents)
    .filter(
      (keyCodeEvent: KeyCodeEvent) => keyCodeEvent.keyCode !== key.keyCode
    )
    .filter(Boolean)
    .map((keyCodeEvent: KeyCodeEvent) => JSON.stringify(keyCodeEvent))

  const results = findBestMatch(JSON.stringify(key), allKeys)
  const bestMatches = results.ratings
    .filter((result: Rating) => !result.target.includes('Dead'))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((result: Rating) => JSON.parse(result.target))

  return bestMatches
}
