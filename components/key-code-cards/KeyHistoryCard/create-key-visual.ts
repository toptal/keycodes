import { META_KEYS } from '~/lib/constants/meta-keys'
import { metaKeyCodeEvents } from '~/lib/keycodes/meta'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

export const createKeyVisual = (keyCode: KeyCodeEvent): string => {
  if (
    metaKeyCodeEvents.find(
      metaKeyCode => metaKeyCode.keyCode === keyCode?.keyCode
    )
  ) {
    if (keyCode?.metaKey) {
      return META_KEYS.metaKey.code
    }

    if (keyCode?.shiftKey) {
      return META_KEYS.shiftKey.code
    }

    if (keyCode?.altKey) {
      return META_KEYS.altKey.code
    }

    if (keyCode?.ctrlKey) {
      return META_KEYS.ctrlKey.code
    }
  }

  const keyCodeEvent = keyCodesWithEvents[keyCode.keyCode]

  if (keyCodeEvent?.key === keyCode.key && keyCodeEvent?.unicode) {
    return keyCodeEvent.unicode
  }

  return keyCode?.key?.toUpperCase()
}
