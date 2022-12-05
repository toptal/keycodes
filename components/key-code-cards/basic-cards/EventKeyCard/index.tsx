import BasicCardContainer from '../BasicCardContainer'

import { TestIdEventKeyCard } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'
import cardDescriptions from '~/lib/constants/descriptions'

type EventKeyCard = {
  eventKey?: string
}

const EventKeyCard = ({ eventKey }: EventKeyCard): JSX.Element => {
  return (
    <BasicCardContainer
      title={siteCopy.cards.eventKey}
      description={cardDescriptions.eventKey}
      testId={TestIdEventKeyCard.EventKeyCardContainer}
    >
      {eventKey}
      {eventKey === siteCopy.content.whiteSpace && (
        <small>{siteCopy.content.blankSpace}</small>
      )}
    </BasicCardContainer>
  )
}

export default EventKeyCard
