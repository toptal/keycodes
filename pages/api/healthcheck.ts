import { StatusCodes } from 'http-status-codes'
import type { NextApiRequest, NextApiResponse } from 'next'

import healthcheck from '~/lib/healthcheck'
import redirectChecker from '~/lib/healthcheck/checkers/redirect'
import { CheckerType } from '~/lib/types/healthcheck'
import log from '~/lib/log'

const services: Array<CheckerType> = [
  { name: 'service1', critical: true, check: async () => null },
  {
    name: 'redirect1',
    critical: false,
    check: async () => {
      return await redirectChecker(
        'https://gitignore.io',
        'https://www.toptal.com/developers/gitignore'
      )
    }
  }
]

const healthcheckAPI = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await healthcheck(services)

  // TODO: Remove it for real usage
  log.info('Healthcheck Access')

  res.status(StatusCodes.OK).json(result)
}

export default healthcheckAPI
