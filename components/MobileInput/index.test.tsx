import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { TestIdMobileInput } from './test-ids'

import MobileInput from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { useTouchDevice } from '~/lib/hooks/use-touch-device.hook'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'
import { siteCopy } from '~/lib/constants/site-copy'
import { KeyCodeEvent } from '~/lib/types/key-code-events'
import routes from '~/lib/constants/routes'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('~/lib/hooks/use-touch-device.hook', () => ({
  useTouchDevice: jest.fn()
}))

const useRouterMock = useRouter as jest.Mock

const pushMock = jest.fn()

useRouterMock.mockImplementation(() => ({
  push: pushMock,
  asPath: routes.table
}))

const useTouchDeviceMock = useTouchDevice as jest.Mock

const makeChangesOnTextBox = (value: string, key: KeyCodeEvent) => {
  const textBox = screen.getByRole('textbox')

  fireEvent.change(textBox, { target: { value } })
  fireEvent.keyUp(textBox, key)
}

const Component = () => (
  <PicassoProvider>
    <MobileInput />
  </PicassoProvider>
)

describe('Mobile Input', () => {
  beforeEach(() => {
    useTouchDeviceMock.mockReturnValue(true)
    render(<Component />)
  })

  it('correctly renders elements', () => {
    expect(
      screen.getByPlaceholderText(siteCopy.content.mobileInputPlaceholder)
    ).toBeInTheDocument()
  })

  it('opens and closes keyboard on input change', () => {
    makeChangesOnTextBox('a', keyCodesWithEvents[65])
    const textBox = screen.getByRole('textbox')

    expect(textBox).toHaveAttribute('inputmode', 'none')
    fireEvent.click(textBox)
    expect(textBox).toHaveAttribute('inputmode', 'text')
  })

  it('opens keycode page on input change', () => {
    makeChangesOnTextBox('a', keyCodesWithEvents[65])

    expect(screen.getByRole('textbox').textContent).toEqual('')
  })

  it('opens keycode page for unknown keycodes on input change', () => {
    makeChangesOnTextBox('x', keyCodesWithEvents[229])

    expect(screen.getByRole('textbox').textContent).toEqual('')
  })

  it('opens keycode page on input change 2', () => {
    makeChangesOnTextBox('Shift', keyCodesWithEvents[16])

    expect(screen.getByRole('textbox').textContent).toEqual('')
  })

  it('hides input on /table page', () => {
    expect(
      screen.getByTestId(TestIdMobileInput.MobileInputContainer)
    ).toHaveClass('hide')
  })
})
