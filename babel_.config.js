// Once istanbul plugin support is available for the swc, we need to remove this file and update build script.
// Reference: https://github.com/vercel/next.js/discussions/30174

const plugins = []

if (process.env.E2E_COVERAGE) {
  plugins.push('babel-plugin-istanbul')
}

module.exports = {
  presets: ['next/babel'],
  plugins
}
