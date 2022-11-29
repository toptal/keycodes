import Container from '@toptal/picasso/Container'
import cx from 'classnames'

import MessageBox from '~/components/MessageBox'
import Layout from '~/components/Layout'
import KeyCodeCardList from '~/components/KeyCodeCardList'
import TopArea from '~/components/TopArea'

import { useKeyCodeState } from '~/lib/state/use-key-code'
import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { siteCopy } from '~/lib/constants/site-copy'
import pageParameters from '~/lib/constants/pages'
import styles from '~/styles/home.module.scss'
import { useKeyHistory } from '~/lib/hooks/use-key-history.hook'

export type KeyCodePageProps = {
  staticKey?: KeyCodeEvent
  pathKey?: string
}

const createPageHeading = (key?: KeyCodeEvent) =>
  `${siteCopy.titles.main}${key ? ` ${key?.keyCode}` : ''}`

const createPageContent = (key?: KeyCodeEvent) => {
  if (key) {
    return (
      <>
        <TopArea keyCode={key.keyCode} />
        <KeyCodeCardList keyCode={key} />
      </>
    )
  }

  return (
    <Container className={styles.messageContainer}>
      <MessageBox message={siteCopy.titles.homePageMessage} />
    </Container>
  )
}

export default function HomePage(): JSX.Element {
  const { key } = useKeyCodeState()

  useKeyHistory(key)

  return (
    <Layout
      className={cx({
        [styles.layout]: !key
      })}
      {...pageParameters.homePageMetaText}
      pageHeading={createPageHeading(key)}
    >
      {createPageContent(key)}
    </Layout>
  )
}
