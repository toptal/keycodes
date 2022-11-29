import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'
import PicassoLight from '@toptal/picasso-provider/Picasso/PicassoLight'
import { ErrorProps as NextErrorProps } from 'next/error'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import { KeyCodeProvider } from '~/lib/state/use-key-code'
import { trackPageView, trackPageRead } from '~/lib/analytics'
import { isHappo } from '~/lib/utils/is-happo'
import '@toptal/site-acq-ui-library/src/index.css'
import '../styles/globals.scss'
import { BOUNCE_RATE_TIMEOUT } from '~/lib/constants/common'
import { reportWebVitals } from '~/lib/analytics/report-web-vitals'

export type MyAppProps = {
  error: NextErrorProps
} & AppProps

const generateClassName = createGenerateClassName({
  seed: 'KK'
})

const Page = ({ Component, pageProps, error }: MyAppProps) => {
  return (
    <PicassoLight disableClassNamePrefix={!isHappo()}>
      <StylesProvider generateClassName={generateClassName}>
        <KeyCodeProvider>
          <Component {...pageProps} error={error} />
        </KeyCodeProvider>
      </StylesProvider>
    </PicassoLight>
  )
}

function MyApp(props: MyAppProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    let timeoutId: number

    const handleRouteChange = (url: string) => {
      window.clearTimeout(timeoutId)

      timeoutId = window.setTimeout(trackPageRead, BOUNCE_RATE_TIMEOUT)

      trackPageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    onCLS(reportWebVitals)
    onFCP(reportWebVitals)
    onFID(reportWebVitals)
    onINP(reportWebVitals)
    onLCP(reportWebVitals)
    onTTFB(reportWebVitals)

    return () => {
      window.clearTimeout(timeoutId)

      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Page {...props} />
}

export default MyApp
