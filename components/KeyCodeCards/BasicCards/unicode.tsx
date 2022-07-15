import Paper from '@toptal/picasso/Paper'

// TODO: Fix component
type UnicodeCard = {
  unicode?: string
}

const UnicodeCard = ({ unicode }: UnicodeCard): JSX.Element => {
  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-unicode"
    >
      <div className="card-header">Unicode</div>
      <div className="card-main" tabIndex={0} role="button">
        {unicode || ' '}
      </div>
    </Paper>
  )
}

export default UnicodeCard
