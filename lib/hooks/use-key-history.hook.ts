import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BASE_PATH } from '../constants/common'
import routes from '../constants/routes'
import { keyCodeEventValues } from '../keycodes'
import { useKeyCodeState } from '../state/use-key-code'
import { KeyCodeContextInterface } from '../types/key-code-context'
import { KeyCodeEvent } from '../types/key-code-events'
import { isHappo } from '../utils/is-happo'

export const setKeyFromHistoryOrKeyCodes = (
  as: string,
  setKey: KeyCodeContextInterface['setKey'],
  keyHistory: KeyCodeContextInterface['keyHistory']
): boolean => {
  const route = as.replace(BASE_PATH, '')

  if (route === routes.home || route === '') {
    setKey(keyHistory[0])

    return true
  }

  const data = [...keyCodeEventValues, ...keyHistory].find(keyCodeEvent =>
    [keyCodeEvent.path, `/${keyCodeEvent.key}`].includes(
      decodeURIComponent(route)
    )
  )

  setKey(data)

  return true
}

export const useKeyHistory = (key?: KeyCodeEvent): void => {
  const router = useRouter()
  const { setKey, keyHistory, addToKeyHistory } = useKeyCodeState()

  useEffect(() => {
    if (!isHappo() && key && keyHistory.length === 0) {
      addToKeyHistory(key)
    }
  }, [addToKeyHistory, key, keyHistory.length])

  useEffect(() => {
    router.beforePopState(({ as }) =>
      setKeyFromHistoryOrKeyCodes(as, setKey, keyHistory)
    )
  })
}
