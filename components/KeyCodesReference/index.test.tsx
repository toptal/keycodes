import { render, screen } from '@testing-library/react'
import { capitalize } from '@toptal/picasso/utils'

import { TestIdLinkCell } from './LinkCell/test-ids'
import { TestIdKeyCodesReference } from './test-ids'
import { ColumnKey, columns, getContent, pickFieldWithContent } from './helpers'
import { KeyCodesTable, TableBodyRows } from './KeyCodesTable'
import {
  getAccordionSummary,
  getAccordionContent,
  KeyCodesAccordionList
} from './KeyCodesAccordionList'

import KeyCodesReference from '.'

import PicassoProvider from '~/test/lib/picasso-provider'
import { keyCodesWithEvents as keyCodeEvents } from '~/lib/keycodes/with-events'
import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { keyCodeEventValues } from '~/lib/keycodes'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({}))
}))

describe('KeyCodeReference', () => {
  describe('getContent', () => {
    it('returns text component for non linkable content', () => {
      render(getContent('unicode', keyCodeEvents[13]))

      expect(
        screen.queryByTestId(TestIdLinkCell.LinkCell)
      ).not.toBeInTheDocument()
      expect(screen.getByText('↵')).toBeInTheDocument()
    })

    it('creates link cell for a correct column', () => {
      render(getContent('description', keyCodeEvents[151]))

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const description = keyCodeEvents[151].description!
      const link = screen.getByText(description)

      expect(link).toBeInTheDocument()
      expect(link.tagName).toEqual('A')
      expect(link.getAttribute('href')).toEqual(keyCodeEvents[151].path)
    })
  })

  describe('TableBodyRows', () => {
    it('correctly renders table rows', () => {
      render(
        <PicassoProvider>
          <table>
            <tbody>
              <TableBodyRows />
            </tbody>
          </table>
        </PicassoProvider>
      )

      const eventsCount = keyCodeEventValues.length
      const columnsCount = Object.keys(columns).length

      expect(screen.getAllByRole('row')).toHaveLength(eventsCount)
      expect(screen.getAllByRole('cell')).toHaveLength(
        eventsCount * columnsCount
      )
    })
  })

  describe('KeyCodesTable', () => {
    it('correctly renders the table', () => {
      render(
        <PicassoProvider>
          <KeyCodesTable />
        </PicassoProvider>
      )

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('rowgroup')).toHaveLength(2)

      Object.values(columns).forEach(columnText =>
        expect(screen.getByText(columnText)).toBeInTheDocument()
      )
    })
  })

  describe('getAccordionSummary', () => {
    it.each([
      [keyCodeEvents[0], keyCodeEvents[0].code],
      [keyCodeEvents[174], keyCodeEvents[174].key],
      [keyCodeEvents[42], keyCodeEvents[42].description]
    ])('retrieves the correct accordion title', (event, title) => {
      expect(getAccordionSummary(event)).toEqual(capitalize(title as string))
    })
  })

  describe('getAccordionContent', () => {
    it.each([
      [keyCodeEvents[56], 5],
      [keyCodeEvents[171], 4],
      [keyCodeEvents[172], 3]
    ])('renders correct content', (event, dataRowsLength) => {
      render(<PicassoProvider>{getAccordionContent(event)}</PicassoProvider>)

      const usedColumns = Object.keys(columns).filter(column =>
        Boolean(event[column as keyof KeyCodeEvent])
      ) as ColumnKey[]

      expect(
        screen.getAllByTestId(TestIdKeyCodesReference.AccordionContentDataRow)
      ).toHaveLength(dataRowsLength)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const linkColumn = pickFieldWithContent(
        ['key', 'code', 'description'],
        event
      )!
      const textColumns = usedColumns.filter(value => value !== linkColumn)

      textColumns.forEach(column => {
        const value = event[column] as string
        const text = `${columns[column]}: ${value}`

        expect(screen.getByText(text)).toBeInTheDocument()
      })

      const value = event[linkColumn] as string

      expect(screen.getByText(value)).toBeInTheDocument()
    })
  })

  describe('KeyCodesAccordionList', () => {
    it('renders correctly', () => {
      render(
        <PicassoProvider>
          <KeyCodesAccordionList />
        </PicassoProvider>
      )

      expect(screen.getAllByRole('list')).toHaveLength(1)
      expect(screen.getAllByRole('listitem')).toHaveLength(
        keyCodeEventValues.length
      )
    })
  })

  describe('KeyCodesReference', () => {
    it('renders correctly', () => {
      render(
        <PicassoProvider>
          <KeyCodesReference />
        </PicassoProvider>
      )

      expect(screen.getAllByRole('table')).toHaveLength(1)
      expect(screen.getAllByRole('list')).toHaveLength(1)
    })
  })
})
