import Typography from '@toptal/picasso/Typography'
import Accordion from '@toptal/picasso/Accordion'
import AccordionSummary from '@toptal/picasso/AccordionSummary'
import { capitalize } from '@toptal/picasso/utils'
import { ReactElement } from 'react'
import ButtonAction from '@toptal/picasso/ButtonAction'
import ArrowDownMinor16 from '@toptal/picasso/Icon/ArrowDownMinor16'

import styles from './key-codes-accordion-list.module.scss'
import { TestIdKeyCodesReference } from './test-ids'
import { columns, getContent } from './helpers'

import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { keyCodeEventValues } from '~/lib/keycodes'
import { sortKeyCodes } from '~/lib/utils/sort'
import { metaKeyCodeEvents } from '~/lib/keycodes/meta'
import { deadKeyCodeEventValues } from '~/lib/keycodes/dead'

export const getAccordionSummary = (keyCodeEvent: KeyCodeEvent): string => {
  const preferredTitleRetrievalOrder: Array<keyof KeyCodeEvent> = [
    'key',
    'code',
    'description'
  ]

  const key = preferredTitleRetrievalOrder.find(key =>
    Boolean(keyCodeEvent[key])
  )

  let keyCodeValue = String(keyCodeEvent[key || 'keyCode'])

  if (key === 'key') {
    const deadOrMetaKeyCode = [
      ...deadKeyCodeEventValues,
      ...metaKeyCodeEvents
    ].find(keycode => keycode.key === keyCodeValue)

    if (deadOrMetaKeyCode || keyCodeValue === 'Unidentified') {
      keyCodeValue = String(keyCodeEvent.code)
    }
  }

  return capitalize(keyCodeValue)
}

export const getAccordionContent = (
  keyCodeEvent: KeyCodeEvent
): JSX.Element => {
  const content = Object.entries(columns)
    .filter(([column]) => keyCodeEvent[column as keyof KeyCodeEvent])
    .map(([column, columnTitle]) => {
      return (
        <Typography
          key={column}
          weight="regular"
          size="medium"
          color="dark-grey"
          data-testid={TestIdKeyCodesReference.AccordionContentDataRow}
        >
          {columnTitle}:{' '}
          {getContent(column as keyof KeyCodeEvent, keyCodeEvent)}
        </Typography>
      )
    })

  return <div className={styles.accordionContent}>{content}</div>
}

const expandIcon: ReactElement = (
  <div className={styles.expandIconAlignTop}>
    <ButtonAction
      aria-label="expand"
      icon={<ArrowDownMinor16 className={styles.expandIcon} />}
    />
  </div>
)

export const KeyCodesAccordionList = (): JSX.Element => {
  return (
    <div role="list" className={styles.accordionList}>
      {sortKeyCodes(keyCodeEventValues).map(keyCodeEvent => {
        const { keyCode, key, code } = keyCodeEvent

        return (
          <Accordion
            role="listitem"
            key={`${keyCode}-${key}-${code}`}
            content={getAccordionContent(keyCodeEvent)}
            expandIcon={expandIcon}
          >
            <AccordionSummary className={styles.accordionSummary}>
              <Typography variant="heading" size="small" as="h2">
                {getAccordionSummary(keyCodeEvent)}
              </Typography>
            </AccordionSummary>
          </Accordion>
        )
      })}
    </div>
  )
}
