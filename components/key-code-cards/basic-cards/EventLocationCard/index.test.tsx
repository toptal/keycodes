import { screen, render } from '@testing-library/react'

import { TestIdEvenLocationCard } from './test-ids'

import EventLocationCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { siteCopy } from '~/lib/constants/site-copy'
import { mockKeyCodeEvent } from '~/test/mock/key-code'
import cardDescriptions from '~/lib/constants/descriptions'
import { keyLocations } from '~/lib/keycodes/locations'

describe('Event location card', () => {
  describe('correctly renders', () => {
    it('with location', () => {
      render(
        <PicassoProvider>
          <EventLocationCard keyLocation={mockKeyCodeEvent.location} />
        </PicassoProvider>
      )

      expect(
        screen.getByText(keyLocations[mockKeyCodeEvent.location])
      ).toBeInTheDocument()
      expect(screen.getByText(siteCopy.cards.eventLocation)).toBeInTheDocument()
      expect(
        screen.getByText(cardDescriptions.eventLocation)
      ).toBeInTheDocument()
    })

    it.each([undefined, 5])('nothing for %s', location => {
      render(
        <PicassoProvider>
          <EventLocationCard keyLocation={location} />
        </PicassoProvider>
      )

      expect(
        screen.getByTestId(TestIdEvenLocationCard.EventLocationCardContainer)
      ).toHaveTextContent('')
    })
  })
})
