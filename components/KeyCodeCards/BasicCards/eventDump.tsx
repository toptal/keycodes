import Paper from '@toptal/picasso/Paper'

import type { KeyCodeEvent } from '~/lib/types/key-code-events'

// TODO: Fix component
type EventDumpCard = {
  keyCode: KeyCodeEvent
}

const EventDumpCard = ({ keyCode }: EventDumpCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-event"
    >
      <div className="card-header">Event Dump</div>
      <div className="card-main" tabIndex={0} role="button">
        <pre>{JSON.stringify(keyCode, null, ' ')}</pre>
      </div>
    </Paper>
  )
}

export default EventDumpCard
