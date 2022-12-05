import PageProvider from '~/test/lib/page-provider'
import Home from 'pages/index'

const HappoHome = (): JSX.Element => {
  return (
    <PageProvider>
      <Home />
    </PageProvider>
  )
}

export default HappoHome
