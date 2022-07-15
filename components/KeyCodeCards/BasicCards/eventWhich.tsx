import Paper from '@toptal/picasso/Paper'

// TODO: Fix component
type EventWhichCard = {
  which: string | number
}

const EventWhichCard = ({ which }: EventWhichCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-which"
    >
      <div className="card-header">event.which</div>
      <div className="card-main" tabIndex={0} role="button">
        <div className="main-description">{which}</div>
      </div>
      <footer>
        <p>
          event.which and event.keyCode are{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent"
            target="_blank"
            rel="noopener noreferrer"
          >
            (deprecated)
          </a>{' '}
          in modern browsers. Use <code>.key</code> or <code>.code</code>{' '}
          instead.
        </p>
      </footer>
    </Paper>
  )
}

export default EventWhichCard
