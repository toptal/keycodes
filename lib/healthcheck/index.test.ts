import { CheckerType } from '~/lib/types/healthcheck'

import healthcheck from '.'

const mockError = new Error('Service is down')

describe('healthcheck', () => {
  describe('when all services are up', () => {
    const services: Array<CheckerType> = [
      {
        name: 'service1',
        critical: true,
        check: async () => ({
          uptime: 3000
        })
      },
      {
        name: 'service2',
        critical: false,
        check: async () => null
      }
    ]

    it('service_status is up, status and data are returned for each service', async () => {
      expect(await healthcheck(services)).toEqual({
        service_status: 'UP',
        checks: [
          { name: 'service1', status: 'UP', data: { uptime: 3000 } },
          { name: 'service2', status: 'UP', data: {} }
        ]
      })
    })
  })

  describe('when all critical services are up but one non critical is down', () => {
    const services: Array<CheckerType> = [
      { name: 'service1', critical: true, check: async () => null },
      { name: 'service2', critical: true, check: async () => null },
      {
        name: 'service3',
        check: () => {
          throw mockError
        },
        critical: false
      }
    ]

    it('returns degraded', async () => {
      expect(await healthcheck(services)).toEqual({
        service_status: 'DEGRADED',
        checks: [
          { name: 'service1', status: 'UP', data: {} },
          { name: 'service2', status: 'UP', data: {} },
          {
            name: 'service3',
            status: 'DOWN',
            data: {}
          }
        ]
      })
    })
  })

  describe('when one critical service is down', () => {
    const services: Array<CheckerType> = [
      { name: 'service1', critical: true, check: async () => null },
      { name: 'service2', critical: true, check: async () => null },
      {
        name: 'service3',
        check: () => {
          throw mockError
        },
        critical: true
      }
    ]

    it('returns down', async () => {
      expect(await healthcheck(services)).toEqual({
        service_status: 'DOWN',
        checks: [
          { name: 'service1', status: 'UP', data: {} },
          { name: 'service2', status: 'UP', data: {} },
          {
            name: 'service3',
            status: 'DOWN',
            data: {}
          }
        ]
      })
    })
  })
})
