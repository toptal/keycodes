import Link from 'next/link';
import { useKeyWatcher } from '../lib/useKeyCode';
import { useNukeSW } from '../lib/useServiceWorker';
import EventCollection from './EventCollection';

export default function Page({ children }) {
  useKeyWatcher();
  useNukeSW();
  return (
    <div>
      <EventCollection />
      <Link href="/table-of-all-keycodes">
        <a className="table-toggle-button">Table</a>
      </Link>
      <div className="display">{children}</div>
    </div>
  );
}
