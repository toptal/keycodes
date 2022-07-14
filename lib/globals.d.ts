declare interface Window {
  gtag: (
    event: 'js' | 'config' | 'event',
    action: string,
    params: EventParams | ViewPageParams
  ) => void
}
