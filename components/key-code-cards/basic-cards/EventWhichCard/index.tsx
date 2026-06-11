import BasicCardContainer from '../BasicCardContainer'
import { ClipboardCopy } from '../ClipboardCopy'

import { TestIdEvenWhichCard } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'
import cardDescriptions from '~/lib/constants/descriptions'

type EventWhichCardProps = {
  which: string | number
}

const EventWhichCard = ({ which }: EventWhichCardProps): JSX.Element => {
  return (
    <BasicCardContainer
      title={siteCopy.cards.eventWhich}
      description={cardDescriptions.eventWhich}
      testId={TestIdEvenWhichCard.EventWhichCardContainer}
    >
      <ClipboardCopy>{which}</ClipboardCopy>
    </BasicCardContainer>
  )
}

export default EventWhichCard
