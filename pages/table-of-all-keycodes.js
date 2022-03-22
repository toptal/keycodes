import slugify from '@sindresorhus/slugify';
import Link from 'next/link';
import { useEffect } from 'react';
import { useKeyCode } from '../components/KeyCodeProvider';
import { keyCodeEvents } from '../lib/keycodes';

export default function TableOfAllCodes() {
  const keyArray = Object.values(keyCodeEvents).filter((x) => x);
  // We clear out the keycode when visiting this page so links to it will use the static key
  const { setKey } = useKeyCode();
  useEffect(() => {
    setKey({});
  });
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
                <Link href={`/for/${key.keyCode}`}>
                  <a>{key.keyCode}</a>
                </Link>
              </td>
              <td>
                <Link href={`/for/${key.key}`}>
                  <a>{key.key}</a>
                </Link>
              </td>
              <td>
                <Link href={`/for/${key.code}`}>
                  <a>{key.code}</a>
                </Link>
              </td>
              <td>{key.unicode}</td>
              <td>
                {key.description && (
                  <Link href={`/for/${slugify(key.description)}`}>
                    <a>{key.description}</a>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
