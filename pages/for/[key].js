import slugify from '@sindresorhus/slugify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useKeyCode } from '../../components/KeyCodeProvider';
import MetaKeys from '../../components/MetaKeys';
import { getOppositeCase } from '../../lib/caseUtils';
import { findSimilarKeys } from '../../lib/findSimilarKeys';
import { keyLocations } from '../../lib/keycodes';
import { keyCodesWithEvents } from '../../lib/keyCodesWithEvents';
import { copyTextToClipboard } from '../../lib/copyTextToClipboard';

// function focusInput(e) {
//   console.log('focusInput');
//   if (!document) return;
//   const input = document.querySelector('input.mobile-focus');
//   setTimeout(() => {
//     input.setAttribute('autofocus', 'autofocus');
//     input.focus();
//     e.target.click();
//     // input.dispatchEvent(new Event('keydown'));
//   }, 500);
//   // input.focus();
// }

function focusAndOpenKeyboard(e) {
  // remove existing inputs
  const inputs = document.querySelectorAll('input.mobile-focus');
  inputs.forEach((x) => x.remove());

  // create the new one
  const input = document.createElement('input');
  input.classList.add('mobile-focus');
  document.body.prepend(input);
  input.focus();
}

export default function HomePage({ staticKey }) {
  const { query } = useRouter();
  const { key: generatedKey, keyHistory, setKey } = useKeyCode();
  // Here we decide if we should show the code info from the users keyboard, or from our database of keys
  // The user's key is favourable, but if they are visiting the page directly, then we use the static key
  const key = generatedKey.key ? generatedKey : staticKey;
  if (!key) return <p>No key found!</p>;
  const hasKeyToShow = key.key === undefined;
  const similarKeys = findSimilarKeys(key);
  const renderMetaKey = (metaKey) => {
    if (metaKey?.metaKey)
      return (
        <button
          key={metaKey.keyCode}
          type="button"
          className="key pressed history"
          alt="Meta Key"
          onClick={() => setKey(metaKey)}
        >
          ⌘
        </button>
      );
    if (metaKey?.shiftKey)
      return (
        <button
          key={metaKey.keyCode}
          type="button"
          className="key pressed history"
          alt="Shift Key"
          onClick={() => setKey(metaKey)}
        >
          ⇧
        </button>
      );
    if (metaKey?.altKey)
      return (
        <button
          key={metaKey.keyCode}
          type="button"
          className="key pressed history"
          alt="Alt / Option"
          onClick={() => setKey(metaKey)}
        >
          ⌥
        </button>
      );
    if (metaKey?.ctrlKey)
      return (
        <button
          key={metaKey.keyCode}
          type="button"
          className="key pressed history"
          alt="Control Key"
          onClick={() => setKey(metaKey)}
        >
          ^
        </button>
      );
  };

  return (
    <>
      <Head>
        <title>JavaScript Keycode - {query.key}</title>
        <meta
          name="twitter:title"
          content={`JavaScript Event KeyCode for ${query.key}`}
        />
      </Head>
      <div
        className="wrap"
        aria-live="polite"
        aria-atomic="true"
        onTouchEnd={focusAndOpenKeyboard}
      >
        <p className="keycode-display huge">{key.keyCode}</p>
        <p className={`text-display ${!hasKeyToShow && 'hide'}`}>
          Press any key to get the JavaScript event keycode
        </p>
        <div className="cards">
          <div className="card item-key">
            <div className="card-header">
              <span>event.key</span>
            </div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <div className="main-description">
                {key.key}
                {key.key === ' ' && <small>(blank space)</small>}
              </div>
            </div>
            <footer>
              <p>
                The value of the key pressed. Accounts for modifiers keys that
                return CAPS and alternate chars.
              </p>
            </footer>
          </div>
          <div className="card item-location">
            <div className="card-header">event.location</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <div className="main-description">
                {keyLocations[key.location]}
                <small>({key.location})</small>
              </div>
            </div>
            <footer>
              <p>
                Some keys exist more than once on your keyboard. This provides
                the location of the key pressed. Try it with both shifts.{' '}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More here
                </a>
              </p>
            </footer>
          </div>
          <div className="card item-code">
            <div className="card-header">event.code</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <div className="main-description">{key.code}</div>
            </div>
            <footer>
              <p>
                The physical key on the keyboard. Doesn't care if you are
                holding a modifier like Shift.
              </p>
            </footer>
          </div>
          <div className="card item-which">
            <div className="card-header">event.which</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <div className="main-description">{key.which}</div>
            </div>
            <footer>
              <p>
                event.which and event.keyCode are{' '}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (deprecated)
                </a>{' '}
                in modern browsers. Use <code>.key</code> or <code>.code</code>{' '}
                instead.
              </p>
            </footer>
          </div>
          <div className="card item-description">
            <div className="card-header">Description</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <div className="main-description">
                {keyCodesWithEvents[key.keyCode]?.description ||
                  'No Description. Add one?'}
              </div>
            </div>
            <footer>
              <p>
                This is the description we have created. Think it can be
                improved?{' '}
                <a href="github.com/wesbos/keycodes">PR us on GitHub</a>
              </p>
            </footer>
          </div>
          <MetaKeys currentKey={key} />
          <div className="card item-event">
            <div className="card-header">Event Dump</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <pre>{JSON.stringify(key, '', ' ')}</pre>
            </div>
          </div>
          <div className="card item-similar">
            <div className="card-header">Similar Values</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <ul>
                {similarKeys.map((similarKey) => (
                  <li key={similarKey.keyCode}>
                    <a href={`/for/${similarKey.code}`}>{similarKey.code}</a>
                    <a href={`/for/${similarKey.keyCode}`}>
                      ({similarKey.keyCode})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card item-unicode">
            <div className="card-header">Unicode</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              {keyCodesWithEvents[key.keyCode]?.unicode || ' '}
            </div>
          </div>
          <div className="card item-unicode">
            <div className="card-header">History</div>
            <div
              className="card-main"
              tabIndex="0"
              role="button"
              onKeyDown={copyTextToClipboard}
              onClick={copyTextToClipboard}
            >
              <div className="main-description meta-keys">
                {keyHistory.length > 0 &&
                  keyHistory.map((kh) => {
                    const isMeta =
                      kh?.metaKey || kh?.shiftKey || kh?.altKey || kh?.ctrlKey;
                    if (isMeta) return renderMetaKey(kh, setKey);
                    return (
                      <button
                        type="button"
                        key={kh.keyCode}
                        alt={`${kh.key} Key`}
                        className="key pressed history"
                        onClick={() => setKey(kh)}
                      >
                        {keyCodesWithEvents[kh.keyCode]?.unicode || kh.key}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-input" />
      </div>
    </>
  );
}

// This function is used to generate static pages for ever single key
export function getStaticPaths() {
  const keyEvents = Object.values(keyCodesWithEvents);
  // Get the keys as is
  const keys = keyEvents
    .map((key) => key.key)
    // filter only for ones that have keys
    .filter((key) => key)
    // .map(slugify)
    // remove the space key - not URL friendly
    .filter((key) => key !== ' ')
    .filter((key) => key !== '')
    // remove the . key - not URL friendly
    .filter((key) => key !== '.')
    // remove the . key - not URL friendly
    .filter((key) => key !== '\\')
    .filter((key) => key !== '/')
    .filter((key) => key !== '^Ù')
    .map((key) => key.toString())
    .slice(1, 2);
  const oppositeCaseKeys = keys.map((key) => getOppositeCase(key));
  const codes = keyEvents.map((key) => key.code).filter(Boolean);
  const keyCodes = keyEvents
    .map((key) => key.keyCode.toString())
    .filter(Boolean);
  const keyDescriptions = keyEvents
    .map((key) => key.description)
    .filter((key) => key)
    .map(slugify)
    .filter((key) => key);
  const deDuped = Array.from(
    new Set([keys, oppositeCaseKeys, codes, keyCodes, keyDescriptions].flat())
  ).map((key) => slugify(key));

  const paths = deDuped.map((key) => ({
    params: {
      // account for numbers, must be a string
      key: key.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { key } = params;
  function getKeyData() {
    // 1. Search for a key the `key` property
    const keys = Object.values(keyCodesWithEvents);
    const keyWithKey = keys.find((x) => x.key === key);
    if (keyWithKey) {
      return keyWithKey;
    }
    // 2. Search for a key the `key` lowercase / uppercase opposite version
    const regex = new RegExp(`^${key}$`, 'i');
    const keyWithLowercase = keys.find((x) => x.key?.match(regex));
    if (keyWithLowercase) {
      return keyWithLowercase;
    }
    // 3. If it's a .code (Num4), find it
    const keyWithCode = keys.find((x) => x.code === key);
    if (keyWithCode) {
      return keyWithCode;
    }

    // 4. If it's a number search for a key with the keycode
    const numberCode = parseInt(key);
    if (numberCode) {
      const keyWithNumber = keys.find((x) => x.keyCode === numberCode);
      if (keyWithNumber) {
        return keyWithNumber;
      }
    }
    // 5. Search for a key with this description slug
    const keyWithSlug = keys
      .filter((x) => x.description)
      .find((x) => slugify(x.description) === key);
    if (keyWithSlug) {
      return keyWithSlug;
    }

    return {};
  }

  const props = {
    props: {
      staticKey: getKeyData(key),
    },
  };

  return props;
}
