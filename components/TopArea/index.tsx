import Typography from '@toptal/picasso/Typography'

import styles from './top-area.module.scss'
import { TestIdTopArea } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'

type TopArea = {
  keyCode?: number
}

const TopArea = ({ keyCode }: TopArea): JSX.Element => {
  return (
    <div className={styles.container}>
      <p data-testid={TestIdTopArea.TopAreaKeyCode} className={styles.keycode}>
        {keyCode}
      </p>
      <Typography variant="heading" size="medium" as="h2" color="black">
        {siteCopy.titles.topArea}
      </Typography>
    </div>
  )
}

export default TopArea
