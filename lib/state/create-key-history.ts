import type { KeyCodeEvent } from '../types/key-code-events'

export const createKeyHistory = (
  history: KeyCodeEvent[],
  newKeyCode?: KeyCodeEvent
): KeyCodeEvent[] => {
  if (!newKeyCode || newKeyCode.key === 'Unidentified') {
    return [...history]
  }

  if (history.length === 0) {
    return [newKeyCode]
  }

  const filteredHistory = [
    ...history.filter(
      (prevKey: KeyCodeEvent) => prevKey.keyCode !== newKeyCode.keyCode
    )
  ]

  if (filteredHistory.length > 3) {
    const remainingKeys = filteredHistory.slice(0, 3)

    return [newKeyCode, ...remainingKeys]
  }

  return [newKeyCode, ...filteredHistory]
}
