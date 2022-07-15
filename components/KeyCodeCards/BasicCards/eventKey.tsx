import Paper from '@toptal/picasso/Paper'

// TODO: Fix component
type EventKeyCard = {
  key?: string
}

const EventKeyCard = ({ key }: EventKeyCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-key"
    >
      <div className="card-header">
        <span>event.key</span>
      </div>
      <div className="card-main" tabIndex={0} role="button">
        <div className="main-description">
          {key}
          {key === ' ' && <small>(blank space)</small>}
        </div>
      </div>
      <footer>
        <p>
          The value of the key pressed. Accounts for modifiers keys that return
          CAPS and alternate chars.
        </p>
      </footer>
    </Paper>
  )
}

export default EventKeyCard
