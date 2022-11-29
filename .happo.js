const path = require('path')
const fs = require('fs')

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const dotenv = require('dotenv')
const { RemoteBrowserTarget } = require('happo.io')
const { findPagesDir } = require('next/dist/lib/find-pages-dir')
const nextWebpackConfig = require('next/dist/build/webpack-config').default
const loadNextConfig = require('next/dist/server/config').default
const { trace } = require('next/dist/trace')
const webpack = require('next/dist/compiled/webpack/webpack')
const escape = require('css.escape')

dotenv.config({ path: '.env.local' })

const happoTmpDir = './happo-tmp'

webpack.init(true)

const staticFilesPath = path.resolve(__dirname, '.next/static/css')

if (!fs.existsSync(staticFilesPath)) {
  // eslint-disable-next-line no-console
  console.error(
    `${staticFilesPath} does not exists. You may need to run 'yarn build' prior to running Happo.`
  )

  process.exit()
}

const DESKTOP_VIEWPORT = '1440x600'
const MOBILE_VIEWPORT = '320x568'
const TABLET_VIEWPORT = '768x1024'

module.exports = {
  targets: {
    chrome: new RemoteBrowserTarget('chrome', {
      viewport: DESKTOP_VIEWPORT,
      maxHeight: 30000
    }),
    safari: new RemoteBrowserTarget('safari', {
      viewport: DESKTOP_VIEWPORT,
      maxHeight: 30000
    }),
    ipad: new RemoteBrowserTarget('ipad-safari', {
      viewport: TABLET_VIEWPORT,
      maxHeight: 30000
    }),
    firefox: new RemoteBrowserTarget('firefox', {
      viewport: DESKTOP_VIEWPORT,
      maxHeight: 30000
    }),
    ios: new RemoteBrowserTarget('ios-safari', {
      viewport: MOBILE_VIEWPORT,
      maxHeight: 30000
    })
  },
  compareThreshold: 0.005,
  project: process.env.HAPPO_PROJECT_NAME || 'keycodes',
  stylesheets: fs
    .readdirSync(staticFilesPath)
    .map(file => path.resolve(staticFilesPath, file)),
  publicFolders: [path.resolve(__dirname, 'public')],

  setupScript: path.resolve(__dirname, 'config/happo-setup.js'),

  customizeWebpackConfig: async config => {
    const nextConfig = await loadNextConfig('production', __dirname, null)

    const base = await nextWebpackConfig(__dirname, {
      config: nextConfig,
      entrypoints: {},
      pagesDir: findPagesDir(process.cwd()).pages,
      rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
      runWebpackSpan: trace('next-build')
    })

    config.resolve = base.resolve
    config.resolve.mainFields = ['main']
    config.resolveLoader = base.resolveLoader

    Object.keys(config.resolve.alias).forEach(key => {
      if (!config.resolve.alias[key]) {
        delete config.resolve.alias[key]
      }
    })
    config.module = base.module
    config.plugins = [
      ...base.plugins.map(plugin => {
        if (plugin instanceof webpack.webpack.DefinePlugin) {
          plugin.definitions['process.env.NODE_ENV'] = '"development"'
        }

        return plugin
      }),
      new NodePolyfillPlugin()
    ]

    return config
  },

  webpack: webpack.webpack,

  // Happo is unable to resolve some imports if the tmpdir isn't located inside
  // the project structure. The default is an OS provided folder, `os.tmpdir()`.
  // You can add this folder to `.gitignore` as well.
  tmpdir: path.join(__dirname, happoTmpDir),
  include: 'test/**/@(*-happo|happo).@(js|jsx|ts|tsx)',
  jsdomOptions: {
    beforeParse(window) {
      window.CSS = { escape }
    }
  }
}
