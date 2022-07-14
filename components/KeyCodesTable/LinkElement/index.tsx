import Link from 'next/link'
import TableCell from '@toptal/picasso/TableCell'
import slugify from 'slugify'
import { useRouter } from 'next/router'

import { useKeyCodeContext } from '~/lib/state/key-code-provider'

// TODO: Fix component

type TableLinkElement = {
  value?: string | number
  slugifyLink?: boolean
}

const TableLinkElement = ({
  value,
  slugifyLink = false
}: TableLinkElement): JSX.Element | null => {
  const { push } = useRouter()
  const { setFromTable } = useKeyCodeContext()

  if (!value) {
    return null
  }

  const href = `/${slugifyLink ? slugify(value as string) : value}`

  const handleNavigation = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    setFromTable(true)
    push(href)
  }

  return (
    <TableCell>
      <Link href={href} onClick={handleNavigation}>
        <a>{value}</a>
      </Link>
    </TableCell>
  )
}

export default TableLinkElement
