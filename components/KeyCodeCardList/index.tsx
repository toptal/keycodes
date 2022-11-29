import { CardList } from '@toptal/utilities-ui-library'

import MetaKeysCard from '~/components/key-code-cards/MetaKeysCard'
import KeyHistoryCard from '~/components/key-code-cards/KeyHistoryCard'
import SimilarKeysCard from '~/components/key-code-cards/SimilarKeysCard'
import EventDumpCard from '~/components/key-code-cards/EventDumpCard'
import UnicodeCard from '~/components/key-code-cards/UnicodeCard'
import DescriptionCard from '~/components/key-code-cards/basic-cards/DescriptionCard'
import EventCodeCard from '~/components/key-code-cards/basic-cards/EventCodeCard'
import EventKeyCard from '~/components/key-code-cards/basic-cards/EventKeyCard'
import EventLocationCard from '~/components/key-code-cards/basic-cards/EventLocationCard'
import EventWhichCard from '~/components/key-code-cards/basic-cards/EventWhichCard'

import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { getKeyCodeEvent } from '~/lib/utils/get-key-code-event'

type KeyCodeCardListProps = {
  keyCode: KeyCodeEvent
}

const KeyCodeCardList = ({ keyCode }: KeyCodeCardListProps): JSX.Element => {
  const keyCodeEvent = getKeyCodeEvent(keyCode)

  return (
    <CardList largeNumColumns={3} mediumNumColumns={2}>
      <EventKeyCard eventKey={keyCode.key} />
      <EventLocationCard keyLocation={keyCode.location} />
      <EventCodeCard code={keyCode.code} />
      <EventWhichCard which={keyCode.which} />
      <DescriptionCard
        description={keyCode.description || keyCodeEvent?.description}
      />
      <MetaKeysCard keyCodeEvent={keyCode} />
      <EventDumpCard keyCodeEvent={keyCode} />
      <SimilarKeysCard keyCodeEvent={keyCode} />
      <UnicodeCard unicode={keyCode.unicode || keyCodeEvent?.unicode} />
      <KeyHistoryCard />
    </CardList>
  )
}

export default KeyCodeCardList
