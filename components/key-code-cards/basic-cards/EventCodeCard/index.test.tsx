import { screen, render } from '@testing-library/react'

import EventCodeCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { siteCopy } from '~/lib/constants/site-copy'
import { mockKeyCodeEvent } from '~/test/mock/key-code'
import cardDescriptions from '~/lib/constants/descriptions'

describe('Event code card', () => {
  it('correctly renders', () => {
    render(
      <PicassoProvider>
        <EventCodeCard code={mockKeyCodeEvent.code} />
      </PicassoProvider>
    )

    expect(screen.getByText(mockKeyCodeEvent.code)).toBeInTheDocument()
    expect(screen.getByText(siteCopy.cards.eventCode)).toBeInTheDocument()
    expect(screen.getByText(cardDescriptions.eventCode)).toBeInTheDocument()
  })
})
