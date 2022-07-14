import type { PropsWithChildren } from 'react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

import PicassoProvider from '../picasso-provider'

type PageProviderProps = {
  url?: string
}

const PageProvider = ({
  children,
  url = '/'
}: PropsWithChildren<PageProviderProps>): JSX.Element => {
  return (
    <MemoryRouterProvider url={url}>
      <PicassoProvider>{children}</PicassoProvider>
    </MemoryRouterProvider>
  )
}

export default PageProvider
