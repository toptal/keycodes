import BasicCardContainer from '../BasicCardContainer'
import { ClipboardCopy } from '../ClipboardCopy'

import { TestIdEventDescriptionCard } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'
import cardDescriptions from '~/lib/constants/descriptions'

type DescriptionCard = {
  description?: string
}

const DescriptionCard = ({ description }: DescriptionCard): JSX.Element => {
  return (
    <BasicCardContainer
      title={siteCopy.cards.description}
      description={cardDescriptions.description}
      testId={TestIdEventDescriptionCard.EventDescriptionCardContainer}
    >
      <ClipboardCopy>
        {description ?? siteCopy.content.noDescription}
      </ClipboardCopy>
    </BasicCardContainer>
  )
}

export default DescriptionCard
