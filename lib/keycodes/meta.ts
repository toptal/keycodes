/* istanbul ignore file */

import { keyCodesWithEvents } from './with-events'

export const rightMetaKeyCodeEvents = [
  {
    ...keyCodesWithEvents[16],
    location: 2,
    code: 'ShiftRight',
    path: '/shift-right'
  },
  {
    ...keyCodesWithEvents[17],
    location: 2,
    code: 'ControlRight',
    path: '/control-right'
  },
  {
    ...keyCodesWithEvents[18],
    location: 2,
    code: 'AltRight',
    path: '/alt-right'
  }
]

export const metaKeyCodeEvents = [
  keyCodesWithEvents[16],
  keyCodesWithEvents[17],
  keyCodesWithEvents[18],
  keyCodesWithEvents[91],
  keyCodesWithEvents[92],
  keyCodesWithEvents[93],
  keyCodesWithEvents[224],
  keyCodesWithEvents[225],
  ...rightMetaKeyCodeEvents
]
