import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

import Layout from '~/components/Layout'
import KeyCodeCardList from '~/components/KeyCodeCardList'
import TopArea from '~/components/TopArea'

import { useKeyCodeState } from '~/lib/state/use-key-code'
import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { siteCopy } from '~/lib/constants/site-copy'
import { keyCodeEventValues } from '~/lib/keycodes'
import pageParameters from '~/lib/constants/pages'
import { useKeyHistory } from '~/lib/hooks/use-key-history.hook'

export type KeyCodePageProps = {
  staticKey?: KeyCodeEvent
  pathKey?: string
}

interface ContextParameters extends ParsedUrlQuery {
  key: string
}

export default function KeyCodePage({
  staticKey,
  pathKey
}: KeyCodePageProps): JSX.Element {
  const { key: generatedKey } = useKeyCodeState()

  const key = generatedKey && generatedKey.key ? generatedKey : staticKey

  useKeyHistory(key)

  return (
    <Layout
      {...pageParameters.keycodePageMetaText(key, pathKey)}
      pageHeading={`${siteCopy.titles.main} ${key?.keyCode}`}
    >
      <TopArea keyCode={key?.keyCode} />
      {key && <KeyCodeCardList keyCode={key} />}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = keyCodeEventValues.map((keycodeEvent: KeyCodeEvent) => ({
    params: {
      key: keycodeEvent.path?.toString().replace('/', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { key: pathKey } = context.params as ContextParameters

  const data = keyCodeEventValues.find(
    keycodeEvent => keycodeEvent.path === `/${pathKey.toLowerCase()}`
  )

  if (data) {
    return {
      props: {
        staticKey: data,
        pathKey
      }
    }
  }

  return {
    notFound: true
  }
}
