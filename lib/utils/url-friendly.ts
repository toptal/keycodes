import slugify from 'slugify'

export function urlFriendly(key: string): string {
  switch (key) {
    case ' ':
      return 'Space'
    case '\\':
      // Backslash we mostly want
      return '220'
    case '.':
      // period
      return '190'
    case '/':
      return '191'
    case '?':
      return 'question-mark'
    case '#':
      return 'hash'
    case '%':
      return 'percent'
    case '(':
      return 'open-paren'
    default:
      break
  }

  const slug = slugify(key)

  if (slug) {
    return slug
  }

  return encodeURIComponent(key)
}
