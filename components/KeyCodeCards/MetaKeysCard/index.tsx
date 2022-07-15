import Paper from '@toptal/picasso/Paper'

import type { KeyCodeEvent } from '~/lib/types/key-code-events'

// TODO: Fix component

type MetaKeys = {
  keyCode: KeyCodeEvent
}

const MetaKeys = ({ keyCode }: MetaKeys): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-code"
    >
      <div className="card-header">Meta Keys </div>
      <div className="card-main">
        <div className="main-description meta-keys">
          <div
            className={`key ${keyCode?.metaKey ? 'pressed' : ''}`}
            key="Meta Key"
          >
            ⌘
          </div>
          <div
            className={`key ${keyCode?.shiftKey ? 'pressed' : ''}`}
            key="Shift Key"
          >
            ⇧
          </div>
          <div
            className={`key ${keyCode?.altKey ? 'pressed' : ''}`}
            key="Alt / Option"
          >
            ⌥
          </div>
          <div
            className={`key ${keyCode?.ctrlKey ? 'pressed' : ''}`}
            key="Control Key"
          >
            ^
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default MetaKeys
