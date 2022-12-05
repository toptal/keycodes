import { render, screen } from '@testing-library/react'

import KeyCodePage from '~/pages/[key]'

import { mockKeyCodeKeyParams } from '~/test/mock/key-code'
import PageProvider from '~/test/lib/page-provider'
import { PROJECT_DISPLAY_NAME } from '~/lib/constants/common'
import { siteCopy } from '~/lib/constants/site-copy'

describe('KeyCode Page', () => {
  beforeEach(() => {
    render(
      <PageProvider>
        <KeyCodePage {...mockKeyCodeKeyParams} />
      </PageProvider>
    )
  })

  it('renders correctly', async () => {
    const title = PROJECT_DISPLAY_NAME

    expect(await screen.findByText(title)).toBeInTheDocument()
  })

  it('contains main title', async () => {
    const titles = screen.getAllByRole('heading', { level: 1 })

    expect(titles[0].tagName.toLowerCase()).toEqual('h1')
    expect(titles[0]).toHaveTextContent(siteCopy.titles.main)
  })

  it('contains section title', async () => {
    const titles = screen.getAllByRole('heading', { level: 2 })

    expect(titles[0].tagName.toLowerCase()).toEqual('h2')
    expect(titles[0]).toHaveTextContent(siteCopy.titles.topArea)
  })

  it('contains card titles', async () => {
    const titles = screen.getAllByRole('heading', { level: 3 })
    const cardTitles = Object.values(siteCopy.cards)

    for (let i = 0; i < titles.length; i++) {
      expect(titles[i].tagName.toLowerCase()).toEqual('h3')
      expect(titles[i]).toHaveTextContent(cardTitles[i])
    }
  })
})
