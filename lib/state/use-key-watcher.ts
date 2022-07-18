import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import { KeyCodeEvent, KeyCodeEventWatcher } from '~/lib/types/key-code-events'
import { useKeyCodeContext } from '~/lib/state/key-code-context'
import { urlFriendly } from '~/lib/utils/url-friendly'

// TODO: This components will be fixed

const getGeneratedKey = (keyEvent: KeyCodeEventWatcher) => ({
  key: keyEvent.key,
  keyCode: keyEvent.keyCode,
  which: keyEvent.which,
  code: keyEvent.code,
  location: keyEvent.location,
  // Meta Keys
  altKey: keyEvent.altKey,
  ctrlKey: keyEvent.ctrlKey,
  metaKey: keyEvent.metaKey,
  shiftKey: keyEvent.shiftKey,
  repeat: keyEvent.repeat,
})

export const useKeyWatcher = (): void => {
  const { setKey, setKeyHistory, setFromTable } = useKeyCodeContext()
  const router = useRouter()

  const handleKeyDown = useCallback(
    (e: KeyCodeEventWatcher) => {
      e.preventDefault()

      setFromTable(false)

      router.push(`/${urlFriendly(e.key)}`)
      const generatedKey = getGeneratedKey(e)

      setKey(generatedKey)
      setKeyHistory((prevState: KeyCodeEvent[]) => {
        // if no prev keys, return a new one
        if (prevState.length === 0) {
          return [generatedKey]
        }

        const isDuplicate = prevState.some(
          (prevKey: KeyCodeEvent) => prevKey.key === generatedKey.key
        )

        // if it's a duplicate, remove the old one and add this to the front of the line
        if (isDuplicate) {
          return [
            generatedKey,
            ...prevState.filter(
              (prevKey: KeyCodeEvent) => prevKey.key !== generatedKey.key
            ),
          ]
        }

        // Add a max. of 4 items in the history
        if (prevState.length === 4) {
          const remainingKeys = prevState.slice(1)

          return [...remainingKeys, generatedKey]
        }

        return [...prevState, generatedKey]
      })
    },
    [router, setFromTable, setKey, setKeyHistory]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      // remove event listener
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
