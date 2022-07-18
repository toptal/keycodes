import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'
import Picasso from '@toptal/picasso-provider'
import { ErrorProps as NextErrorProps } from 'next/error'

import { trackPageView, sendToGoogleAnalytics } from '~/lib/analytics'
import { isHappo } from '~/lib/utils/is-happo'
import '../styles/globals.scss'
import { useKeyWatcher } from '~/lib/state/use-key-watcher'

import KeyCodeProvider from '~/components/KeyCodeProvider'

export type MyAppProps = {
  error: NextErrorProps
} & AppProps

const Page = ({ Component, pageProps, error }: MyAppProps) => {
  useKeyWatcher()

  return (
    <Picasso
      loadFavicon={false}
      fixViewport={false}
      loadFonts={false}
      disableClassNamePrefix={!isHappo()}
    >
      <Component {...pageProps} error={error} />
    </Picasso>
  )
}

function MyApp(props: MyAppProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    onCLS(sendToGoogleAnalytics)
    onFCP(sendToGoogleAnalytics)
    onFID(sendToGoogleAnalytics)
    onINP(sendToGoogleAnalytics)
    onLCP(sendToGoogleAnalytics)
    onTTFB(sendToGoogleAnalytics)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <KeyCodeProvider>
      <Page {...props} />
    </KeyCodeProvider>
  )
}

export default MyApp
