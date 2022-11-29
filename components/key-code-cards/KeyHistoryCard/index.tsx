import Container from '@toptal/picasso/Container'
import { Card } from '@toptal/site-acq-ui-library'

import styles from './key-history-card.module.scss'
import { TestIdKeyHistoryCard } from './test-id'
import { createKeyVisual } from './create-key-visual'

import { siteCopy } from '~/lib/constants/site-copy'
import { useKeyCodeState } from '~/lib/state/use-key-code'
import type { KeyCodeEvent } from '~/lib/types/key-code-events'

const KeyHistoryCard = (): JSX.Element => {
  const { keyHistory, addKey } = useKeyCodeState()

  return (
    <Card
      title={siteCopy.cards.keyHistory}
      titleTag="h3"
      className={styles.card}
      bodyClassName={styles.body}
    >
      <Container
        data-testid={TestIdKeyHistoryCard.Container}
        className={styles.content}
      >
        {keyHistory.length > 0 &&
          keyHistory.map((keyCodeEvent: KeyCodeEvent) => {
            const historyButtonText = createKeyVisual(keyCodeEvent)

            if (historyButtonText === '') {
              return null
            }

            return (
              <button
                key={`${keyCodeEvent.keyCode}${keyCodeEvent.key}`}
                className={styles.keyHistory}
                onClick={() => {
                  addKey(keyCodeEvent)
                }}
              >
                <span>{historyButtonText}</span>
              </button>
            )
          })}
      </Container>
    </Card>
  )
}

export default KeyHistoryCard
