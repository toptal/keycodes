import Paper from '@toptal/picasso/Paper'

import { BASE_PATH } from '~/lib/constants/common'
import { findSimilarKeys } from '~/lib/utils/find-similar-keys'
import { KeyCodeEvent } from '~/lib/types/key-code-events'

// TODO: Fix component

type SimilarKeysCard = {
  keyCode: KeyCodeEvent
}

const SimilarKeysCard = ({ keyCode }: SimilarKeysCard): JSX.Element => {
  const similarKeys = findSimilarKeys(keyCode)

  return (
    <Paper
      style={{ width: 250, marginRight: 20, marginBottom: 20 }}
      className="card item-similar"
    >
      <div className="card-header">Similar Values</div>
      <div className="card-main" tabIndex={0} role="button">
        <ul>
          {similarKeys.map((similarKey: KeyCodeEvent) => (
            <li key={similarKey.keyCode}>
              <a href={`${BASE_PATH}/keycode-${similarKey.code}`}>
                {similarKey.code}
              </a>
              <a href={`${BASE_PATH}/keycode-${similarKey.keyCode}`}>
                ({similarKey.keyCode})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  )
}

export default SimilarKeysCard
