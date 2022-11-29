import { NextRequest, NextResponse } from 'next/server'

import { keyCodeEventValues } from '~/lib/keycodes'
import { slugifyForRedirects } from '~/lib/utils/slugify'
import { KeyCodeEvent } from '~/lib/types/key-code-events'
import { capitalizeFirstLetter } from '~/lib/utils/capitalize-first-letter'

export const checkRedirectForKeycode = (
  keys: KeyCodeEvent[],
  pathKey: string
): KeyCodeEvent | undefined => {
  if (!pathKey) {
    return undefined
  }

  const keyWithKey = keys.find(
    (keyCode: KeyCodeEvent) => keyCode.key.toLowerCase() === pathKey
  )

  if (keyWithKey) {
    return keyWithKey
  }

  const keyWithCode = keys.find(
    (keyCode: KeyCodeEvent) => keyCode.code?.toLowerCase() === pathKey
  )

  if (keyWithCode) {
    return keyWithCode
  }

  const numberCode = parseInt(pathKey)

  if (numberCode) {
    const keyWithNumber = keys.find(
      (keyCodeEvent: KeyCodeEvent) => keyCodeEvent.keyCode === numberCode
    )

    if (keyWithNumber) {
      return keyWithNumber
    }
  }

  const keyWithSlug = keys
    .filter((keyCodeEvent: KeyCodeEvent) => keyCodeEvent.description)
    .find(
      (keyCodeEvent: KeyCodeEvent) =>
        keyCodeEvent.description &&
        slugifyForRedirects(keyCodeEvent.description) === pathKey
    )

  if (keyWithSlug) {
    return keyWithSlug
  }

  if (pathKey.includes('-')) {
    const camelCaseKey = capitalizeFirstLetter(
      pathKey.replace(/-./g, x => x[1].toUpperCase())
    )

    const keyAux = keys
      .filter((keyCodeEvent: KeyCodeEvent) => keyCodeEvent.key.toLowerCase())
      .find((keyCodeEvent: KeyCodeEvent) => keyCodeEvent.key === camelCaseKey)

    if (keyAux) {
      return keyAux
    }
  }

  return undefined
}

const redirect = (request: NextRequest, route: string) => {
  return NextResponse.redirect(
    new URL(
      `${request.nextUrl.basePath}/${route.replace('/', '')}`,
      request.url
    )
  )
}

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/favicon') ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  const simplifiedPathKey = pathname.replace('/for', '')
  let pathKey = ''

  try {
    pathKey = decodeURIComponent(simplifiedPathKey)
  } catch (e) {
    pathKey = simplifiedPathKey
  }

  if (keyCodeEventValues.find(x => x.path === pathKey)) {
    return NextResponse.next()
  }

  const key = pathKey.replace('/', '')

  const keycodeData = checkRedirectForKeycode(keyCodeEventValues, key)

  if (keycodeData?.path) {
    return redirect(request, keycodeData.path)
  }

  return NextResponse.next()
}
