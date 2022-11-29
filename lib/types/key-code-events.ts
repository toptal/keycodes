export type KeyCodeEvent = {
  key: string
  keyCode: number
  which: number
  code?: string
  location?: number
  description?: string
  unicode?: string
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  repeat?: boolean
  path?: string
}
