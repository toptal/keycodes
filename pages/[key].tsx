import slugify from 'slugify'

import { useKeyCodeContext } from '~/lib/state/key-code-context'
import { keyCodesWithEvents } from '~/lib/keycodes/with-events'
import { getOppositeCase } from '~/lib/utils/case-utils'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

import Layout from '~/components/Layout'
import KeyCodeCardList from '~/components/KeyCodeCardList'
import TopArea from '~/components/TopArea'

const slugifyy = (url: string | undefined) => {
  if (!url) {
    return url
  }

  return slugify(url)
}

// TODO: This components will be fixed

type KeyCodePageProps = {
  staticKey?: KeyCodeEvent
}

type StaticType = {
  params: {
    key: string | undefined
  }
}

type StaticProps = {
  props: KeyCodePageProps
}

type StaticPaths = {
  paths: StaticType[]
  fallback: boolean
}

export default function KeyCodePage({
  staticKey
}: KeyCodePageProps): JSX.Element {
  const { key: generatedKey } = useKeyCodeContext()
  // Here we decide if we should show the code info from the users keyboard, or from our database of keys
  // The user's key is favourable, but if they are visiting the page directly, then we use the static key
  // If the user is clicking a key from table, show that key
  const key = generatedKey && generatedKey.key ? generatedKey : staticKey

  return (
    <Layout>
      <Layout.Main>
        <TopArea keyCode={key?.keyCode} />
        {key && <KeyCodeCardList keyCode={key} />}
      </Layout.Main>
    </Layout>
  )
}

// This function is used to generate static pages for ever single key
export function getStaticPaths(): StaticPaths {
  const keyEvents = Object.values(keyCodesWithEvents)
  // Get the keys as is
  const keys: string[] = keyEvents
    .map((key: KeyCodeEvent) => key.key)
    // filter only for ones that have keys
    .filter((key: string) => key)

    // .map(slugify)
    // remove the space key - not URL friendly
    .filter((key: string) => key !== ' ')
    .filter((key: string) => key !== '')
    // remove the . key - not URL friendly
    .filter((key: string) => key !== '.')
    // remove the . key - not URL friendly
    .filter((key: string) => key !== '\\')
    .filter((key: string) => key !== '/')
    .filter((key: string) => key !== '^Ù')
    .map((key: string) => key?.toString())
    .slice(1, 2)

  const oppositeCaseKeys = keys.map((key: string) => getOppositeCase(key))
  const codes = keyEvents.map((key: KeyCodeEvent) => key.code).filter(Boolean)
  const keyCodes = keyEvents
    .map((key: KeyCodeEvent) => key.keyCode.toString())
    .filter(Boolean)
  const keyDescriptions = keyEvents
    .map((key: KeyCodeEvent) => key.description)
    .filter((key: string | undefined) => key)
    .map(slugifyy)
    .filter((key: string | undefined) => key)
  const deDuped = Array.from(
    new Set([keys, oppositeCaseKeys, codes, keyCodes, keyDescriptions].flat())
  ).map((key: string | undefined) => slugifyy(key))

  const paths = deDuped.map((key: string | undefined) => ({
    params: {
      // account for numbers, must be a string
      key: key?.toString()
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({
  params
}: StaticType): Promise<StaticProps> {
  const { key } = params

  function getKeyData() {
    if (!key) {
      return undefined
    }

    // 1. Search for a key the `key` property
    const keys = Object.values(keyCodesWithEvents)
    const keyWithKey = keys.find((keyCode: KeyCodeEvent) => keyCode.key === key)

    if (keyWithKey) {
      return keyWithKey
    }
    // 2. Search for a key the `key` lowercase / uppercase opposite version
    const regex = new RegExp(`^${key}$`, 'i')
    const keyWithLowercase = keys.find((keyCode: KeyCodeEvent) =>
      keyCode.key?.match(regex)
    )

    if (keyWithLowercase) {
      return keyWithLowercase
    }
    // 3. If it's a .code (Num4), find it
    const keyWithCode = keys.find(
      (keyCode: KeyCodeEvent) => keyCode.code === key
    )

    if (keyWithCode) {
      return keyWithCode
    }

    // 4. If it's a number search for a key with the keycode

    const numberCode = parseInt(key)

    if (numberCode) {
      const keyWithNumber = keys.find(
        (keyCodeEvent: KeyCodeEvent) => keyCodeEvent.keyCode === numberCode
      )

      if (keyWithNumber) {
        return keyWithNumber
      }
    }
    // 5. Search for a key with this description slug
    const keyWithSlug = keys
      .filter((keyCodeEvent: KeyCodeEvent) => keyCodeEvent.description)
      .find(
        (keyCodeEvent: KeyCodeEvent) =>
          keyCodeEvent.description && slugify(keyCodeEvent.description) === key
      )

    if (keyWithSlug) {
      return keyWithSlug
    }

    return undefined
  }

  return {
    props: {
      staticKey: getKeyData()
    }
  }
}
