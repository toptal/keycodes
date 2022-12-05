import { Card } from '@toptal/utilities-ui-library'
import Container from '@toptal/picasso/Container'
import cx from 'classnames'

import styles from './meta-keys-card.module.scss'

import { siteCopy } from '~/lib/constants/site-copy'
import { META_KEYS } from '~/lib/constants/meta-keys'
import type { KeyCodeEvent } from '~/lib/types/key-code-events'

type MetaKeysCardProps = {
  keyCodeEvent?: KeyCodeEvent
}

const MetaKeysCard = ({ keyCodeEvent }: MetaKeysCardProps): JSX.Element => {
  return (
    <Card
      title={siteCopy.cards.metaKeys}
      titleTag="h3"
      className={styles.card}
      bodyClassName={styles.body}
    >
      <Container flex direction="row" gap={0.6} className={styles.content}>
        {Object.entries(META_KEYS).map(([keyName, keyData]) => {
          return (
            <div
              key={keyData.key}
              className={cx(styles.metaKey, {
                [styles.pressed]: keyCodeEvent?.[keyName as keyof KeyCodeEvent]
              })}
            >
              <span>{keyData.code}</span>
            </div>
          )
        })}
      </Container>
    </Card>
  )
}

export default MetaKeysCard
