import Paper from '@toptal/picasso/Paper'

import { useKeyCodeContext } from '~/lib/state/key-code-context'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

// TODO: Fix component

type KeyHistoryCard = {
  unicode?: string
}

const renderMetaKey = (
  metaKey: KeyCodeEvent,
  setKey: (key: KeyCodeEvent) => void
) => {
  if (metaKey?.metaKey) {
    return (
      <button
        key={metaKey.keyCode}
        type="button"
        className="key pressed history"
        onClick={() => setKey(metaKey)}
      >
        ⌘
      </button>
    )
  }

  if (metaKey?.shiftKey) {
    return (
      <button
        key={metaKey.keyCode}
        type="button"
        className="key pressed history"
        onClick={() => setKey(metaKey)}
      >
        ⇧
      </button>
    )
  }

  if (metaKey?.altKey) {
    return (
      <button
        key={metaKey.keyCode}
        type="button"
        className="key pressed history"
        onClick={() => setKey(metaKey)}
      >
        ⌥
      </button>
    )
  }

  if (metaKey?.ctrlKey) {
    return (
      <button
        key={metaKey.keyCode}
        type="button"
        className="key pressed history"
        onClick={() => setKey(metaKey)}
      >
        ^
      </button>
    )
  }
}

const KeyHistoryCard = ({ unicode }: KeyHistoryCard): JSX.Element => {
  const { keyHistory, setKey } = useKeyCodeContext()

  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-unicode"
    >
      <div className="card-header">History</div>
      <div className="card-main" tabIndex={0} role="button">
        <div className="main-description meta-keys">
          {keyHistory.length > 0 &&
            keyHistory.map((kh: KeyCodeEvent) => {
              const isMeta =
                kh?.metaKey || kh?.shiftKey || kh?.altKey || kh?.ctrlKey

              if (isMeta) {
                return renderMetaKey(kh, setKey)
              }

              return (
                <button
                  type="button"
                  key={kh.keyCode}
                  className="key pressed history"
                  onClick={() => setKey(kh)}
                >
                  {unicode || kh.key}
                </button>
              )
            })}
        </div>
      </div>
    </Paper>
  )
}

export default KeyHistoryCard
