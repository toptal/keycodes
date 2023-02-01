import { keyCodeEventValues } from '../keycodes'
import { KeyCodeEvent } from '../types/key-code-events'

export const getKeyCodeEvent = (
  keyCode: KeyCodeEvent
): KeyCodeEvent | undefined => {
  return keyCodeEventValues.find(
    keyCodeEvent =>
      keyCodeEvent.code === keyCode.code || keyCodeEvent.key === keyCode.key
  )
}
