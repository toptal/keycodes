import { render, screen } from '@testing-library/react'

import NotFound from '~/pages/404'

import PageProvider from '../lib/page-provider'

describe('Not Found Page', () => {
  beforeEach(() => {
    render(
      <PageProvider>
        <NotFound />
      </PageProvider>
    )
  })

  test('correctly renders', () => {
    expect(screen.queryByText('404')).toBeInTheDocument()
    expect(
      screen.queryByText(
        'Unfortunately, the page you’re looking for doesn’t exist.'
      )
    ).toBeInTheDocument()
  })
})
