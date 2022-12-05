import { useState, useEffect } from 'react'

import { isHappo } from '~/lib/utils/is-happo'

const checkScreenWidthForHappo = () => {
  return isHappo() && window.innerWidth <= 768
}

const checkIfTouchDevice = () => {
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0

  const doesPointerExist = isHappo()
    ? null
    : matchMedia('(pointer:fine)').matches

  return isTouchDevice && !doesPointerExist
}

export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(checkScreenWidthForHappo())

  useEffect(() => {
    if (checkScreenWidthForHappo() || checkIfTouchDevice()) {
      setIsTouchDevice(true)
    } else {
      setIsTouchDevice(false)
    }
  }, [])

  return isTouchDevice
}
