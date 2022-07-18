import { createContext, useContext } from 'react'
import { noop } from '@toptal/picasso/utils'

import { KeyCodeContextInterface } from '~/lib/types/key-code-context'

const KeyCodeStateContext = createContext<KeyCodeContextInterface>({
  key: undefined,
  setKey: noop,
  keyHistory: [],
  setKeyHistory: noop,
  fromTable: false,
  setFromTable: noop
})

const KeyCodeStateProvider = KeyCodeStateContext.Provider

const useKeyCodeContext = (): KeyCodeContextInterface => {
  return useContext(KeyCodeStateContext)
}

export { KeyCodeStateProvider, KeyCodeStateContext, useKeyCodeContext }
