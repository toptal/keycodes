import { screen, render } from '@testing-library/react'

import DescriptionCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { siteCopy } from '~/lib/constants/site-copy'
import { mockKeyCodeEvent } from '~/test/mock/key-code'

describe('Description card', () => {
  describe('correctly renders', () => {
    it('with description', () => {
      render(
        <PicassoProvider>
          <DescriptionCard description={mockKeyCodeEvent.description} />
        </PicassoProvider>
      )

      expect(screen.getByText(mockKeyCodeEvent.description)).toBeInTheDocument()
      expect(screen.getByText(siteCopy.cards.description)).toBeInTheDocument()
    })

    it('without description', () => {
      render(
        <PicassoProvider>
          <DescriptionCard />
        </PicassoProvider>
      )

      expect(
        screen.getByText(siteCopy.content.noDescription)
      ).toBeInTheDocument()
    })
  })
})
