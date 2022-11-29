const exceptionsByType = [
  {
    type: 'TypeError',
    items: [
      {
        // Facebook crawlers bug
        // https://github.com/aFarkas/lazysizes/issues/520
        value: 'Illegal invocation',
        function: 'triggerEvent',
        module: 'lazysizes/lazysizes'
      },
      {
        // Some 3rd party Ad manager
        value: "Cannot read property '0' of undefined",
        function: 'setAdPageRatioLogicConfig'
      },
      {
        // Some 3rd party Video crawler manager
        value: 't.indexOf is not a function',
        function: 'check_swipe_element'
      },
      {
        // Injected code tries to get video element attributes
        value: `undefined is not an object (evaluating 'document.getElementsByTagName("video")[0].attributes')`,
        function: 'global code',
        module: '<unknown module>'
      }
    ]
  },
  {
    type: 'SyntaxError',
    items: [
      {
        // Parse-related on old Chrome Mobile WebView 43.0.2357,
        // Android 5.1.1, Samsung SM-N7505
        value: 'Unexpected end of input',
        function: 'Object.parse',
        filename: 'native'
      }
    ]
  },
  {
    type: 'SecurityError',
    items: [
      {
        // Injected code tries to access a cross-origin frame and Trustpilot widget
        value:
          'Blocked a frame with origin "https://www.toptal.com" from accessing a cross-origin frame.',
        module: 'bootstrap/v5/tp.widget.bootstrap'
      },
      {
        value:
          'Blocked a frame with origin "https://www.toptal.com" from accessing a cross-origin frame.',
        function: 'global code'
      }
    ]
  },
  {
    type: 'RangeError',
    items: [
      {
        // Safari 13 smoothscroll bug
        value: 'Maximum call stack size exceeded.',
        module: 'smoothscroll-polyfill/dist/smoothscroll'
      }
    ]
  }
]

const exceptionsWithMechanism = [
  {
    type: 'CompileError',
    items: [
      {
        value:
          'WebAssembly.instantiate(): expected magic word 00 61 73 6d, found 7b 22 61 6c @+0',
        type: 'onunhandledrejection'
      }
    ]
  },
  {
    type: 'UnhandledRejection',
    items: [
      {
        value:
          'Non-Error promise rejection captured with value: Could not find Taboola in window',
        type: 'onunhandledrejection'
      },
      {
        value:
          'Non-Error promise rejection captured with value: Could not find Nativo script in window',
        type: 'onunhandledrejection'
      },
      {
        value:
          'Non-Error promise rejection captured with value: Could not find googletag in window',
        type: 'onunhandledrejection'
      }
    ]
  }
]

const handleUnhandledRejection = (event, value, stacktrace) => {
  // Google reCAPTCHA timeout exceptions
  const recaptchaPattern =
    /^Non-Error promise rejection captured with value: Timeout( \(\w\))?$/

  if (recaptchaPattern.test(value)) {
    return true
  }

  if (
    !stacktrace &&
    value ===
      'Non-Error promise rejection captured with keys: errors, message, name'
  ) {
    const extra = event?.extra

    if (extra) {
      const message = extra.__serialized__?.message

      // 3rd party code RxJS error, supposedly Grammarly extension
      if (
        message ===
        '1 errors occurred during unsubscription:\n1) RangeError: Maximum call stack size exceeded.'
      ) {
        return true
      }
    }
  }
}

/**
 * Temporary fixes https://toptal-core.atlassian.net/browse/TG-1052
 *
 * Issue:
 * Chrome browser after version 102 update reports user prompted errors to Sentry.
 * Chrome changelog: Errors during script evaluation in the Console now generate proper error events that trigger the window.onerror handler and are dispatched as "error" events on the window object.
 * Previous chrome versions (like v101) and browsers don’t report such issues.
 *
 * Temporary solution:
 * Filter out errors from the exact page (https://www.toptal.com/javascript/interview-questions is the most affected since it has javascript code examples, which user can test in the console) in Chrome v102 and above.
 */
const handleUserPromptedError = event => {
  const { url, headers } = event.request || {}

  if (!url || !headers) {
    return false
  }

  const urlRegExp =
    /^(javascript|react|nodejs)(\/(interview-questions|tips-and-practices))?$/
  const versionRegExp = /Chrome\/(\d+)\./

  const relativeUrl = url.split('/', 4).pop()
  const [, version] = headers['User-Agent'].match(versionRegExp) || []

  return urlRegExp.test(relativeUrl) && version >= 102
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const beforeSend = (event, hint) => {
  const exactFetchMessages = [
    'Load failed', // Safari fetch error
    'Failed to fetch', // Chrome fetch error
    'NetworkError when attempting to fetch resource.' // Firefox fetch error
  ]

  if (
    event?.message === 'FetchJSONWithCache Error' &&
    exactFetchMessages.includes(event?.extra?.error?.message)
  ) {
    return null
  }

  const error = hint.originalException

  if (error?.message) {
    const exactMessages = [
      'twttr is not defined', // Twitter GTM tag errors
      "Can't find variable: twttr", // Twitter GTM tag errors
      "Can't find variable: article",
      "Can't find variable: $",
      "Can't find variable: WeixinJSBridge", // 3rd party, Mobile Safari UI/WKWebView, iOS 13.6
      "Can't find variable: al_onPoststitialDismiss", // 3rd party, Mobile Safari UI/WKWebView, iOS 15.3.1
      "Identifier 'boundExec' has already been declared", // 3rd party, Windows 10
      "Identifier 'kImgMinWidth' has already been declared", // Chrome Mobile WebView 87, Android 11
      'tm_x is not defined', // Chrome Mobile WebView 99, Android 9;
      "Unexpected token 'var'",
      'chrome is not defined' // Firefox extension tries to use chrome object
    ]

    const partialMessages = [
      'Loading chunk',
      'Loading CSS chunk',
      'Object Not Found Matching Id:', // Microsoft Outlook SafeLink crawlers
      'instantSearchSDKJSBridgeClearHighlight', // Bing Instant Search issue with Edge on iOS
      'crazyegg',
      'customDispatchEvent is not defined', // Issue coming from crazyegg third-party script
      'Quora Pixel Error',
      'mraid', // Issues coming from Mobile ads (MRAID SDK)
      'MoatMAK', // Issues coming from Mobile ads (MRAID SDK)
      'sendBeacon', // Issues coming from Cloudflare beacon.min.js script
      'pktAnnotationHighlighter', // Issues coming from Pocket on iOS
      'SecurityError: Blocked a frame with origin', // CORS issues from users or third-party scripts/apps
      "SecurityError: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules", // CORS issue, probably caused by an extension, when accessing cssRules on a stylesheet from another domain
      'NetworkError: Load failed', // Fetch issue on user browser
      'NotAllowedError: Read permission denied', // User browser issue originated from third-party scripts
      "Failed to read the 'cookie' property from 'Document'", // User browser issue to fetch cookies
      'safari-extension',
      'safari-web-extension',
      'chrome-extension',
      'moz-extension', // Firefox
      'perfectbrowsr_nodecheck', // browser extension
      'BetterJsPop', // adblocker
      'redefine property: googletag', // GTM
      'localStorage', // mobile device settings
      'mobincube', // third-party app
      'crypto.getRandomValues', // third-party app
      'Zotero', // third-party app
      'zaloJSV2', // Zalo API
      'QK_middlewareReadModePage', // noise from ads/campaigns
      'VUE_DEVTOOLS_IFRAME', // Issue coming from Vue Devtools extension
      'UXCam', // third-party app
      'keydownt', // Coming from a chrome extension
      'onTabScrolled is not defined', // Might be coming from browser extensions or third-party apps
      'window.appHotStart', // Might be coming from browser extensions or third-party apps
      'window.bannerNight', // Might be coming from browser extensions or third-party apps
      'window.showAngularStats', // Might be coming from browser extensions or third-party apps
      'window.huawei', // Coming from Huawei mobile devices
      'window.onunload is not a function', // Third-party scripts
      'window.regainData is not a function', // Third-party scripts
      'window.getPlayer is not a function', // Third-party scripts
      'window.performance.getEntries is not a function', // Trying to access from console in unsupported browser
      'getHiAnalysticsParam', // Coming from Huawei mobile devices
      'vid_mate_check', // third-party app
      'ucapi is not defined', // Might be coming from browser extensions or third-party apps
      'fixedTimeID is not defined', // Likely coming from a browser extension
      'UCShellJava', // noise coming from UC Browser
      '__show__deepen', // noise likely coming from browsers/extensions
      "Identifier 'VIDEO_PLAYING'", // noise likely coming from browsers/extensions
      'C3 is not defined', // coming from C3 maps script
      'safari.self.tab.setContext', // Safari browser error
      'checkDomStatus', // likely coming from ads/campaigns
      'privateSpecialRepair', // likely coming from ads/campaigns
      'TypeError: WebKit', // Safari (WebKit) internal issues
      'setIOSParameters', // Mobile Safari browser issue on iOS
      'webkitExitFullScreen', // Mobile Safari browser issue on iOS
      "getElementsByTagName('video')", // Mobile Safari browser issue on iOS
      'NS_ERROR_', // Firefox internal errors
      '__firefox__', // Firefox internal errors
      'Java exception was raised', // Android internal issues
      'onAPWebViewPause', // Issue coming from Webviews on Mobile devices
      'DOMNodeInsertedByJs', // Coming from an Android browser called Crosswalk
      'notifyCurrentVideoState is not defined', // Coming from Mobile devices
      'prebidjs', // Coming from a bidding external script (Prebid.js)
      'Taboola', // Taboola third-party script
      'fb.js', // Issues coming from Facebook pixel/third-party script on GTM
      'ats.js', // ATS tracker script (probably coming from GTM)
      'Could not find Nativo', // Nativo third-party script
      'Could not find googletag', // Another possible GTM issue
      'grecaptcha is not defined', // Coming from recaptcha
      'langDetector is not defined', // Translation third-party script
      'DomNode has not been set for this SimpleScriptable', // HTMLUnit issue coming from very old browsers
      'First argument to Readability constructor should be a document object', // Readability app on Mobile devices
      "Can't find variable: al_", // Appears only on Apple devices, related to tracking
      'tgetT is not defined' // 3rd party
    ]

    const patterns = [
      /window.cb\d+ is not a function/ // 3rd party, Windows 10, Edge 98.0.1108
    ]

    const { message } = error

    if (
      exactMessages.includes(message) ||
      partialMessages.some(msg => message.includes(msg)) ||
      patterns.some(pattern => pattern.test(message))
    ) {
      return null
    }

    const parsedEvent = JSON.stringify(event)

    const match = [
      'r.beacon', // NewRelic
      'nrWrapper', // NewRelic
      'gtm.js', // GTM main script
      'uwt.js', // Twitter Universal Tag
      'fb.js', // Issues coming from Facebook pixel/third-party script on GTM
      'ads/pixel.js', // Reddit Pixel
      'hstc.tracking', // Hubspot tracking script
      'setupPops', // Chrome issue coming from adblockers
      'translate_http', // Issues coming from Google Translate API
      'common-scripts', // Third-party scripts such as CrazyEgg
      'clarity.js', // Microsoft Clarity analytics tool
      'srcIsLegacy', // Drift third-party script
      'setupPops', // Chrome issue coming from adblockers
      'safari-extension',
      'safari-web-extension',
      'chrome-extension',
      'moz-extension', // Firefox
      'beacon.min.js', // Cloudflare script
      'recaptcha/releases',
      'RILLONGPRESS', // third-party script
      'bad-network-popup', // third-party script
      'adblocker', // Ad blockers
      'ats.js', // ATS tracker script (probably coming from GTM)
      'processRandomSelector', // noise from ads/campaigns
      'card-injection.js', // coming from a netfree.link website, might be an extension or app
      'SnapTube', // External app to download videos
      'Grammarly.js', // Grammarly extension
      'beforeLoad_SafariV2.js', // Coming from Safari extensions
      'MathJax.js', // MathJax.js script
      'addons/pops/license', // Coming from random addons
      'BVProxy.min.js', // BVProxy external script
      'zteEnd', // Coming from an external script related to ZTE phones
      'crypto.getRandomValues', // third-party app
      'localStorage', // Mobile device settings (usually coming from Android)
      '/Users/', // MacOS localhost
      'C:\\Users\\' // Windows localhost
    ].some(predicate => parsedEvent.includes(predicate))

    if (match) {
      return null
    }
  }

  const values = event?.exception?.values

  if (values?.length) {
    const [{ type, value, stacktrace, mechanism }] = values

    if (type.includes('NS_ERROR_')) {
      // Firefox internal errors
      return null
    }

    if (type === 'Event') {
      if (
        value ===
          'Non-Error exception captured with keys: currentTarget, isTrusted, target, type' &&
        event.extra?.__serialized__?.target ===
          'body > main#page-root > div#cookie-banner-host'
      ) {
        return null
      }
    }

    if (type === 'UnhandledRejection') {
      if (handleUnhandledRejection(event, value, stacktrace)) {
        return null
      }
    }

    if (mechanism) {
      const errorType = exceptionsWithMechanism.find(
        event => event.type === type
      )

      if (errorType) {
        const match = errorType.items.some(
          ({ value: itemValue, type }) =>
            itemValue === value && type === mechanism?.type
        )

        if (match) {
          return null
        }
      }
    }

    if (stacktrace?.frames) {
      const errorType = exceptionsByType.find(event => event.type === type)

      if (errorType) {
        const match = stacktrace.frames.some(frame =>
          errorType.items.some(
            ({ value: itemValue, ...item }) =>
              itemValue === value &&
              Object.keys(item).every(key => item[key] === frame[key])
          )
        )

        if (match) {
          return null
        }
      }

      // Some 3rd-party syntax error
      const errors = [
        'missing ] after element list', // Android 11, FireFox Mobile 95
        'Unexpected identifier', // Android 11, Chrome Mobile 97
        "Unexpected identifier 'Arguments'. Expected either a closing ']' or a ',' following an array element." // IOS 15.3, Safari 15.3
      ]

      if (
        type === 'SyntaxError' &&
        errors.includes(value) &&
        event?.extra?.arguments.length
      ) {
        const { frames } = stacktrace
        const [{ isTrusted }] = event.extra.arguments

        const culprits = [
          'get/<(<unknown module>)',
          'Function([native code])',
          'new Function(<anonymous>)'
        ]

        const isCulpritUnknown = culprits.includes(event?.culprit)

        const isThirdParty =
          isTrusted &&
          isCulpritUnknown &&
          frames.some(frame => frame.module === '<unknown module>')

        if (isThirdParty) {
          return null
        }
      }
    }

    if (handleUserPromptedError(event)) {
      return null
    }
  }

  return event
}
