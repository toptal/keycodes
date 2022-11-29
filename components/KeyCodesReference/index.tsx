import Alert from '@toptal/picasso/Alert'

import { KeyCodesAccordionList } from './KeyCodesAccordionList'
import { KeyCodesTable } from './KeyCodesTable'

import { siteCopy } from '~/lib/constants/site-copy'

const KeyCodesReference = (): JSX.Element => (
  <>
    <Alert>{siteCopy.content.tableDisclaimer}</Alert>
    <KeyCodesTable />
    <KeyCodesAccordionList />
  </>
)

export default KeyCodesReference
