import type { MetaKeys, MetaKeyValue } from '../types/meta-keys'

export const META_KEYS: Record<MetaKeys, MetaKeyValue> = {
  metaKey: {
    key: 'meta_key',
    code: '⌘'
  },
  shiftKey: {
    key: 'shift_key',
    code: '⇧'
  },
  altKey: {
    key: 'alt/option_key',
    code: '⌥'
  },
  ctrlKey: {
    key: 'control_key',
    code: '^'
  }
}
