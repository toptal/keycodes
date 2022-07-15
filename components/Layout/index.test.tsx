import { render } from '@testing-library/react'

import {
  PROJECT_URL,
  TWITTER_HANDLE,
  OG_TITLE,
  PROJECT_DESCRIPTION,
  OG_IMAGE_URL,
} from '~/lib/constants/common'
import PicassoProvider from '~/test/lib/picasso-provider'

import Layout from '~/components/Layout'

jest.mock('next/head', () => {
  const ReactDOMServer = require('react-dom/server')

  return {
    __esModule: true,
    default: ({
      children,
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
    },
  }
})

describe('Default layout', () => {
  it('correctly Prints Open Graph Meta Tags', async () => {
    const tree = render(
      <PicassoProvider>
        <Layout>
          <title>test</title>
        </Layout>
      </PicassoProvider>
    )

    const head = tree.baseElement.parentElement?.firstChild as HTMLHeadElement

    expect(
      head
        .querySelector('meta[property="og:title"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe(OG_TITLE)

    expect(
      head
        .querySelector('meta[property="og:description"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe(PROJECT_DESCRIPTION)

    expect(
      head
        .querySelector('meta[name="description"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe(PROJECT_DESCRIPTION)

    expect(
      head
        .querySelector('meta[property="og:type"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe('website')

    expect(
      head
        .querySelector('meta[property="og:image"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe(OG_IMAGE_URL)

    expect(
      head
        .querySelector('meta[property="og:url"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe(PROJECT_URL)

    expect(
      head
        .querySelector('meta[name="twitter:site"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe(TWITTER_HANDLE)

    expect(
      head
        .querySelector('meta[name="twitter:card"]')
        ?.attributes.getNamedItem('content')?.value
    ).toBe('summary_large_image')
  })
})
