import { capitalize } from '@toptal/picasso/utils'

import { KeyCodeEvent } from '../types/key-code-events'

const customMetaTags: Record<string, string> = {
  'n/a': 'n/a',
  'these-keys-do-not-have-a-key-code': 'These keys do not have a key code',
  'backspace-delete': 'backspace / delete',
  'enter-return': 'Enter / Return',
  'alt-option': 'Alt / Option',
  'pause-break': 'pause/break',
  'print-screen-f13-firefox': 'Print Screen / F13 (firefox)',
  'semicolon-firefox-equals': 'semicolon (firefox)',
  'equals-firefox': 'equals (firefox)',
  ss: 'ß',
  firefox: '@ (firefox)',
  'windows-menu-right': 'Windows Menu / Right ⌘',
  ',': '',
  'numpad-period-firefox': 'numpad period (firefox)',
  'closing-paren-azerty': 'closing paren (AZERTY)',
  key: '~ + * key',
  'minus-firefox-mute-unmute': 'minus (firefox)',
  'play-pause': 'play/pause',
  'e-mail': 'e-mail',
  'mute-unmute-firefox': 'mute/unmute (firefox)',
  'decrease-volume-level-firefox': 'decrease volume level (firefox)',
  'increase-volume-level-firefox': 'increase volume level (firefox)',
  'semi-colon-n': 'semi-colon / ñ',
  'forward-slash-c': 'forward slash / ç',
  'backtick-grave-accent-n-ae-oe': 'Backtick / grave accent / ñ / æ / ö',
  'numpad-period-chrome': 'numpad period (chrome)',
  'close-bracket-a': 'close bracket / å',
  'single-quote-o-ae': 'single quote / ø / ä',
  'left-or-right-key-firefox': 'left or right ⌘ key (firefox)',
  'git-left-back-slash': '< /git >',
  'gnome-compose-key': 'GNOME Compose Key',
  'xf-86-forward': 'XF86Forward',
  'xf-86-back': 'XF86Back',
  'hiragana-katakana': 'hiragana/katakana',
  'half-width-full-width': 'half-width/full-width',
  'unlock-track-pad-chrome-edge': 'unlock track pad (Chrome/Edge)'
}

const getDescriptionText = (desc?: string): string => {
  if (desc) {
    return `Find the JavaScript Key Code, event.key, event.location, similar values, and more for ${capitalize(
      desc
    )}. Get started now.`
  }

  return 'Find the JavaScript Key Code, event.key, event.location, similar values, and more. Get started now.'
}

const getTitleText = (title?: string): string => {
  if (title) {
    return `JavaScript Key Code for ${capitalize(title)} | Toptal®`
  }

  return 'JavaScript Key Code | Toptal®'
}

interface PageParameters {
  pageTitle: string
  pageDescription: string
}

const keycodePageMetaText = (
  key?: KeyCodeEvent,
  pathKey?: string
): PageParameters => {
  if (key && pathKey) {
    // If found in customMetaTags use it
    if (customMetaTags[pathKey]) {
      // return `JavaScript Key Code for ${customMetaTags[pathKey]} | Toptal®`
      return {
        pageTitle: getTitleText(customMetaTags[pathKey]),
        pageDescription: getDescriptionText(customMetaTags[pathKey])
      }
    }

    // If it's a sentence - words separated by "-" use all words with no "-"
    if (pathKey.includes('-')) {
      // return `JavaScript Key Code for ${pathKey.split('-').join(' ')} | Toptal®`
      return {
        pageTitle: getTitleText(pathKey.split('-').join(' ')),
        pageDescription: getDescriptionText(pathKey.split('-').join(' '))
      }
    }
  }

  // If it's a number, a word or a sign use it as it is
  // return `JavaScript Key Code for ${pathKey} | Toptal®`
  return {
    pageTitle: getTitleText(pathKey),
    pageDescription: getDescriptionText(pathKey)
  }
}

const homePageMetaText: PageParameters = {
  pageTitle: 'JavaScript Key Code Event Tool | Toptal®',
  pageDescription:
    'KeyCode.Info allows users to press any key and instantly get the JavaScript Key or Key Code KeyboardEvent. Check out the Tool and Event List.'
}

const pageParameters = {
  homePageMetaText,
  keycodePageMetaText
}

export default pageParameters
