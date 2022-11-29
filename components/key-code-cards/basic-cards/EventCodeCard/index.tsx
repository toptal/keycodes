import BasicCardContainer from '../BasicCardContainer'

import { TestIdEventCodeCard } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'
import cardDescriptions from '~/lib/constants/descriptions'

type EventCodeCard = {
  code?: string
  testId?: string
}

const EventCodeCard = ({ code }: EventCodeCard): JSX.Element => {
  return (
    <BasicCardContainer
      title={siteCopy.cards.eventCode}
      description={cardDescriptions.eventCode}
      testId={TestIdEventCodeCard.EventCodeCardContainer}
    >
      {code}
    </BasicCardContainer>
  )
}

export default EventCodeCard
