import Paper from '@toptal/picasso/Paper'
// TODO: Fix component
type DescriptionCard = {
  description?: string
}

const DescriptionCard = ({ description }: DescriptionCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-description"
    >
      <div className="card-header">Description</div>
      <div className="card-main" tabIndex={0} role="button">
        <div className="main-description">
          {description || 'No Description. Add one?'}
        </div>
      </div>
      <footer>
        <p>
          This is the description we have created. Think it can be improved?{' '}
          <a href="https://github.com/wesbos/keycodes">PR us on GitHub</a>
        </p>
      </footer>
    </Paper>
  )
}

export default DescriptionCard
