import { StatusCodes } from 'http-status-codes'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

import healthcheck from '~/lib/healthcheck'
import redirectChecker from '~/lib/healthcheck/checkers/redirect'
import { CheckerType } from '~/lib/types/healthcheck'

const services: Array<CheckerType> = [
  { name: 'service1', critical: true, check: async () => null },
  {
    name: 'redirect1',
    critical: false,
    check: async () => {
      return await redirectChecker(
        'https://keycode.info/',
        'https://www.toptal.com/developers/keycode'
      )
    }
  }
]

const healthcheckAPI = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await healthcheck(services)

  res.status(StatusCodes.OK).json(result)
}

export default withSentry(healthcheckAPI)
