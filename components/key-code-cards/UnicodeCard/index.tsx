import { Card } from '@toptal/site-acq-ui-library'
import Container from '@toptal/picasso/Container'

import styles from './unicode-card.module.scss'
import { TestIdUnicodeCard } from './test-id'

import { siteCopy } from '~/lib/constants/site-copy'

type UnicodeCard = {
  unicode?: string
}

const UnicodeCard = ({ unicode }: UnicodeCard): JSX.Element => {
  return (
    <Card
      title={siteCopy.cards.unicode}
      titleTag="h3"
      className={styles.card}
      bodyClassName={styles.body}
    >
      <Container
        data-testid={TestIdUnicodeCard.Container}
        className={styles.content}
      >
        {unicode || siteCopy.content.whiteSpace}
      </Container>
    </Card>
  )
}

export default UnicodeCard
