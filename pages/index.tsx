import Link from 'next/link'

import { PROJECT_DISPLAY_NAME } from '~/lib/constants/common'

import Layout from '~/components/Layout'

import styles from '../styles/Home.module.scss'

export default function Home(): JSX.Element {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>{PROJECT_DISPLAY_NAME}</h1>
        <Link href="/temp/analytics">Temp Analytics Page</Link>
      </div>
    </Layout>
  )
}
