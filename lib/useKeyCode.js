import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useKeyCode } from '../components/KeyCodeProvider';
import { urlFriendly } from './urlFriendly';

const getGeneratedKey = (e) => ({
  key: e.key,
  keyCode: e.keyCode,
  which: e.which,
  code: e.code,
  location: e.location,
  // Meta Keys
  altKey: e.altKey,
  ctrlKey: e.ctrlKey,
  metaKey: e.metaKey,
  shiftKey: e.shiftKey,
  repeat: e.repeat,
});

export function useKeyWatcher() {
  // const [key, setKey] = useState();
  const { key, setKey, setEvents, events, setKeyHistory } = useKeyCode();
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/for/${urlFriendly(e.key)}`);
      const generatedKey = getGeneratedKey(e);
      setKey(generatedKey);
      setKeyHistory((prevState) => {
        if (prevState.length === 0) return [generatedKey];

        const isDuplicate = prevState.some(
          (prevKey) => prevKey.key === generatedKey.key
        );

        if (isDuplicate) return prevState;

        // Add a max. of 4 items in the history
        if (prevState.length === 4) {
          const remainingKeys = prevState.slice(1);
          return [...remainingKeys, generatedKey];
        }

        return [...prevState, generatedKey];
      });
      // this is bad, but making a copy didn't work for some reason
      events[generatedKey.keyCode] = generatedKey;
      setEvents(events);
    },
    [events, router, setEvents, setKey, setKeyHistory]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // remove event listener
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    key,
    events,
  };
}
