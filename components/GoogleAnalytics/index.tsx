import Head from 'next/head'

import { CONTENT_GROUP, BOUNCE_RATE_TIMEOUT } from '~/lib/constants/common'

const GoogleAnalytics = (): JSX.Element => {
  return (
    <>
      <Head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
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
          `
        }}
      />
    </>
  )
}

export default GoogleAnalytics
