import { useRouter } from 'next/router'
import { createContext, useState, useContext, ReactNode } from 'react'
import { noop } from '@toptal/picasso/utils'

import { KeyCodeContextInterface } from '~/lib/types/key-code-context'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

const KeyCodeStateContext = createContext<KeyCodeContextInterface>({
  key: undefined,
  setKey: noop,
  keyHistory: [],
  setKeyHistory: noop,
  fromTable: false,
  setFromTable: noop
})

const KeyCodeStateProvider = KeyCodeStateContext.Provider

interface KeyCodeProviderProps {
  children: ReactNode
}

const KeyCodeProvider = ({ children }: KeyCodeProviderProps): JSX.Element => {
  const { asPath } = useRouter()
  const [key, setKey] = useState<KeyCodeEvent | undefined>(undefined)
  const [keyHistory, setKeyHistory] = useState<KeyCodeEvent[]>([])
  const [fromTable, setFromTable] = useState<boolean>(asPath.includes('table'))

  return (
    <KeyCodeStateProvider
      value={{
        key,
        setKey,
        keyHistory,
        setKeyHistory,
        fromTable,
        setFromTable
      }}
    >
      {children}
    </KeyCodeStateProvider>
  )
}

const useKeyCodeContext = (): KeyCodeContextInterface => {
  return useContext(KeyCodeStateContext)
}

export { KeyCodeProvider, KeyCodeStateContext, useKeyCodeContext }
