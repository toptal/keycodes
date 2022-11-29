import { Card } from '@toptal/site-acq-ui-library'

import styles from './event-dump-card.module.scss'

import type { KeyCodeEvent } from '~/lib/types/key-code-events'
import { siteCopy } from '~/lib/constants/site-copy'

type EventDumpCardProps = {
  keyCodeEvent: KeyCodeEvent
}

const EventDumpCard = ({ keyCodeEvent }: EventDumpCardProps): JSX.Element => {
  return (
    <Card
      title={siteCopy.cards.eventDump}
      titleTag="h3"
      className={styles.card}
      bodyClassName={styles.body}
    >
      <pre className={styles.content}>
        {JSON.stringify(keyCodeEvent, null, ' ')}
      </pre>
    </Card>
  )
}

export default EventDumpCard
