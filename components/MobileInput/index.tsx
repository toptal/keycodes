import { useState } from 'react'
import Input from '@toptal/picasso/Input'
import { Search16 } from '@toptal/picasso/Icon'
import classnames from 'classnames'
import { useRouter } from 'next/router'

import styles from './mobile-input.module.scss'
import { TestIdMobileInput } from './test-ids'

import { siteCopy } from '~/lib/constants/site-copy'
import { useKeyCodeState } from '~/lib/state/use-key-code'
import { generateKeyForMobile } from '~/lib/state/generate-key'
import { isHappo } from '~/lib/utils/is-happo'
import { useTouchDevice } from '~/lib/hooks/use-touch-device.hook'
import routes from '~/lib/constants/routes'

type InputMode = 'none' | 'text'

const MobileInputElement = () => {
  const { addKey } = useKeyCodeState()
  const [value, setValue] = useState('')
  const [currentInputMode, setCurrentInputMode] = useState<InputMode>('text')

  return (
    <Input
      autoComplete="off"
      data-testid={TestIdMobileInput.MobileInputElement}
      value={value}
      className={styles.mobileInput}
      icon={<Search16 />}
      iconPosition="start"
      inputMode={currentInputMode}
      placeholder={siteCopy.content.mobileInputPlaceholder}
      onClick={() => {
        setCurrentInputMode('text')
      }}
      onChange={e => {
        setValue(e.target.value)
      }}
      onKeyUp={e => {
        e.preventDefault()
        const generatedKey = generateKeyForMobile(e as unknown as KeyboardEvent)

        if (!generatedKey) {
          return
        }
        addKey(generatedKey, true)
        setValue('')
        setCurrentInputMode('none')
      }}
    />
  )
}

const MobileInput = (): JSX.Element | null => {
  const isTouchDevice = useTouchDevice()
  const { asPath } = useRouter()

  return (
    <div
      id="mobile-input"
      data-testid={TestIdMobileInput.MobileInputContainer}
      className={classnames(styles.container, {
        [styles.hide]: asPath === routes.table || (isHappo() && !isTouchDevice)
      })}
    >
      <MobileInputElement />
    </div>
  )
}

export default MobileInput
