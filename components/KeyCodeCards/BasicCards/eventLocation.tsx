import Paper from '@toptal/picasso/Paper'

import { keyLocations } from '~/lib/keycodes'

// TODO: Fix component
type EventLocationCard = {
  keyLocation?: number
}

const EventLocationCard = ({ keyLocation }: EventLocationCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-location"
    >
      <div className="card-header">event.location</div>
      <div className="card-main" tabIndex={0} role="button">
        {keyLocation && (
          <div className="main-description">
            {keyLocations[keyLocation]}
            <small>({keyLocation})</small>
          </div>
        )}
      </div>
      <footer>
        <p>
          Some keys exist more than once on your keyboard. This provides the
          location of the key pressed. Try it with both shifts.
        </p>
      </footer>
    </Paper>
  )
}

export default EventLocationCard
