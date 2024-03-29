const path = require('path')

const { withSentryConfig } = require('@sentry/nextjs')
const nextTranspileModules = require('next-transpile-modules')

const modulesToTranspile = [
  '@toptal/picasso',
  '@toptal/picasso-provider',
  '@toptal/utilities-ui-library'
]

const sentryWebpackPluginOptions = {
  ignore: ['node_modules'],
  include: '.next',
  silent: process.env.NODE_ENV !== 'production',
  configFile: 'sentry.properties',
  dryRun: !process.env.NEXT_PUBLIC_SENTRY_DSN
}

if (process.env.NODE_ENV === 'development') {
  const mock = require('mock-require')

  // `mock-require` package needs it :(
  modulesToTranspile.push('date-fns')

  const QUILL_MOCK_PATH = path.join(__dirname, '/lib/patched-quill')

  mock('quill', QUILL_MOCK_PATH)
  mock('quill-delta', QUILL_MOCK_PATH)
  mock('quill-paste-smart', QUILL_MOCK_PATH)
}

const withTM = nextTranspileModules(modulesToTranspile)

const transformClassNamesToCamelCase = config => {
  const rules = config.module.rules
    .find(rule => typeof rule.oneOf === 'object')
    .oneOf.filter(rule => Array.isArray(rule.use))

  rules.forEach(rule => {
    rule.use.forEach(moduleLoader => {
      if (
        typeof moduleLoader === 'object' &&
        moduleLoader.loader.includes('css-loader') &&
        typeof moduleLoader.options.modules === 'object'
      ) {
        moduleLoader.options = {
          ...moduleLoader.options,
          modules: {
            ...moduleLoader.options.modules,
            exportLocalsConvention: 'camelCase'
          }
        }
      }
    })
  })
}

const noindexEnabled =
  typeof process.env.NEXT_PUBLIC_SEARCH_INDEXING === 'undefined'

const buildHeaders = async () => {
  const headers = []

  if (noindexEnabled) {
    headers.push({
      source: '/:path*',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow, nosnippet, noarchive'
        }
      ]
    })
  }

  return headers
}

const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')], // this is to use `@import 'base.scss';` in scss files
    additionalData: `$basePath: "${process.env.NEXT_PUBLIC_BASE_PATH || ''}";`
  },
  sentry: {
    hideSourceMaps: true
  },
  env: {
    noindexEnabled
  },
  webpack: config => {
    transformClassNamesToCamelCase(config)

    return config
  },

  redirects: async () => {
    return [
      {
        source: '/for/:key',
        destination: '/:key',
        permanent: true
      },
      {
        source: '/%',
        destination: '/percent',
        permanent: true
      }
    ]
  },

  headers: buildHeaders
}

const moduleExports = () => {
  const plugins = [withTM] // add plugins here: [withTM, withSomethingElse]

  return plugins.reduce((config, next) => next(config), nextConfig)
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
