export enum HealthStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  DEGRADED = 'DEGRADED'
}

export type SingleServiceStatus = HealthStatus.UP | HealthStatus.DOWN

export type ServiceStatus = HealthStatus

export type CheckerFunctionType = () => Promise<unknown>

export interface CheckerType {
  name: string
  critical: boolean
  check: CheckerFunctionType
}

export interface ServiceCheckResult {
  name: string
  status: SingleServiceStatus
  data: unknown
}

export interface HealthcheckResult {
  // eslint-disable-next-line camelcase
  service_status: ServiceStatus
  checks: Array<ServiceCheckResult>
}
