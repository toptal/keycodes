import type { PropsWithChildren } from 'react'
import Picasso from '@toptal/picasso-provider'

import { isHappo } from '~/lib/utils/is-happo'

const PicassoProvider = ({
  children
}: PropsWithChildren<unknown>): JSX.Element => {
  return (
    <Picasso
      loadFavicon={false}
      fixViewport={false}
      loadFonts={false}
      disableClassNamePrefix={!isHappo()}
    >
      {children}
    </Picasso>
  )
}

export default PicassoProvider
