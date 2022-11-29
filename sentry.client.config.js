// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

import { beforeSend } from './config/sentry-filter'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0,
  beforeSend: beforeSend,
  denyUrls: [
    // reCAPTCHA flakiness
    /gstatic\.com\/recaptcha\/releases/i,

    // Bing UET tracking flakiness
    /bat\.bing\.com\/bat\.js/i,

    // Local user files
    /file:\/\//i,

    // Trustpilot scripts
    /widget\.trustpilot\.com/i,

    // Hubspot scripts
    /js\.hs-banner\.com/i,
    /js\.hs-analytics\.net/i,
    /js\.hs-scripts\.com/i,
    /js\.hsadspixel\.net/i,

    // Sentry scripts
    /browser\.sentry-cdn\.com/i,

    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,

    // Safari extensions
    /safari-extension:\/\//i,

    // Facebook scripts
    /graph\.facebook\.com/i,
    /connect\.facebook\.net\/en_US\/all\.js/i,

    // Microsoft Clarity
    /clarity\.ms/i,

    // Twitter ads
    /ads-twitter\.com/i,

    // Google scripts
    /googletagmanager\.com/i,
    /google-analytics\.com/i,

    // LinkedIn scripts
    /snap\.licdn\.com/i,

    // Quora scripts
    /a\.quora\.com/i
  ]
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
