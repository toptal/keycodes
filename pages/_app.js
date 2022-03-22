import Head from 'next/head';
import { KeyCodeProvider } from '../components/KeyCodeProvider';
import Page from '../components/Page';
import '../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <KeyCodeProvider>
      <Head>
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
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </KeyCodeProvider>
  );
}
