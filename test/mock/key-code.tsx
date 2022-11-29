import { rightMetaKeyCodeEvents } from '~/lib/keycodes/meta'
import { specialCharactersKeyCodeEvents } from '~/lib/keycodes/special-characters'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'
import type { KeyCodeEvent } from '~/lib/types/key-code-events'
import { MetaKeys } from '~/lib/types/meta-keys'

export const keyCodes: [string, KeyCodeEvent, string][] = [
  ['MetaLeft', keyCodesWithEvents[91], '/meta-left'],
  ['AltLeft', keyCodesWithEvents[18], '/alt-left'],
  ['ShiftLeft', keyCodesWithEvents[16], '/shift-left'],
  ['ControlLeft', keyCodesWithEvents[17], '/control-left'],
  ['MetaRight', keyCodesWithEvents[92], '/meta-right'],
  ['ShiftRight', rightMetaKeyCodeEvents[0], '/shift-right'],
  ['ControlRight', rightMetaKeyCodeEvents[1], '/control-right'],
  ['AltRight', rightMetaKeyCodeEvents[2], '/alt-right'],
  ['ContextMenu', keyCodesWithEvents[93], '/context-menu'],
  ['t', keyCodesWithEvents[84], '/t'],
  ['ArrowLeft', keyCodesWithEvents[37], '/arrow-left'],
  ['9', keyCodesWithEvents[57], '/9'],
  ['F12', keyCodesWithEvents[123], '/f12'],
  [
    '#',
    specialCharactersKeyCodeEvents.filter(x => x.keyCode === 51)[0],
    '/hash'
  ],
  [
    '_',
    specialCharactersKeyCodeEvents.filter(x => x.keyCode === 189)[1],
    '/underscore'
  ]
]

export const mockKeyCodeEvent: Required<KeyCodeEvent> = {
  code: 'mock-code',
  description: 'mock-description',
  key: 'mock-key',
  keyCode: 1,
  location: 0,
  which: 9998,
  unicode: 'mock-unicode',
  altKey: false,
  shiftKey: false,
  metaKey: false,
  ctrlKey: false,
  repeat: false,
  path: '/mock-code'
}

export const keyCodeMock: KeyCodeEvent = {
  code: 'KeyF',
  description: 'f',
  key: 'f',
  keyCode: 70,
  location: 1,
  which: 70,
  path: '/f'
}

export const mockSimilarKeyCodeEventWithoutCode = {
  description: 'smk4',
  key: 'smk4',
  keyCode: 4,
  location: 1,
  which: 70
}

export const mockSimilarKeyCodeEvents: KeyCodeEvent[] = [
  {
    code: 'similarkey-1',
    description: 'smk1',
    key: 'smk1',
    keyCode: 1,
    location: 1,
    which: 70,
    path: '/mock'
  },
  {
    code: 'similarkey-2',
    description: 'smk2',
    key: 'smk2',
    keyCode: 2,
    location: 1,
    which: 70,
    path: '/mock'
  },
  {
    code: 'similarkey-3',
    description: 'smk3',
    key: 'smk3',
    keyCode: 3,
    location: 1,
    which: 70,
    path: '/mock'
  }
]

export const mockMetaKeyCodes: [MetaKeys, KeyCodeEvent][] = [
  [
    'metaKey',
    {
      code: 'metakey',
      description: 'mk1',
      key: 'mk1',
      keyCode: 91,
      location: 1,
      which: 70,
      metaKey: true,
      unicode: '⌘',
      path: '/meta-key'
    }
  ],
  [
    'altKey',
    {
      code: 'altkey',
      description: 'ak1',
      key: 'ak1',
      keyCode: 16,
      location: 1,
      which: 70,
      altKey: true,
      unicode: '⌥',
      path: '/alt-key'
    }
  ],
  [
    'shiftKey',
    {
      code: 'shiftkey',
      description: 'sk1',
      key: 'sk1',
      keyCode: 17,
      location: 1,
      which: 70,
      shiftKey: true,
      unicode: '⇧',
      path: '/shift-key'
    }
  ],
  [
    'ctrlKey',
    {
      code: 'ctrlkey',
      description: 'ck1',
      key: 'ck1',
      keyCode: 18,
      location: 1,
      which: 70,
      ctrlKey: true,
      unicode: '^',
      path: '/ctrl-key'
    }
  ]
]

export const mockKeyCodeKeyParams = {
  pathKey: 'CapsLock',
  staticKey: {
    key: 'CapsLock',
    keyCode: 20,
    which: 20,
    code: 'CapsLock',
    location: 0,
    description: 'caps lock',
    unicode: '⇪',
    path: '/capslock'
  }
}
