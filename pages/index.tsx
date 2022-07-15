import Paper from '@toptal/picasso/Paper'
import Container from '@toptal/picasso/Container'
import Typography from '@toptal/picasso/Typography'

import Layout from '~/components/Layout'

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Layout.Main>
        <Paper style={{ width: 250, marginRight: 20, marginBottom: 20 }}>
          <Container padded="small">
            <Typography variant="heading" size="medium">
              Press any key to get the JavaScript event keycode
            </Typography>
          </Container>
        </Paper>
      </Layout.Main>
    </Layout>
  )
}
