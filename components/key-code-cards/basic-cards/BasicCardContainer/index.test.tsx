import { render, screen } from '@testing-library/react'

import BasicCardContainer from '.'

import PicassoProvider from '~/test/lib/picasso-provider'

const mockChildren = 'Mock Children'
const mockDescription = 'Mock Description'
const mockTitle = 'Mock Title'

describe('Basic card container', () => {
  it('renders correctly', () => {
    render(
      <PicassoProvider>
        <BasicCardContainer title={mockTitle} description={mockDescription}>
          {mockChildren}
        </BasicCardContainer>
      </PicassoProvider>
    )

    const title = screen.getByRole('heading', { level: 3 })
    const description = screen.getByText(mockDescription)
    const contentContainer = screen.getByRole('button')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(contentContainer).toHaveTextContent(mockChildren)
  })
})
