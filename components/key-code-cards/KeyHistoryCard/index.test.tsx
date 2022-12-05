import { fireEvent, render, screen } from '@testing-library/react'

import { TestIdKeyHistoryCard } from './test-id'
import * as CreateKeyVisualModule from './create-key-visual'

import KeyHistoryCard from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { siteCopy } from '~/lib/constants/site-copy'
import {
  mockMetaKeyCodes,
  mockSimilarKeyCodeEvents as mockKeyCodeEventList
} from '~/test/mock/key-code'
import { MOCK_CONTEXT_PROPS } from '~/test/mock/context'
import { KeyCodeContext } from '~/lib/state/use-key-code'
import { META_KEYS } from '~/lib/constants/meta-keys'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const addKeyMock = jest.fn()
const addToKeyHistoryMock = jest.fn()

jest.mock('./create-key-visual', () => ({
  __esModule: true,
  ...jest.requireActual('./create-key-visual')
}))

const createKeyVisualMock = jest.spyOn(CreateKeyVisualModule, 'createKeyVisual')

const renderHistoryComponent = (history: KeyCodeEvent[]) => {
  render(
    <PicassoProvider>
      <KeyCodeContext.Provider
        value={{
          ...MOCK_CONTEXT_PROPS,
          addKey: addKeyMock,
          addToKeyHistory: addToKeyHistoryMock,
          keyHistory: history
        }}
      >
        <KeyHistoryCard />
      </KeyCodeContext.Provider>
    </PicassoProvider>
  )
}

describe('Key history card', () => {
  it('correctly renders history card elements', () => {
    renderHistoryComponent(mockKeyCodeEventList)

    const title = screen.getByRole('heading', { level: 3 })
    const buttons = screen.getAllByRole('button')

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(siteCopy.cards.keyHistory)
    expect(createKeyVisualMock).toHaveBeenCalledTimes(
      mockKeyCodeEventList.length
    )

    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(
        CreateKeyVisualModule.createKeyVisual(mockKeyCodeEventList[index])
      )
    })
  })

  it.each(mockMetaKeyCodes)(
    'correctly renders history for meta %s card symbol',
    (name, keyCode) => {
      renderHistoryComponent([keyCode])

      expect(screen.getByText(META_KEYS[name].code)).toBeInTheDocument()
    }
  )

  it('correctly clicks to the history elements', () => {
    renderHistoryComponent(mockKeyCodeEventList)

    const buttons = screen.getAllByRole('button')

    buttons.forEach((button, index) => {
      const keyCodeEvent = mockKeyCodeEventList[index]

      fireEvent.click(button)

      expect(addKeyMock).toHaveBeenCalledWith(keyCodeEvent)
    })
  })

  it('does not render anything when history is empty', () => {
    renderHistoryComponent([])

    expect(
      screen.getByTestId(TestIdKeyHistoryCard.Container)
    ).toBeEmptyDOMElement()
  })
})
