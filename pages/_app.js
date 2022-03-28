import Head from 'next/head';
import { KeyCodeProvider } from '../components/KeyCodeProvider';
import Page from '../components/Page';
import '../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <KeyCodeProvider>
      <Head>
        <link rel="icon" href="https://fav.farm/⌨️" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JavaScript Event KeyCodes" />
        <meta
          name="twitter:description"
          content="Keycode testing tool - which keys map to which keycodes?"
        />
        <meta name="twitter:creator" content="@wesbos" />
        <meta
          name="twitter:image"
          content="https://p198.p4.n0.cdn.getcloudapp.com/items/5zuL1xLY/0e0a6eb0-d30c-4e83-9562-1c09448fe3c0.png"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-50371747-1"
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-50371747-1');
          `,
          }}
        />
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </KeyCodeProvider>
  );
}
