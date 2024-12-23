import BasicCardContainer from '../BasicCardContainer'
import { ClipboardCopy } from '../ClipboardCopy'

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
      <ClipboardCopy>{code}</ClipboardCopy>
    </BasicCardContainer>
  )
}

export default EventCodeCard
