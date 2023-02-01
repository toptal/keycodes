import BasicCardContainer from '../BasicCardContainer'
import { ClipboardCopy } from '../ClipboardCopy'

import { TestIdEvenLocationCard } from './test-ids'

import { keyLocations } from '~/lib/keycodes/locations'
import { siteCopy } from '~/lib/constants/site-copy'
import cardDescriptions from '~/lib/constants/descriptions'

type EventLocationCard = {
  keyLocation?: number
  testId?: string
}

const EventLocationCard = ({ keyLocation }: EventLocationCard): JSX.Element => {
  const location =
    typeof keyLocation !== 'undefined' && keyLocation in keyLocations
      ? keyLocations[keyLocation]
      : null

  return (
    <BasicCardContainer
      testId={TestIdEvenLocationCard.EventLocationCardContainer}
      title={siteCopy.cards.eventLocation}
      description={cardDescriptions.eventLocation}
    >
      <ClipboardCopy>{location}</ClipboardCopy>
    </BasicCardContainer>
  )
}

export default EventLocationCard
