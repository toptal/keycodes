import os from 'os'

import pino from 'pino'

const options: pino.LoggerOptions = {
  base: {
    pid: process.pid,
    host: os.hostname(),
    application: process.env.APPLICATION_NAME,
    env: process.env.NODE_ENV
  }
}

if (process.env.NODE_ENV === 'development') {
  options.level = 'debug'
  options.transport = {
    target: 'pino-pretty'
  }
}

export default pino(options)
