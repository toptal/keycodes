import LinkCell from './LinkCell'

import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { siteCopy } from '~/lib/constants/site-copy'

export const columns: { [key in keyof KeyCodeEvent]?: string } = {
  keyCode: 'Key Code',
  key: 'Key',
  code: 'Code',
  unicode: 'Unicode',
  description: 'Description'
}

export type ColumnKey = keyof typeof columns

export const pickFieldWithContent = (
  columns: ColumnKey[],
  event: KeyCodeEvent
): ColumnKey | undefined =>
  columns.find(column => {
    let content = event[column]

    content = typeof content === 'string' ? content.trim() : content

    return Boolean(content)
  })

const shouldCreateLink = (column: ColumnKey, event: KeyCodeEvent): boolean => {
  const order: ColumnKey[] = ['key', 'code', 'description']

  if (!order.includes(column)) {
    return false
  }

  const chosenColumn = pickFieldWithContent(order, event)

  return column === chosenColumn
}

export const getContent = (
  column: keyof KeyCodeEvent,
  keyCodeEvent: KeyCodeEvent
): JSX.Element => {
  if (!keyCodeEvent[column]) {
    return <></>
  }

  if (shouldCreateLink(column, keyCodeEvent)) {
    return (
      <LinkCell
        keyCodeEvent={keyCodeEvent}
        content={String(keyCodeEvent[column])}
        path={keyCodeEvent.path || '/'}
      />
    )
  }

  if (column === 'key' && keyCodeEvent.key === siteCopy.content.whiteSpace) {
    return <>{siteCopy.content.blankSpace}</>
  }

  return <>{keyCodeEvent[column]}</>
}
