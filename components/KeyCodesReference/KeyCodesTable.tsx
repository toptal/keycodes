import Table from '@toptal/picasso/Table'
import TableHead from '@toptal/picasso/TableHead'
import TableBody from '@toptal/picasso/TableBody'
import TableRow from '@toptal/picasso/TableRow'
import TableCell from '@toptal/picasso/TableCell'
import Typography from '@toptal/picasso/Typography'

import styles from './key-codes-table.module.scss'
import { columns, getContent } from './helpers'

import type { KeyCodeEvent } from '~/lib/types/key-code-events'
import { keyCodeEventValues } from '~/lib/keycodes'
import { sortKeyCodes } from '~/lib/utils/sort'

export const TableBodyRows = (): JSX.Element => {
  const rows = sortKeyCodes(keyCodeEventValues).map(keyCodeEvent => {
    const { keyCode, key, code } = keyCodeEvent

    return (
      <TableRow key={`${keyCode}-${key}-${code}`}>
        {Object.keys(columns).map(column => (
          <td key={column} className={styles.tableContentCell}>
            {getContent(column as keyof KeyCodeEvent, keyCodeEvent)}
          </td>
        ))}
      </TableRow>
    )
  })

  return <>{rows}</>
}

export const KeyCodesTable = (): JSX.Element => (
  <Table className={styles.table}>
    <TableHead>
      <TableRow>
        {Object.values(columns).map(column => (
          <TableCell key={column}>
            <Typography weight="semibold" size="medium" color="inherit">
              {column}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      <TableBodyRows />
    </TableBody>
  </Table>
)
