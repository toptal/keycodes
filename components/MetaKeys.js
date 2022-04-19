export default function MetaKeys({ currentKey: key }) {
  return (
    <div className="card item-code">
      <div className="card-header">Meta Keys </div>
      <div className="card-main">
        <div className="main-description meta-keys">
          <div
            className={`key ${key?.metaKey ? 'pressed' : ''}`}
            alt="Meta Key"
          >
            ⌘
          </div>
          <div
            className={`key ${key?.shiftKey ? 'pressed' : ''}`}
            alt="Shift Key"
          >
            ⇧
          </div>
          <div
            className={`key ${key?.altKey ? 'pressed' : ''}`}
            alt="Alt / Option"
          >
            ⌥
          </div>
          <div
            className={`key ${key?.ctrlKey ? 'pressed' : ''}`}
            alt="Control Key"
          >
            ^
          </div>
        </div>
      </div>
    </div>
  )
}
