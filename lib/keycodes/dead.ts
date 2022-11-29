/* istanbul ignore file */

import { keyCodesWithEvents } from './with-events'

export const deadKeyCodeEvents = [
  { ...keyCodesWithEvents[69], key: 'Dead', path: '/dead-e' },
  { ...keyCodesWithEvents[85], key: 'Dead', path: '/dead-u' },
  { ...keyCodesWithEvents[73], key: 'Dead', path: '/dead-i' },
  {
    ...keyCodesWithEvents[192],
    key: 'Dead',
    code: 'IntlBackslash',
    path: '/dead-backtick'
  },
  { ...keyCodesWithEvents[78], key: 'Dead', path: '/dead-n' }
]

export const deadKeyCodeEventValues = [
  ...deadKeyCodeEvents,
  keyCodesWithEvents[161],
  keyCodesWithEvents[229]
]
