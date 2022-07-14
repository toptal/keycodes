import Paper from '@toptal/picasso/Paper'

// TODO: Fix component
type EventCodeCard = {
  code?: string
}

const EventCodeCard = ({ code }: EventCodeCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-code"
    >
      <div className="card-header">event.code</div>
      <div className="card-main" tabIndex={0} role="button">
        <div className="main-description">{code}</div>
      </div>
      <footer>
        <p>
          The physical key on the keyboard. Doesn&apos;t care if you are holding
          a modifier like Shift.
        </p>
      </footer>
    </Paper>
  )
}

export default EventCodeCard
