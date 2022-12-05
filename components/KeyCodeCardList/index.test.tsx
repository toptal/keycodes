import { render, screen } from '@testing-library/react'

import KeyCodeCardList from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { mockKeyCodeEvent } from '~/test/mock/key-code'
import { siteCopy } from '~/lib/constants/site-copy'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const router = { push: jest.fn() }

useRouter.mockReturnValue(router)

const cardTitles = Object.values(siteCopy.cards)

describe('Key Code Card List', () => {
  it('renders correctly', async () => {
    const keyCode = mockKeyCodeEvent

    render(
      <PicassoProvider>
        <KeyCodeCardList keyCode={keyCode} />
      </PicassoProvider>
    )

    const titles = screen.getAllByRole('heading', { level: 3 })

    expect(titles).toHaveLength(10)

    titles.forEach((title, index) =>
      expect(title).toHaveTextContent(cardTitles[index])
    )
  })
})
