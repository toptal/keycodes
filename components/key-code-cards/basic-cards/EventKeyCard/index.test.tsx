import { render, screen } from '@testing-library/react'

import EventKeyCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { mockKeyCodeEvent } from '~/test/mock/key-code'
import { siteCopy } from '~/lib/constants/site-copy'
import cardDescriptions from '~/lib/constants/descriptions'

describe('Event key card', () => {
  describe('correcly renders', () => {
    it('event key, titles and description', () => {
      render(
        <PicassoProvider>
          <EventKeyCard eventKey={mockKeyCodeEvent.key} />
        </PicassoProvider>
      )

      expect(screen.getByText(mockKeyCodeEvent.key)).toBeInTheDocument()
      expect(screen.getByText(siteCopy.cards.eventKey)).toBeInTheDocument()
      expect(screen.getByText(cardDescriptions.eventKey)).toBeInTheDocument()
    })

    it('white space event key', () => {
      render(
        <PicassoProvider>
          <EventKeyCard eventKey=" " />
        </PicassoProvider>
      )

      expect(screen.getByText(siteCopy.content.blankSpace)).toBeInTheDocument()
    })
  })
})
