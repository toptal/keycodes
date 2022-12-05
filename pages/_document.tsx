import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { getServersideStylesheets } from '@toptal/picasso-provider'

import GoogleAnalytics from '~/components/GoogleAnalytics'

import { BASE_PATH } from '~/lib/constants/common'

export default class MyDocument extends Document {
  static getInitialProps = async (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> => {
    const sheets = getServersideStylesheets()

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
        enhanceComponent: Component => props =>
          sheets.collect(<Component {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href={`${BASE_PATH}/assets/fonts/ProximaNova-Regular.woff2`}
            as="font"
            crossOrigin=""
            type="font/woff2"
          />
          <link
            rel="preload"
            href={`${BASE_PATH}/assets/fonts/ProximaNova-Semibold.woff2`}
            as="font"
            crossOrigin=""
            type="font/woff2"
          />
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
