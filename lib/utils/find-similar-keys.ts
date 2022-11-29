import type { KeyCodeEvent } from '~/lib/types/key-code-events'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'

export function findSimilarKeys(key: KeyCodeEvent): KeyCodeEvent[] {
  const bestMatches = []
  let startIndex = key.keyCode

  while (key.keyCode) {
    startIndex--
    if (keyCodesWithEvents[startIndex]) {
      break
    }
  }

  const lastIndex = Number(Object.keys(keyCodesWithEvents).pop())

  while (bestMatches.length < 3 && startIndex <= lastIndex) {
    const similarValue = keyCodesWithEvents[startIndex]

    if (
      similarValue &&
      similarValue.code &&
      similarValue.keyCode &&
      similarValue.keyCode !== key.keyCode
    ) {
      bestMatches.push(similarValue)
    }

    startIndex++
  }

  return bestMatches
}
