import KeyCodesReference from '~/components/KeyCodesReference'
import Layout from '~/components/Layout'

import styles from '~/styles/pages/table.module.scss'
import { siteCopy } from '~/lib/constants/site-copy'
import { TABLE_OG_DESCRIPTION, TABLE_OG_TITLE } from '~/lib/constants/common'

export default function Table(): JSX.Element {
  return (
    <Layout
      pageTitle={TABLE_OG_TITLE}
      pageDescription={TABLE_OG_DESCRIPTION}
      pageHeading={siteCopy.titles.tablePage}
      pageHeadingClassName={styles.title}
      className={styles.table}
    >
      <KeyCodesReference />
    </Layout>
  )
}
