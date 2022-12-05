import PageProvider from '~/test/lib/page-provider'
import Table from 'pages/table'

const HappoTable = (): JSX.Element => {
  return (
    <PageProvider>
      <Table />
    </PageProvider>
  )
}

export default HappoTable
