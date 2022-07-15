import Layout from '~/components/Layout'
import KeyCodesTable from '~/components/KeyCodesTable'

export default function Table(): JSX.Element {
  return (
    <Layout>
      <Layout.Main>
        <KeyCodesTable />
      </Layout.Main>
    </Layout>
  )
}
