import Link from 'next/link'

import { trackEvent } from '~/lib/analytics'
import { Events, EventsCategories } from '~/lib/constants/analytics'

import styles from '../../styles/Home.module.scss'

export default function Home(): JSX.Element {
  const trackButtonClick = () => {
    trackEvent({
      action: Events.ButtonClick,
      params: {
        category: EventsCategories.General,
      },
    })
  }

  return (
    <div className={styles.container}>
      <h1>Analytics test page</h1>
      <button onClick={trackButtonClick}>Event tracked button</button>
      <br />
      <Link href="/">Home</Link>
    </div>
  )
}
