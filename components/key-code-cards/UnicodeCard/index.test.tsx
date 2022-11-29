import { render, screen } from '@testing-library/react'

import { TestIdUnicodeCard } from './test-id'

import UnicodeCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { mockKeyCodeEvent } from '~/test/mock/key-code'
import { siteCopy } from '~/lib/constants/site-copy'

describe('Unicode card', () => {
  describe('renders correctly', () => {
    it('with unicode, title', () => {
      render(
        <PicassoProvider>
          <UnicodeCard unicode={mockKeyCodeEvent.unicode} />
        </PicassoProvider>
      )

      const title = screen.getByRole('heading', { level: 3 })

      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(siteCopy.cards.unicode)
      expect(screen.getByText(mockKeyCodeEvent.unicode)).toBeInTheDocument()
    })

    it('without unicode provided', () => {
      render(
        <PicassoProvider>
          <UnicodeCard />
        </PicassoProvider>
      )

      expect(screen.getByTestId(TestIdUnicodeCard.Container)).toHaveTextContent(
        siteCopy.content.whiteSpace,
        { normalizeWhitespace: false }
      )
    })
  })
})
