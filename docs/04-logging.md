# Logging

As [recommended by nextjs official docs](https://nextjs.org/docs/going-to-production#logging), we use [Pino](https://www.npmjs.com/package/pino) for structured logging. A default utility is available at [lib/logs.ts](lib/log.ts) and should be used as such:

```js
import log from '~/lib/log'

log.info('hello world')
try {
  throw new Error('Error encountered')
} catch (e) {
  log.error(e)
}
```

> Refer to the [package website](https://getpino.io/) for more information.

Make sure to add logging statements on key operations, as well as surround error-prone operations with `try/catch` with proper `log.error` entries.

We cannot modify how next.js logs internal errors for now. [Opentelemetry support is a work in progress](https://github.com/vercel/next.js/issues/4808#issuecomment-921104147) and will help with it once available.
