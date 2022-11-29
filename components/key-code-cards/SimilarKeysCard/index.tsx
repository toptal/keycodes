import { Card } from '@toptal/site-acq-ui-library'

import styles from './similar-keys-card.module.scss'
import KeyLink from './KeyLink'

import { findSimilarKeys } from '~/lib/utils/find-similar-keys'
import type { KeyCodeEvent } from '~/lib/types/key-code-events'
import { siteCopy } from '~/lib/constants/site-copy'

type SimilarKeysCardProps = {
  keyCodeEvent: KeyCodeEvent
}

const SimilarKeysCard = ({
  keyCodeEvent
}: SimilarKeysCardProps): JSX.Element => {
  const similarKeys = findSimilarKeys(keyCodeEvent)

  return (
    <Card
      title={siteCopy.cards.similarValues}
      titleTag="h3"
      className={styles.card}
      bodyClassName={styles.body}
    >
      <ul>
        {similarKeys.map((similarKey: KeyCodeEvent) => {
          return (
            <li key={similarKey.keyCode}>
              {similarKey.code && (
                <KeyLink
                  key={similarKey.code}
                  route={similarKey.code}
                  keycode={similarKey}
                />
              )}{' '}
              (
              <KeyLink
                key={similarKey.keyCode}
                route={similarKey.keyCode}
                keycode={similarKey}
              />
              )
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default SimilarKeysCard
