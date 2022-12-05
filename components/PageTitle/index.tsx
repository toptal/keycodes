import Typography from '@toptal/picasso/Typography'
import cx from 'classnames'

import styles from './page-title.module.scss'

type PageTitleProps = {
  text: string
  className?: string
}
const PageTitle = ({ text, className }: PageTitleProps): JSX.Element => {
  return (
    <Typography
      className={cx(styles.title, className)}
      variant="heading"
      size="xlarge"
    >
      {text}
    </Typography>
  )
}

export default PageTitle
