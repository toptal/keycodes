import BasicCardContainer from '../BasicCardContainer'

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
      {which}
    </BasicCardContainer>
  )
}

export default EventWhichCard
