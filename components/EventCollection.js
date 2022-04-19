import { keyCodes } from '../lib/keycodes'
import { useKeyCode } from './KeyCodeProvider'

export default function EventCollection() {
  const { events } = useKeyCode()
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
      }}
    >
      {Object.keys(events).map((event) => (
        <span
          style={{
            border: '1px solid',
            padding: '2px',
            margin: '2px',
            borderColor: events[event] ? 'red' : 'grey',
            background: events[event] ? 'red' : 'white',
            display: events[event] ? 'none' : 'block',
            width: '20%',
          }}
          key={event}
        >
          {event} - {keyCodes[event]}
        </span>
      ))}
    </div>
  )
}
