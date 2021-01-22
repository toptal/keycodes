import Link from 'next/link';
import { useKeyWatcher } from '../lib/useKeyCode';
import EventCollection from './EventCollection';

export default function Page({ children }) {
  useKeyWatcher();
  return (
    <div>
      <EventCollection />
      <canvas width="128" height="128" hidden />
      <button
        type="button"
        onClick={(e) => console.log('TODO SHOW TABLE')}
        className="table-toggle-button"
      >
        Table
      </button>
      <Link href="/table-of-all-keycodes">
        <a className="table-toggle-button">Table</a>
      </Link>
      <div className="display">{children}</div>
    </div>
  );
}
