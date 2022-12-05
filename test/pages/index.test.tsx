import { render, screen } from '@testing-library/react'

import PageProvider from '~/test/lib/page-provider'
import { PROJECT_DISPLAY_NAME } from '~/lib/constants/common'
import Home from 'pages/index'

describe('Home', () => {
  it('renders correctly', async () => {
    render(
      <PageProvider>
        <Home />
      </PageProvider>
    )
    const title = PROJECT_DISPLAY_NAME

    expect(await screen.findByText(title)).toBeInTheDocument()
  })
})
