import { findBestMatch } from 'string-similarity';
import { keyCodesWithEvents } from './keyCodesWithEvents';

export function findSimilarKeys(key) {
  const allKeys = Object.values(keyCodesWithEvents)
    .filter((x) => x.keyCode !== key.keyCode)
    .filter(Boolean)
    .map((key) => JSON.stringify(key));

  const results = findBestMatch(JSON.stringify(key), allKeys);
  const bestMatches = results.ratings
    .filter((result) => !result.target.includes('Dead'))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((result) => JSON.parse(result.target));
  return bestMatches;
}
