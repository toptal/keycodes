import { render, screen } from '@testing-library/react'

import MetaKeysCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { mockMetaKeyCodes } from '~/test/mock/key-code'
import { siteCopy } from '~/lib/constants/site-copy'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

describe('Meta keys card', () => {
  it('renders correctly', () => {
    const activeKeyCodeEvent = mockMetaKeyCodes[0][1] as Required<KeyCodeEvent>
    const inactiveKeyCodeEvent =
      mockMetaKeyCodes[1][1] as Required<KeyCodeEvent>

    render(
      <PicassoProvider>
        <MetaKeysCard keyCodeEvent={activeKeyCodeEvent} />
      </PicassoProvider>
    )

    const title = screen.getByRole('heading', { level: 3 })

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(siteCopy.cards.metaKeys)
    expect(
      screen.getByText(activeKeyCodeEvent.unicode).parentElement
    ).toHaveClass('pressed')

    expect(
      screen.getByText(inactiveKeyCodeEvent.unicode).parentElement
    ).not.toHaveClass('pressed')
  })

  it.each(mockMetaKeyCodes)(
    'correctly renders %s card element',
    (_, keyCodeEvent) => {
      render(
        <PicassoProvider>
          <MetaKeysCard keyCodeEvent={keyCodeEvent} />
        </PicassoProvider>
      )

      const unicode = keyCodeEvent.unicode as string

      expect(screen.getByText(unicode)).toBeInTheDocument()
      expect(screen.getByText(unicode).parentElement).toHaveClass('pressed')
    }
  )
})
