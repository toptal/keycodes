import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import SimilarKeysCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import {
  keyCodeMock,
  mockSimilarKeyCodeEvents,
  mockSimilarKeyCodeEventWithoutCode
} from '~/test/mock/key-code'
import { findSimilarKeys } from '~/lib/utils/find-similar-keys'
import { siteCopy } from '~/lib/constants/site-copy'
import * as UseKeyCode from '~/lib/state/use-key-code'
import { MOCK_CONTEXT_PROPS } from '~/test/mock/context'

jest.mock('~/lib/utils/find-similar-keys')

const mockFindSimilarKeys = findSimilarKeys as jest.Mock

mockFindSimilarKeys.mockReturnValue(mockSimilarKeyCodeEvents)

jest.mock('~/lib/state/use-key-code', () => ({
  __esModule: true,
  ...jest.requireActual('~/lib/state/use-key-code')
}))

const mockUseKeyCodeState = jest.spyOn(UseKeyCode, 'useKeyCodeState')

mockUseKeyCodeState.mockReturnValue(MOCK_CONTEXT_PROPS)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const router = { push: jest.fn() }

useRouter.mockReturnValue(router)

describe('Similar Keys Card', () => {
  beforeEach(() => {
    render(
      <PicassoProvider>
        <SimilarKeysCard keyCodeEvent={keyCodeMock} />
      </PicassoProvider>
    )
  })

  it('renders correctly', async () => {
    const title = screen.getByRole('heading', { level: 3 })
    const list = screen.getByRole('list')
    const listItems = screen.getAllByRole('listitem')

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(siteCopy.cards.similarValues)
    expect(list).toBeInTheDocument()
    expect(listItems).toHaveLength(mockSimilarKeyCodeEvents.length)
  })

  it('renders similar values with correct links', async () => {
    mockSimilarKeyCodeEvents.forEach(keyCode => {
      expect(screen.getByText(keyCode.code as string)).toHaveAttribute(
        'href',
        `/${keyCode.code}`
      )

      expect(screen.getByText(keyCode.keyCode)).toHaveAttribute(
        'href',
        `/${keyCode.keyCode}`
      )
    })
  })

  it('clicks to similar values correctly', async () => {
    mockSimilarKeyCodeEvents.forEach(keyCode => {
      fireEvent.click(screen.getByText(keyCode.code as string))
      expect(screen.getByText(keyCode.keyCode)).toHaveAttribute(
        'href',
        `/${keyCode.keyCode}`
      )

      expect(MOCK_CONTEXT_PROPS.addKey).toHaveBeenCalledWith(keyCode, true)
    })
  })

  it('renders similar key without code', () => {
    cleanup()

    mockFindSimilarKeys.mockReturnValue([mockSimilarKeyCodeEventWithoutCode])

    render(
      <PicassoProvider>
        <SimilarKeysCard keyCodeEvent={keyCodeMock} />
      </PicassoProvider>
    )

    expect(screen.getByRole('listitem').childElementCount).toEqual(1)
  })
})
