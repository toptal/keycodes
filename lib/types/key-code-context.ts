import { Dispatch, SetStateAction } from 'react'

import { KeyCodeEvent } from './key-code-events'

export interface KeyCodeContextInterface {
  key?: KeyCodeEvent
  setKey: Dispatch<SetStateAction<KeyCodeEvent | undefined>>
  keyHistory: KeyCodeEvent[]
  setKeyHistory: Dispatch<SetStateAction<KeyCodeEvent[]>>
  fromTable?: boolean
  setFromTable: Dispatch<SetStateAction<boolean>>
}
