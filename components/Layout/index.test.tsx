import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import Layout from '~/components/Layout'

import {
  PROJECT_URL,
  TWITTER_HANDLE,
  OG_TITLE,
  PROJECT_DESCRIPTION,
  OG_IMAGE_URL
} from '~/lib/constants/common'
import PicassoProvider from '~/test/lib/picasso-provider'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const pushMock = jest.fn()
const useRouterMock = useRouter as jest.Mock

useRouterMock.mockImplementation(() => ({
  asPath: '/',
  push: pushMock
}))

jest.mock('next/head', () => {
  global.TextEncoder = require('util').TextEncoder
  const ReactDOMServer = require('react-dom/server')

  return {
    __esModule: true,
    default: ({
      children
    }: {
      children: Array<React.ReactElement> | React.ReactElement | null
    }) => {
      if (children) {
        global.document.head.insertAdjacentHTML(
          'afterbegin',
          ReactDOMServer.renderToString(children) || ''
        )
      }

      return null
    }
  }
})

describe('Default layout', () => {
  beforeEach(() => {
    render(
      <PicassoProvider>
        <Layout>
          <title>test</title>
        </Layout>
      </PicassoProvider>
    )
  })

  it('correctly Prints Open Graph Meta Tags', async () => {
    expect(
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content')
    ).toBe(OG_TITLE)

    expect(
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content')
    ).toBe(PROJECT_DESCRIPTION)

    expect(
      document
        .querySelector('meta[property="og:type"]')
        ?.getAttribute('content')
    ).toBe('website')

    expect(
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content')
    ).toBe(OG_IMAGE_URL)

    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    ).toBe(PROJECT_URL)

    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content')
    ).toBe(PROJECT_DESCRIPTION)

    expect(
      document
        .querySelector('meta[name="twitter:site"]')
        ?.getAttribute('content')
    ).toBe(TWITTER_HANDLE)

    expect(
      document
        .querySelector('meta[name="twitter:card"]')
        ?.getAttribute('content')
    ).toBe('summary_large_image')
  })

  it('clicks to the "Table" button correctly', async () => {
    fireEvent.click(screen.getByText('Table'))

    expect(pushMock).toHaveBeenCalledWith('/table')
  })

  it('renders cookiebanner', () => {
    expect(screen.getByTestId('cookie-banner')).toBeInTheDocument()
  })
})
