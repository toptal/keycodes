import { useState } from 'react'

export const ClipboardCopy = ({
  children
}: {
  children: string | undefined | number | null
}): JSX.Element => {
  const [copied, setCopied] = useState(false)

  function copyToClipboard() {
    if (typeof children === 'undefined' || children === null) {
      return
    }
    navigator.clipboard.writeText(children.toString())

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 200)
  }

  return (
    <div
      style={{
        cursor: 'pointer',
        scale: copied ? `1.15` : `1`,
        transition: 'scale 0.2s ease-in-out'
      }}
      onClick={copyToClipboard}
    >
      {children}
    </div>
  )
}
