export type KeyCodeEvent = {
  key: string
  keyCode: number
  which: number | string
  code?: string
  location?: number
  description?: string
  unicode?: string
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type KeyCodeEventWatcher = KeyCodeEvent & {
  preventDefault: () => void
  repeat: boolean
}
