import { keyCodesWithEvents } from '~/lib/keycodes/with-events'
import { androidSpecificKeyCodes } from '~/lib/keycodes/android'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

export const generateKey = (keyEvent: KeyboardEvent): KeyCodeEvent => ({
  key: keyEvent.key,
  keyCode: keyEvent.keyCode,
  which: keyEvent.which,
  code: keyEvent.code,
  location: keyEvent.location,
  altKey: keyEvent.altKey,
  ctrlKey: keyEvent.ctrlKey,
  metaKey: keyEvent.metaKey,
  shiftKey: keyEvent.shiftKey,
  repeat: keyEvent.repeat
})

export const generateKeyForMobile = (
  keyEvent: KeyboardEvent
): KeyCodeEvent | null => {
  const keycode = keyEvent.keyCode || keyEvent.which

  if (keycode === 16 && !keyEvent.shiftKey) {
    // Shift key is triggered when special characters key is pressed
    return null
  }

  let generatedKey: KeyCodeEvent

  if (keycode === 0 || keycode === 229) {
    const value = (keyEvent.target as HTMLInputElement).value.toLowerCase()

    const keycodeEventForAndroid = Object.values(keyCodesWithEvents).find(
      keycodeEvent =>
        keycodeEvent.key === value &&
        !keycodeEvent.code?.includes('numpad') &&
        !androidSpecificKeyCodes[keycodeEvent.keyCode]
    )

    generatedKey = generateKey({
      ...keyEvent,
      ...keycodeEventForAndroid
    })

    if (generatedKey.key === 'Unidentified') {
      const keycodeForAndroid = value.charCodeAt(value.length - 1)

      const androidKeycode = androidSpecificKeyCodes[keycodeForAndroid]

      if (androidKeycode) {
        generatedKey = {
          ...generateKey({
            ...keyEvent,
            ...androidKeycode
          }),
          description: androidKeycode.description
        }
      } else {
        generatedKey = generateKey({
          ...keyEvent,
          ...keyCodesWithEvents[keycodeForAndroid]
        })
      }
    }
  } else {
    generatedKey = generateKey(keyEvent)
  }

  return generatedKey
}
