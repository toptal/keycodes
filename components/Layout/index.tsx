import { ReactNode } from 'react'
import Head from 'next/head'
import Container from '@toptal/picasso/Container'
import Button from '@toptal/picasso/Button'
import { Header, Footer, CookieBanner } from '@toptal/site-acq-ui-library'
import { useRouter } from 'next/router'
import cx from 'classnames'

import MobileInput from '~/components/MobileInput'
import PageTitle from '~/components/PageTitle'

import styles from './layout.module.scss'
import { TestIdLayout } from './test-ids'

import routes from '~/lib/constants/routes'
import {
  PROJECT_DISPLAY_NAME,
  PROJECT_URL,
  PROJECT_DESCRIPTION,
  TWITTER_HANDLE,
  OG_TITLE,
  OG_IMAGE_URL
} from '~/lib/constants/common'

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
  pageHeading?: string
  pageHeadingClassName?: string
  pageDescription?: string
  className?: string
}

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <main data-testid={TestIdLayout.Main} className={styles.main}>
      {children}
    </main>
  )
}

const Layout = ({
  children,
  pageTitle,
  pageDescription,
  pageHeading,
  pageHeadingClassName,
  className
}: LayoutProps): JSX.Element => {
  const router = useRouter()

  const canonicalHREF = `${PROJECT_URL}${
    router.asPath === '/' ? '' : router.asPath
  }`

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
        <link rel="canonical" href={canonicalHREF} />
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
        <title>{pageTitle}</title>
      </Head>
      <div className={styles.layout}>
        <Header
          name={PROJECT_DISPLAY_NAME}
          isHomePage={router.pathname === routes.home}
          onClickHomeUrl={() => router.push(routes.home)}
        >
          <Button
            role="button"
            className={styles.headerButton}
            variant="transparent"
            onClick={() => router.push(routes.table)}
          >
            Table
          </Button>
        </Header>
        <Container flex className={cx(styles.container, className)}>
          <MobileInput />
          <Main>
            {pageHeading && (
              <PageTitle text={pageHeading} className={pageHeadingClassName} />
            )}
            {children}
          </Main>
        </Container>
        <Footer verticalUrl={routes.developers} />
        <div data-happo-hide={true} className={styles.cookieBannerWrapper}>
          <CookieBanner />
        </div>
      </div>
    </>
  )
}

export default Layout
