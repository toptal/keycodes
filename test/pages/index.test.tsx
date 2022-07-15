import { render } from '@testing-library/react'

import { PROJECT_DISPLAY_NAME } from '~/lib/constants/common'

import PageProvider from '../lib/page-provider'

import Home from 'pages/index'

describe('Home', () => {
  it('renders correctly', async () => {
    const { findByText } = render(
      <PageProvider>
        <Home />
      </PageProvider>
    )
    const title = PROJECT_DISPLAY_NAME

    expect(await findByText(title)).toBeInTheDocument()
  })
})
