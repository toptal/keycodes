import { useRouter } from 'next/router'
import { useState, ReactNode } from 'react'

import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { KeyCodeStateProvider } from '~/lib/state/key-code-context'

interface KeyCodeProvider {
  children: ReactNode
}

const KeyCodeProvider = ({ children }: KeyCodeProvider): JSX.Element => {
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
        setFromTable,
      }}
    >
      {children}
    </KeyCodeStateProvider>
  )
}

export default KeyCodeProvider
