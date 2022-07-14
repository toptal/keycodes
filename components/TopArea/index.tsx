// TODO: Fix component

type TopArea = {
  keyCode?: number
}

const TopArea = ({ keyCode }: TopArea): JSX.Element => {
  return (
    <div>
      <p>JavaScript Keycode - {keyCode}</p>
    </div>
  )
}

export default TopArea
