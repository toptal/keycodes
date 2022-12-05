# Logging

As [recommended by nextjs official docs](https://nextjs.org/docs/going-to-production#logging), we use [Pino](https://www.npmjs.com/package/pino) for structured logging.

> Refer to the [package website](https://getpino.io/) for more information.

Make sure to add logging statements on key operations, as well as surround error-prone operations with `try/catch` with proper `log.error` entries.

By default, the logger outputs in JSON format. For development purposes, it's possible to set an env var `NEXT_PUBLIC_PRETTY_LOGS=enabled` and get prettified log output.

> Next.js logs internal errors cannot be customized for now. [Opentelemetry support is a work in progress](https://github.com/vercel/next.js/issues/4808#issuecomment-921104147) and will help with it once available.
