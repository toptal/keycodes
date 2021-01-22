import { KeyCodeProvider } from "../components/KeyCodeProvider";
import Page from "../components/Page";
import { useKeyWatcher } from "../lib/useKeyCode";
import '../style.css';
function MyApp({ Component, pageProps }) {
  return <KeyCodeProvider><Page>
    <Component {...pageProps} />
  </Page>
  </KeyCodeProvider>
}

export default MyApp
