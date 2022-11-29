/* istanbul ignore file */

import { KeyCodeEvent } from '../types/key-code-events'

import { keyCodesWithEvents } from './with-events'

type SPECIAL_CHARACTERS = Pick<
  KeyCodeEvent,
  'path' | 'keyCode' | 'shiftKey' | 'altKey'
>

export const specialCharacters: Record<string, SPECIAL_CHARACTERS> = {
  '"': { path: '/double-quote', keyCode: 222, shiftKey: true },
  '>': { path: '/greater-than', keyCode: 190, shiftKey: true },
  '?': { path: '/question-mark', keyCode: 191, shiftKey: true },
  '!': { path: '/exclamation-mark', keyCode: 49, shiftKey: true },
  '#': { path: '/hash', keyCode: 51, shiftKey: true },
  '%': { path: '/percent', keyCode: 53, shiftKey: true },
  '(': { path: '/parentheses-left', keyCode: 57, shiftKey: true },
  '^': { path: '/caret', keyCode: 73, altKey: true },
  '@': { path: '/at-sign', keyCode: 50, shiftKey: true },
  '&': { path: '/and', keyCode: 55, shiftKey: true },
  '}': { path: '/braces-right', keyCode: 221, shiftKey: true },
  '{': { path: '/braces-left', keyCode: 219, shiftKey: true },
  '±': { path: '/plus-minus', keyCode: 187, shiftKey: true },
  '§': { path: '/section-sign', keyCode: 54, shiftKey: true },
  '¡': { path: '/inverted-exclamation-mark', keyCode: 49, altKey: true },
  '²': { path: '/sqaure', keyCode: 50, altKey: true },
  '³': { path: '/cube', keyCode: 51, altKey: true },
  '¤': { path: '/currency', keyCode: 52, altKey: true },
  '€': { path: '/euro', keyCode: 53, altKey: true },
  '¼': { path: '/one-quarter', keyCode: 54, altKey: true },
  '½': { path: '/half', keyCode: 55, altKey: true },
  '¾': { path: '/three-quarters', keyCode: 56, altKey: true },
  '‘': { path: '/inverted-apostrophe', keyCode: 57, altKey: true },
  '’': { path: '/apostrophe', keyCode: 48, altKey: true },
  '¥': { path: '/yen', keyCode: 89, altKey: true },
  '×': { path: '/multiply', keyCode: 187, altKey: true },
  ä: { path: '/open-central-unrounded-vowel', keyCode: 81, altKey: true },
  å: { path: '/open-mid-back-unrounded-vowel', keyCode: 87, altKey: true },
  é: { path: '/e-acute', keyCode: 69, altKey: true },
  '®': { path: '/registered-trademark', keyCode: 82, altKey: true },
  þ: { path: '/thorn', keyCode: 84, altKey: true },
  ü: { path: '/u-with-umlaut', keyCode: 89, altKey: true },
  ú: { path: '/u-acute', keyCode: 85, altKey: true },
  í: { path: '/i-acute', keyCode: 73, altKey: true },
  ó: { path: '/o-acute', keyCode: 79, altKey: true },
  ö: { path: '/o-with-umlaut', keyCode: 80, altKey: true },
  '«': { path: '/left-guillemet', keyCode: 219, altKey: true },
  '»': { path: '/right-guillemet', keyCode: 221, altKey: true },
  á: { path: '/a-acute', keyCode: 65, altKey: true },
  ß: { path: '/sharp-s', keyCode: 83, altKey: true },
  ð: { path: '/voiced-dental-fricative', keyCode: 68, altKey: true },
  ø: { path: '/close-mid-front-rounded-vowel', keyCode: 76, altKey: true },
  '¶': { path: '/pilcrow', keyCode: 186, altKey: true },
  '´': { path: '/accent', keyCode: 222, altKey: true },
  '¬': { path: '/logical-negation', keyCode: 220, altKey: true },
  æ: { path: '/near-open-front-unrounded-vowel', keyCode: 90, altKey: true },
  '©': { path: '/copywright', keyCode: 67, altKey: true },
  ñ: { path: '/n-with-tilde', keyCode: 78, altKey: true },
  µ: { path: '/one-millionth', keyCode: 77, altKey: true },
  ç: { path: '/c-cedilla', keyCode: 188, altKey: true },
  '¿': { path: '/inverted-question-mark', keyCode: 191, altKey: true },
  Ω: { path: '/ohm', keyCode: 90, altKey: true },
  '≈': { path: '/approximate', keyCode: 88, altKey: true },
  œ: { path: '/open-mid-front-rounded-vowel', keyCode: 81, altKey: true },
  Σ: { path: '/sigma', keyCode: 87, altKey: true },
  '†': { path: '/obelus', keyCode: 84, altKey: true },
  '¨': { path: '/umlaut', keyCode: 85, altKey: true },
  π: { path: '/pi', keyCode: 80, altKey: true },
  ƒ: { path: '/f-with-hook', keyCode: 70, altKey: true },
  '˙': { path: '/overdot', keyCode: 72, altKey: true },
  '∆': { path: '/delta', keyCode: 74, altKey: true },
  '°': { path: '/degree', keyCode: 75, altKey: true },
  '√': { path: '/sqaure-root', keyCode: 86, altKey: true },
  '∫': { path: '/integral', keyCode: 66, altKey: true },
  '~': { path: '/tilde', keyCode: 78, altKey: true },
  '™': { path: '/trademark', keyCode: 50, altKey: true },
  '£': { path: '/pound', keyCode: 51, altKey: true },
  '¢': { path: '/cent', keyCode: 52, altKey: true },
  '∞': { path: '/infinity', keyCode: 53, altKey: true },
  '…': { path: '/ellipsis', keyCode: 186, altKey: true },
  '•': { path: '/bullet', keyCode: 56, altKey: true },
  º: { path: '/ordinal-indicator', keyCode: 48, altKey: true },
  '–': { path: '/dash', keyCode: 189, altKey: true },
  '≠': { path: '/not-equal', keyCode: 187, altKey: true },
  '≤': { path: '/less-than-or-equal', keyCode: 190, altKey: true },
  '≥': { path: '/greater-than-or-equal', keyCode: 188, altKey: true },
  '÷': { path: '/division', keyCode: 191, altKey: true },
  '”': { path: '/right-double-quotation', keyCode: 219, altKey: true },
  ª: { path: '/feminine-ordinal-indicator', keyCode: 57, altKey: true },
  '˚': { path: '/small-degree', keyCode: 72, altKey: true },
  '∂': { path: '/partial', keyCode: 68, altKey: true },
  '∑': { path: '/summation-sigma', keyCode: 87, altKey: true },
  '“': { path: '/inverted-double-quotation', keyCode: 219, altKey: true },
  _: { path: '/underscore', keyCode: 189, shiftKey: true }
}

export const specialCharactersKeyCodeEvents: KeyCodeEvent[] = Object.entries(
  specialCharacters
).map(([key, keyCodeEvent]) => {
  return {
    ...keyCodesWithEvents[keyCodeEvent.keyCode],
    ...keyCodeEvent,
    key,
    unicode: key,
    description: keyCodeEvent.path?.replace('/', '').replaceAll('-', ' ')
  }
})
