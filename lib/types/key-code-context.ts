import { Dispatch, SetStateAction } from 'react'

import { KeyCodeEvent } from './key-code-events'

export interface KeyCodeContextInterface {
  key?: KeyCodeEvent
  setKey: Dispatch<SetStateAction<KeyCodeEvent | undefined>>
  keyHistory: KeyCodeEvent[]
  addToKeyHistory: (event: KeyCodeEvent) => void
  addKey: (event: KeyCodeEvent, withHistory?: boolean) => void
}
