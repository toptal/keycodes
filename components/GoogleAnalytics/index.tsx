import Head from 'next/head'
import Script from 'next/script'

import { CONTENT_GROUP, BOUNCE_RATE_TIMEOUT } from '~/lib/constants/common'

const GoogleAnalytics = (): JSX.Element => {
  return (
    <>
      <Head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        async
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){dataLayer.push(arguments);}

          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
            'content_group1': '${CONTENT_GROUP}',
            'custom_map': { 'dimension10': 'client_id' }
          });

          setTimeout(function() {
            gtag('event', 'read', { 'event_category': '15_seconds' });
          }, ${BOUNCE_RATE_TIMEOUT});
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
