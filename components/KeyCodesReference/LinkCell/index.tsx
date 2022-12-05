import type { MouseEvent } from 'react'
import Link from 'next/link'

import styles from './link-cell.module.scss'
import { TestIdLinkCell } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'
import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { useKeyCodeState } from '~/lib/state/use-key-code'

type LinkCellProps = {
  content: string
  path: string
  keyCodeEvent: KeyCodeEvent
}

const checkIfWhiteSpace = (content: string): string => {
  return content === siteCopy.content.whiteSpace
    ? siteCopy.content.whiteSpace
    : content
}

const LinkCell = ({
  content,
  path,
  keyCodeEvent
}: LinkCellProps): JSX.Element => {
  const { addKey } = useKeyCodeState()

  const handleNavigation = (event: MouseEvent) => {
    event.preventDefault()

    addKey(keyCodeEvent, true)
  }

  return (
    <Link
      data-testid={TestIdLinkCell.LinkCell}
      className={styles.link}
      legacyBehavior={false}
      onClick={handleNavigation}
      href={path}
    >
      {checkIfWhiteSpace(content)}
    </Link>
  )
}

export default LinkCell
