// some keys aren't URL friendly, so we need to replace then with either their .code or their .keyCode

// Try to use .code first, but sometimes they conflict, so we use the absolute .keyCode
export function urlFriendly(key) {
  console.log(key);
  switch (key) {
    case ' ':
      return 'Space';
    case '\\':
      // Backslash we mostly want
      return '220';
    case '.':
      // period
      return '190';
    default:
      break;
  }
  return key;
}
