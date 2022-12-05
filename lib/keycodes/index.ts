/* istanbul ignore file */

import { deadKeyCodeEvents } from './dead'
import { rightMetaKeyCodeEvents } from './meta'
import { specialCharactersKeyCodeEvents } from './special-characters'
import { keyCodesWithEvents } from './with-events'

export const keyCodeEventValues = [
  ...Object.values(keyCodesWithEvents),
  ...rightMetaKeyCodeEvents,
  ...deadKeyCodeEvents,
  ...specialCharactersKeyCodeEvents
]
