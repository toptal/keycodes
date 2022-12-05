import {
  CheckerType,
  HealthcheckResult,
  ServiceStatus,
  ServiceCheckResult,
  SingleServiceStatus,
  HealthStatus
} from '~/lib/types/healthcheck'

const healthcheck = async (
  checkers: Array<CheckerType>
): Promise<HealthcheckResult> => {
  let serviceStatus: ServiceStatus = HealthStatus.UP

  const serviceDegraded = () => {
    if (serviceStatus === HealthStatus.UP) {
      serviceStatus = HealthStatus.DEGRADED
    }
  }

  const serviceDown = () => {
    serviceStatus = HealthStatus.DOWN
  }

  const checks: Array<Promise<ServiceCheckResult>> = checkers.map(
    async (checker: CheckerType) => {
      let data: unknown = {}
      let checkerStatus: SingleServiceStatus = HealthStatus.UP

      try {
        const result = await checker.check()

        data = result || {}
      } catch (e) {
        checkerStatus = HealthStatus.DOWN

        if (checker.critical) {
          serviceDown()
        } else {
          serviceDegraded()
        }
      }

      return {
        name: checker.name,
        status: checkerStatus,
        data
      }
    }
  )

  const resolvedChecks: Array<ServiceCheckResult> = await Promise.all(checks)

  return {
    // eslint-disable-next-line camelcase
    service_status: serviceStatus,
    checks: resolvedChecks
  }
}

export default healthcheck
