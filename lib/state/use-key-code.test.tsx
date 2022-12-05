import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-12'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import { KeyCodeEvent } from '../types/key-code-events'
import { useTouchDevice } from '../hooks/use-touch-device.hook'

import { KeyCodeProvider, useKeyCodeState } from './use-key-code'

jest.mock('~/lib/hooks/use-touch-device.hook', () => ({
  useTouchDevice: jest.fn()
}))

const useTouchDeviceMock = useTouchDevice as jest.Mock

useTouchDeviceMock.mockReturnValue(false)

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const pushMock = jest.fn()
const useRouterMock = useRouter as jest.Mock

useRouterMock.mockImplementation(() => ({
  asPath: '/',
  push: pushMock
}))

enum TestIdCards {
  KeyHistoryCardParent = 'history-card-parent',
  KeyHistoryCard = 'history-card',
  SingleKeyCode = 'single-key-code',
  AddKeyCode = 'add-key-code'
}

const mockKeyEvents: Record<string, KeyCodeEvent> = {
  a: {
    altKey: false,
    code: 'KeyA',
    ctrlKey: false,
    key: 'a',
    keyCode: 65,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 65,
    path: '/a'
  },
  b: {
    altKey: false,
    code: 'KeyB',
    ctrlKey: false,
    key: 'b',
    keyCode: 66,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 66
  },
  c: {
    altKey: false,
    code: 'KeyC',
    ctrlKey: false,
    key: 'c',
    keyCode: 67,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 67
  },
  d: {
    altKey: false,
    code: 'KeyD',
    ctrlKey: false,
    key: 'd',
    keyCode: 68,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 68
  },
  e: {
    altKey: false,
    code: 'KeyE',
    ctrlKey: false,
    key: 'e',
    keyCode: 69,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 69
  }
}

jest.mock('./generate-key', () => ({
  generateKey: jest.fn().mockImplementation(e => {
    if (mockKeyEvents[e.key as string]) {
      return mockKeyEvents[e.key]
    }

    return e
  })
}))

const MockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouterProvider>
      <KeyCodeProvider>{children}</KeyCodeProvider>
    </MemoryRouterProvider>
  )
}

const TestKeyCodeComponent = () => {
  const { key, keyHistory, addKey } = useKeyCodeState()

  return (
    <div>
      <div>
        <span data-testid={TestIdCards.SingleKeyCode}>{key?.key}</span>
      </div>
      <div data-testid={TestIdCards.KeyHistoryCardParent}>
        {keyHistory.map(hk => (
          <span
            data-testid={`${TestIdCards.KeyHistoryCard}-${hk.key}`}
            key={hk.key}
          >
            {hk.key}
          </span>
        ))}
      </div>
      <button
        data-testid={TestIdCards.AddKeyCode}
        onClick={() => addKey(mockKeyEvents.a)}
      />
    </div>
  )
}

describe('useKeyCode hook', () => {
  it('key has default value of empty string', () => {
    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    expect(screen.getByTestId(TestIdCards.SingleKeyCode).textContent).toEqual(
      ''
    )
  })

  it('setKey sets last pressed key', async () => {
    const user = userEvent.setup()

    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    await user.keyboard('abc')

    expect(screen.getByTestId(TestIdCards.SingleKeyCode).textContent).toEqual(
      'c'
    )
  })

  it('keyHistory has default value of 0', () => {
    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    expect(
      screen.getByTestId(TestIdCards.KeyHistoryCardParent).childElementCount
    ).toEqual(0)
  })

  it('setKeyHistory sets the key history with last 4 key presses', async () => {
    const user = userEvent.setup()

    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    await user.keyboard('abcde')

    expect(
      screen.getByTestId(TestIdCards.KeyHistoryCardParent).childElementCount
    ).toEqual(4)

    expect(
      screen.getByTestId(`${TestIdCards.KeyHistoryCard}-b`).textContent
    ).toEqual('b')

    expect(
      screen.getByTestId(`${TestIdCards.KeyHistoryCard}-c`).textContent
    ).toEqual('c')

    expect(
      screen.getByTestId(`${TestIdCards.KeyHistoryCard}-d`).textContent
    ).toEqual('d')

    expect(
      screen.getByTestId(`${TestIdCards.KeyHistoryCard}-e`).textContent
    ).toEqual('e')
  })

  it('does not show user keyboard events on touch devices', async () => {
    useTouchDeviceMock.mockReturnValue(true)

    const user = userEvent.setup()

    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    await user.keyboard('abcde')

    expect(
      screen.getByTestId(TestIdCards.KeyHistoryCardParent).childElementCount
    ).toEqual(0)

    expect(screen.getByTestId(TestIdCards.SingleKeyCode).textContent).toEqual(
      ''
    )
  })

  it('changes route to home page after clicking on keyboard', async () => {
    useRouterMock.mockImplementation(() => ({
      asPath: '/a',
      push: pushMock
    }))

    useTouchDeviceMock.mockReturnValue(false)

    const user = userEvent.setup()

    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    await user.keyboard('a')

    expect(pushMock).toHaveBeenCalledWith('/')
  })

  it('does not change route after calling addKey function on home page', async () => {
    useRouterMock.mockImplementation(() => ({
      asPath: '/',
      push: pushMock
    }))

    useTouchDeviceMock.mockReturnValue(false)

    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    fireEvent.click(screen.getByTestId(TestIdCards.AddKeyCode))

    expect(
      screen.getByTestId(TestIdCards.KeyHistoryCardParent).childElementCount
    ).toEqual(0)

    expect(screen.getByTestId(TestIdCards.SingleKeyCode).textContent).toEqual(
      'a'
    )

    expect(pushMock).toHaveBeenCalledWith('/')
  })

  it('changes route to keycode page after calling addKey function on table page', async () => {
    useRouterMock.mockImplementation(() => ({
      asPath: '/table',
      push: pushMock
    }))

    useTouchDeviceMock.mockReturnValue(false)

    render(
      <MockWrapper>
        <TestKeyCodeComponent />
      </MockWrapper>
    )

    fireEvent.click(screen.getByTestId(TestIdCards.AddKeyCode))

    expect(
      screen.getByTestId(TestIdCards.KeyHistoryCardParent).childElementCount
    ).toEqual(0)

    expect(screen.getByTestId(TestIdCards.SingleKeyCode).textContent).toEqual(
      'a'
    )

    expect(pushMock).toHaveBeenCalledWith('/a')
  })
})
