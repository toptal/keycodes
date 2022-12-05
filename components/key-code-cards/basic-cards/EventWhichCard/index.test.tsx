import { screen, render } from '@testing-library/react'

import EventWhichCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { siteCopy } from '~/lib/constants/site-copy'
import { mockKeyCodeEvent } from '~/test/mock/key-code'

describe('Event which card', () => {
  it('correctly renders', () => {
    render(
      <PicassoProvider>
        <EventWhichCard which={mockKeyCodeEvent.which} />
      </PicassoProvider>
    )

    expect(screen.getByText(mockKeyCodeEvent.which)).toBeInTheDocument()
    expect(screen.getByText(siteCopy.cards.eventWhich)).toBeInTheDocument()
  })
})
