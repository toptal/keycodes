/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventParams, ViewPageParams } from '~/lib/types/analytics'

// eslint-disable-next-line @typescript-eslint/ban-types
type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never

// eslint-disable-next-line @typescript-eslint/ban-types
type ObjectEntries<T> = T extends object
  ? [keyof T, T[keyof T]][]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? [string, any][]
  : never

interface ObjectConstructor {
  keys<T>(object: T): ObjectKeys<T>
  entries<T>(object: T): ObjectEntries<T>
}

declare global {
  declare interface Window {
    gtag: (
      event: 'js' | 'config' | 'event',
      action: string,
      params: EventParams | ViewPageParams
    ) => void
  }

  declare interface Navigator {
    msMaxTouchPoints: number
  }
}
