import { getDefaultNormalizer, render, screen } from '@testing-library/react'

import EventDumpCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { mockKeyCodeEvent } from '~/test/mock/key-code'
import { siteCopy } from '~/lib/constants/site-copy'

describe('EventDumpCard', () => {
  it('renders correctly', () => {
    render(
      <PicassoProvider>
        <EventDumpCard keyCodeEvent={mockKeyCodeEvent} />
      </PicassoProvider>
    )

    const title = screen.getByRole('heading', { level: 3 })

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(siteCopy.cards.eventDump)
    expect(
      screen.getByText(JSON.stringify(mockKeyCodeEvent, null, ' '), {
        selector: 'pre',
        normalizer: getDefaultNormalizer({ collapseWhitespace: false })
      })
    ).toBeInTheDocument()
  })
})
