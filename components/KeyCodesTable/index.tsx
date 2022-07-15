import Table from '@toptal/picasso/Table'
import TableCell from '@toptal/picasso/TableCell'
import TableRow from '@toptal/picasso/TableRow'
import TableHead from '@toptal/picasso/TableHead'
import TableBody from '@toptal/picasso/TableBody'

import { keyCodeEvents } from '~/lib/keycodes'

import TableLinkElement from './LinkElement'

// TODO: Fix component

const KeyCodesTable = (): JSX.Element => {
  const keyArray = Object.keys(keyCodeEvents).map((key: string) => ({
    id: key,
    ...keyCodeEvents[key],
  }))

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Key Code</TableCell>
          <TableCell>Key</TableCell>
          <TableCell>Code</TableCell>
          <TableCell>Unicode</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keyArray.map(({ key, id, keyCode, unicode, description, code }) => (
          <TableRow key={id}>
            <TableLinkElement value={keyCode} />
            {key && (
              <>
                {['.', '/', '\\'].includes(key) ? (
                  <TableCell>{key}</TableCell>
                ) : (
                  <TableLinkElement value={key} />
                )}
              </>
            )}
            <TableLinkElement value={code} />
            <TableCell>{unicode}</TableCell>
            {description ? (
              <TableLinkElement value={description} slugifyLink />
            ) : (
              <TableCell>{description}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default KeyCodesTable
