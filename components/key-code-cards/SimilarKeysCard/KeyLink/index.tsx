import Link from 'next/link'

import styles from '../similar-keys-card.module.scss'

import { useKeyCodeState } from '~/lib/state/use-key-code'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

type KeyLinkProps = {
  route: string | number
  keycode: KeyCodeEvent
}

const KeyLink = ({ route, keycode }: KeyLinkProps): JSX.Element => {
  const { addKey } = useKeyCodeState()

  return (
    <Link key={route} href={`/${route}`} prefetch={false}>
      <a
        className={styles.link}
        onClick={e => {
          e.preventDefault()
          addKey(keycode, true)
        }}
      >
        {route}
      </a>
    </Link>
  )
}

export default KeyLink
