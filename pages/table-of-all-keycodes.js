import slugify from '@sindresorhus/slugify'
import Link from 'next/link'
import { keyCodeEvents } from '../lib/keycodes'

export default function TableOfAllCodes() {
  const keyArray = Object.values(keyCodeEvents).filter((x) => x)

  return (
    <div>
      <p>This is a table of all Key Codes and their associated data</p>
      <table className="table">
        <thead>
          <tr>
            <th>Key Code</th>
            <th>Key</th>
            <th>Code</th>
            <th>Unicode</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {keyArray.map((key) => (
            <tr key={key.keyCode}>
              <td>
                {key.keyCode && (
                  <Link href={`/for/${key.keyCode}`}>
                    <a>{key.keyCode}</a>
                  </Link>
                )}
              </td>
              <td>
                {key.key && (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {['.', '/', '\\'].includes(key.key) ? (
                      key.key
                    ) : (
                      <Link href={`/for/${key.key}`}>
                        <a>{key.key}</a>
                      </Link>
                    )}
                  </>
                )}
              </td>
              <td>
                {key.code && (
                  <Link href={`/for/${key.code}`}>
                    <a>{key.code}</a>
                  </Link>
                )}
              </td>
              <td>{key.unicode}</td>
              <td>
                {key.description && (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {slugify(key.description) ? (
                      <Link href={`/for/${slugify(key.description)}`}>
                        <a>{key.description}</a>
                      </Link>
                    ) : (
                      key.description
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
