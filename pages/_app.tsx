import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'

import { trackPageView, sendToGoogleAnalytics } from '~/lib/analytics'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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

  return <Component {...pageProps} />
}

export default MyApp
