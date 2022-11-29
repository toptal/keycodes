import BasicCardContainer from '../BasicCardContainer'

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
      {description ?? siteCopy.content.noDescription}
    </BasicCardContainer>
  )
}

export default DescriptionCard
