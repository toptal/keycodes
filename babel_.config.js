const shouldInstrumentCode = 'E2E_COVERAGE' in process.env

module.exports = {
  presets: ['next/babel'],
  plugins: shouldInstrumentCode ? ['istanbul'] : []
}
