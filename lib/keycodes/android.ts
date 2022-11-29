/* istanbul ignore file */

import { KeyCodeEvent } from '../types/key-code-events'

export const androidSpecificKeyCodes: Record<string, KeyCodeEvent> = {
  169: {
    key: '©',
    keyCode: 169,
    which: 169,
    code: 'Copyright',
    location: 0,
    description: 'Copyright sign',
    path: '/copyright'
  },
  174: {
    key: '®',
    keyCode: 174,
    which: 174,
    code: 'Registered ',
    location: 0,
    description: 'Registered sign',
    path: '/registered'
  },
  40: {
    key: '(',
    keyCode: 40,
    which: 40,
    code: 'Left parenthesis',
    location: 0,
    description: 'Left parenthesis',
    path: '/parentheses-left'
  },
  41: {
    key: ')',
    keyCode: 41,
    which: 41,
    code: 'Right parenthesis',
    location: 0,
    description: 'Right parenthesis',
    path: '/parentheses-right'
  },
  42: {
    key: '*',
    keyCode: 42,
    which: 42,
    code: 'asterisk',
    location: 0,
    description: 'asterisk',
    path: '/asterisk'
  },
  43: {
    key: '+',
    keyCode: 43,
    which: 43,
    code: 'Plus',
    location: 0,
    description: 'plus',
    path: '/plus'
  },
  44: {
    key: ',',
    keyCode: 45,
    which: 45,
    code: 'Comma',
    location: 0,
    description: 'comma',
    path: '/comma'
  },
  45: {
    key: '-',
    keyCode: 45,
    which: 45,
    code: 'Minus',
    location: 0,
    description: 'minus',
    path: '/minus'
  },
  46: {
    key: '.',
    keyCode: 46,
    which: 46,
    code: 'Period',
    location: 0,
    description: 'period',
    path: '/period'
  },
  47: {
    key: '/',
    keyCode: 47,
    which: 47,
    code: 'Slash',
    location: 0,
    description: 'slash',
    path: '/slash'
  }
}
