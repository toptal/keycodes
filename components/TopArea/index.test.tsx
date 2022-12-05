import { render, screen } from '@testing-library/react'

import TopArea from '.'

import PicassoProvider from '~/test/lib/picasso-provider'

describe('Top Area', () => {
  const keycode = 10

  beforeEach(() => {
    render(
      <PicassoProvider>
        <TopArea keyCode={keycode} />
      </PicassoProvider>
    )
  })

  it('correctly renders component', async () => {
    expect(await screen.findByText(keycode.toString())).toBeInTheDocument()
    expect(await screen.findByText('Key Code Information')).toBeInTheDocument()
  })
})
