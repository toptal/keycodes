import Head from 'next/head'
import { Header, Footer, CookieBanner } from '@toptal/site-acq-ui-library'
import { Container } from '@toptal/picasso'
import { ReactNode } from 'react'

import routes from '~/lib/constants/routes'
import {
  PROJECT_DISPLAY_NAME,
  PROJECT_URL,
  PROJECT_DESCRIPTION,
  TWITTER_HANDLE,
  OG_TITLE,
  OG_IMAGE_URL
} from '~/lib/constants/common'
import { withBasePath } from '~/lib/utils/with-base-path'

import styles from './layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
  pageDescription?: string
}

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  return <main className={styles.main}>{children}</main>
}

const Layout = ({
  children,
  pageTitle,
  pageDescription
}: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta property="og:title" content={pageTitle || OG_TITLE} />
        <meta
          property="og:description"
          content={pageDescription || PROJECT_DESCRIPTION}
        />
        <meta
          name="description"
          content={pageDescription || PROJECT_DESCRIPTION}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:url" content={PROJECT_URL} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={routes.publicRelative('/apple-touch-icon.png')}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${routes.publicRelative('/favicon-32x32.png')}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${routes.publicRelative('/favicon-16x16.png')}`}
        />
        <link
          rel="mask-icon"
          href={`${routes.publicRelative('/safari-pinned-tab.svg')}`}
          color="#204ecf"
        />
        <link
          rel="shortcut icon"
          href={`${routes.publicRelative('/favicon.ico')}`}
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content={`${routes.publicRelative('/browserconfig.xml')}`}
        />
        <meta name="theme-color" content="#5bbad5" />
        {process.env.noindexEnabled ? (
          <meta
            name="robots"
            content="noindex, nofollow, nosnippet, noarchive"
          />
        ) : (
          <meta name="robots" content="follow, index" />
        )}
        <title>{PROJECT_DISPLAY_NAME}</title>
      </Head>
      <div className={styles.layout}>
        <Header
          name={PROJECT_DISPLAY_NAME}
          homeUrl={withBasePath(routes.home)}
          withHeaderTag={false}
        />
        <Container className={styles.container} flex>
          {children}
        </Container>
        <Footer verticalUrl={routes.developers} />
        <div data-happo-hide={true}>
          <CookieBanner />
        </div>
      </div>
    </>
  )
}

Layout.Main = Main

export default Layout
