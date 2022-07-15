import Container from '@toptal/picasso/Container'

import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'

import {
  EventKeyCard,
  EventLocationCard,
  EventCodeCard,
  EventDumpCard,
  EventWhichCard,
  DescriptionCard,
  UnicodeCard,
} from '~/components/KeyCodeCards/BasicCards'
import MetaKeysCard from '~/components/KeyCodeCards/MetaKeysCard'
import KeyHistoryCard from '~/components/KeyCodeCards/KeyHistoryCard'
import SimilarKeysCard from '~/components/KeyCodeCards/SimilarKeysCard'

// TODO: fix this component

type KeyCodeCardList = {
  keyCode: KeyCodeEvent
}

const KeyCodeCardList = ({ keyCode }: KeyCodeCardList): JSX.Element => {
  const keyCodeEvent = keyCodesWithEvents[keyCode.keyCode]

  return (
    <Container flex style={{ flexWrap: 'wrap' }}>
      <EventKeyCard key={keyCode.key} />
      <EventLocationCard keyLocation={keyCode.location} />
      <EventCodeCard code={keyCode.code} />
      <EventWhichCard which={keyCode.which} />
      <EventDumpCard keyCode={keyCode} />
      <DescriptionCard description={keyCodeEvent.description} />
      <UnicodeCard unicode={keyCodeEvent.unicode} />
      <SimilarKeysCard keyCode={keyCode} />
      <MetaKeysCard keyCode={keyCode} />
      <KeyHistoryCard unicode={keyCodeEvent.unicode} />
    </Container>
  )
}

export default KeyCodeCardList
