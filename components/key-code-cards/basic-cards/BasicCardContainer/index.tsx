import type { ReactNode } from 'react'
import { Card } from '@toptal/site-acq-ui-library'
import Container from '@toptal/picasso/Container'

import styles from './basic-card-container.module.scss'

type BasicCardContainerProps = {
  children: ReactNode
  description?: ReactNode
  title: string
  testId?: string
}

const BasicCardContainer = ({
  children,
  description,
  title,
  testId
}: BasicCardContainerProps): JSX.Element => {
  return (
    <Card
      className={styles.card}
      bodyClassName={styles.body}
      title={title}
      titleTag="h3"
      description={<div className={styles.description}>{description}</div>}
    >
      <Container
        flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        tabIndex={0}
        role="button"
        className={styles.container}
        data-testid={testId}
      >
        {children}
      </Container>
    </Card>
  )
}

export default BasicCardContainer
