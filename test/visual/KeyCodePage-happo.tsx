import KeyCodePage from '~/pages/[key]'

import { mockKeyCodeKeyParams } from '~/test/mock/key-code'
import PageProvider from '~/test/lib/page-provider'

const HappoKeyCodesReference = (): JSX.Element => {
  return (
    <PageProvider>
      <KeyCodePage {...mockKeyCodeKeyParams} />
    </PageProvider>
  )
}

export default HappoKeyCodesReference
