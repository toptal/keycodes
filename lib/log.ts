import os from 'os'

import pino from 'pino'

import { PROJECT_DISPLAY_NAME } from '~/lib/constants/common'

const options: pino.LoggerOptions = {
  base: {
    pid: process.pid,
    host: os.hostname(),
    application: PROJECT_DISPLAY_NAME,
    env: process.env.NODE_ENV
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  formatters: {
    level(label) {
      return { level: label }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  options.level = 'debug'
  options.transport = {
    target: 'pino-pretty'
  }
}

export default pino(options)
