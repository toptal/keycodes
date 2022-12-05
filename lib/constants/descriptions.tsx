import Link from '@toptal/picasso/Link'

const cardDescriptions = {
  eventCode: `The physical key on the keyboard. Doesn't care if you are holding a modifier like Shift.`,
  eventLocation:
    'Some keys exist more than once on your keyboard. This provides the location of the key pressed. Try it with both shifts.',
  eventKey:
    'The value of the key pressed. Accounts for modifiers keys that return CAPS and alternate chars.',
  eventWhich: (
    <>
      event.which and event.keyCode are{' '}
      <Link
        href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent"
        target="_blank"
        rel="noopener noreferrer"
      >
        deprecated
      </Link>{' '}
      in modern browsers. Use <code>.key</code> or <code>.code</code> instead.
    </>
  ),
  description: (
    <>
      This is the description we have created. Think it can be improved?{' '}
      <Link
        href="https://github.com/toptal/keycodes"
        target="_blank"
        rel="noopener noreferrer"
      >
        PR us on GitHub
      </Link>
    </>
  )
}

export default cardDescriptions
