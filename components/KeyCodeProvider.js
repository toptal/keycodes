import { createContext, useState, useContext } from 'react';
import { keyCodeEvents } from '../lib/keycodes';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function KeyCodeProvider({ children }) {
  const [key, setKey] = useState({});
  const [events, setEvents] = useState(keyCodeEvents);
  return (
    <LocalStateProvider value={{ key, setKey, events, setEvents }}>
      {children}
    </LocalStateProvider>
  );
}

function useKeyCode() {
  return useContext(LocalStateContext);
}

export { KeyCodeProvider, LocalStateContext, useKeyCode };
