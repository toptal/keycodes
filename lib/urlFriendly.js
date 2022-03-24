// some keys aren't URL friendly, so we need to replace then with either their .code or their .keyCode

import slugify from '@sindresorhus/slugify';

// Try to use .code first, but sometimes they conflict, so we use the absolute .keyCode
export function urlFriendly(key) {
  switch (key) {
    case ' ':
      return 'Space';
    case '\\':
      // Backslash we mostly want
      return '220';
    case '.':
      // period
      return '190';
    case '/':
      return '191';
    case '?':
      return 'question-mark';
    case '#':
      return 'hash';
    case '%':
      return 'percent';
    case '(':
      return 'open-paren';
    default:
      break;
  }
  // try slugify it
  const slug = slugify(key);
  if (slug) return slug;
  // if there is nothing, then encode it
  return encodeURIComponent(key);
}
