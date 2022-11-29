import {
  createContext,
  FC,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode
} from 'react'
import noop from '@toptal/picasso/utils/noop'
import { useRouter } from 'next/router'

import { deadKeyCodeEventValues } from '~/lib/keycodes/dead'
import { metaKeyCodeEvents } from '~/lib/keycodes/meta'
import { useTouchDevice } from '~/lib/hooks/use-touch-device.hook'
import { generateKey } from '~/lib/state/generate-key'
import { createKeyHistory } from '~/lib/state/create-key-history'
import routes from '~/lib/constants/routes'
import { KeyCodeContextInterface } from '~/lib/types/key-code-context'
import type { KeyCodeEvent } from '~/lib/types/key-code-events'

export const KeyCodeContext = createContext<KeyCodeContextInterface>({
  key: undefined,
  setKey: noop,
  keyHistory: [],
  addToKeyHistory: noop,
  addKey: noop
})

export const KeyCodeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { push, asPath } = useRouter()
  const isTouchDevice = useTouchDevice()
  const [key, setKey] = useState<KeyCodeEvent | undefined>(undefined)
  const [keyHistory, setKeyHistory] = useState<KeyCodeEvent[]>([])

  const addToKeyHistory = (generatedKey: KeyCodeEvent) => {
    setKeyHistory(prevState => createKeyHistory(prevState, generatedKey))
  }

  const addKey = useCallback(
    (key: KeyCodeEvent, withHistory = false) => {
      if (asPath === routes.table && key.path) {
        push(key.path)
      } else if (asPath !== routes.home) {
        push(routes.home)
      }

      setKey(key)

      if (withHistory) {
        addToKeyHistory(key)
      }
    },
    [asPath, push]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()

      let generatedKey: KeyCodeEvent

      if (asPath !== routes.home) {
        const deadOrMetaKeyCode = [
          ...deadKeyCodeEventValues,
          ...metaKeyCodeEvents
        ].find(keycode => keycode.code === e.code && keycode.key === e.key)

        const route = deadOrMetaKeyCode?.path ?? `/${e.key}`

        generatedKey = { ...generateKey(e), path: route }
      } else {
        generatedKey = generateKey(e)
      }

      addKey(generatedKey, true)
    },
    [addKey, asPath]
  )

  useEffect(() => {
    if (isTouchDevice || asPath.includes(routes.table)) {
      return
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, isTouchDevice, asPath])

  return (
    <KeyCodeContext.Provider
      value={{
        key,
        setKey,
        keyHistory,
        addToKeyHistory,
        addKey
      }}
    >
      {children}
    </KeyCodeContext.Provider>
  )
}

export function useKeyCodeState(): KeyCodeContextInterface {
  return useContext(KeyCodeContext)
}
