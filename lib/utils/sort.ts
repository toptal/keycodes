import { KeyCodeEvent } from '../types/key-code-events'

export const sortKeyCodes = (
  keyCodeEventValues: KeyCodeEvent[]
): KeyCodeEvent[] => {
  return keyCodeEventValues.sort((value1, value2) =>
    value1.keyCode < value2.keyCode ? -1 : 1
  )
}
