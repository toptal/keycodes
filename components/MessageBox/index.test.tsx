import { render, screen } from '@testing-library/react'

import MessageBox from '.'

import PicassoProvider from '~/test/lib/picasso-provider'

describe('Message Box', () => {
  const mockMessage = 'test message'

  beforeEach(() => {
    render(
      <PicassoProvider>
        <MessageBox message={mockMessage} />
      </PicassoProvider>
    )
  })

  it('renders component correctly', () => {
    expect(screen.getByText(mockMessage)).toBeInTheDocument()
  })
})
