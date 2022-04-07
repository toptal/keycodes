import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="welcome">
      <Link href="/for/a">
        <a>
          <p>Press Any Key to get the JavaScript Event Keycode Info</p>
        </a>
      </Link>
    </div>
  )
}
