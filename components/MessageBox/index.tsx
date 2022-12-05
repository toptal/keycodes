import Paper from '@toptal/picasso/Paper'
import Typography from '@toptal/picasso/Typography'

import styles from './message-box.module.scss'
import { TestIdMessageBox } from './test-ids'

type MessageBoxProps = {
  message: string
}

const MessageBox = ({ message }: MessageBoxProps): JSX.Element => {
  return (
    <Paper
      data-testid={TestIdMessageBox.MessageBoxContainer}
      className={styles.paper}
    >
      <Typography variant="heading" size="large" className={styles.text}>
        {message}
      </Typography>
    </Paper>
  )
}

export default MessageBox
