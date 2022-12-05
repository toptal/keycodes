import { fireEvent, render, screen } from '@testing-library/react'

import LinkCell from '.'

import { mockKeyCodeEvent } from '~/test/mock/key-code'
import * as UseKeyCode from '~/lib/state/use-key-code'
import { MOCK_CONTEXT_PROPS } from '~/test/mock/context'

const MOCK_CONTENT = 'mock'
const MOCK_PATH = '/mock-path'
const MOCK_CONTENT_SLUGIFIABLE = 'mock content'

jest.mock('~/lib/state/use-key-code', () => ({
  __esModule: true,
  ...jest.requireActual('~/lib/state/use-key-code')
}))

const mockUseKeyCodeState = jest.spyOn(UseKeyCode, 'useKeyCodeState')

mockUseKeyCodeState.mockReturnValue(MOCK_CONTEXT_PROPS)

describe('LinkCell', () => {
  it('correctly renders', () => {
    render(
      <LinkCell
        keyCodeEvent={mockKeyCodeEvent}
        content={MOCK_CONTENT}
        path={MOCK_PATH}
      />
    )

    const link = screen.getByText(MOCK_CONTENT)

    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toEqual(MOCK_PATH)
  })

  it('programmatically navigates', () => {
    render(
      <LinkCell
        keyCodeEvent={mockKeyCodeEvent}
        content={MOCK_CONTENT_SLUGIFIABLE}
        path={MOCK_PATH}
      />
    )

    const link = screen.getByText(MOCK_CONTENT_SLUGIFIABLE)

    fireEvent.click(link)

    expect(MOCK_CONTEXT_PROPS.addKey).toHaveBeenCalledWith(
      mockKeyCodeEvent,
      true
    )
  })
})
