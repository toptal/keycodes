/* istanbul ignore file */

export const CHARACTER_REPLACEMENTS = [
  ['ß', 'ss'],
  ['ä', 'ae'],
  ['ö', 'oe'],
  ['ü', 'ue'],
  ['ù', 'u'],
  ['ñ', 'n'],
  ['å', 'a'],
  ['ç', 'c'],
  ['ø', 'o'],
  ['ä', 'ae'],
  ['æ', 'ae'],
  ['ë', 'e']
]

export const slugifyForRedirects = (str: string): string => {
  let result = str.replace(/^\s+|\s+$/g, '')

  result = result.toLowerCase()

  for (let i = 0, l = CHARACTER_REPLACEMENTS.length; i < l; i++) {
    result = result.replace(
      new RegExp(CHARACTER_REPLACEMENTS[i][0], 'g'),
      CHARACTER_REPLACEMENTS[i][1]
    )
  }

  result = result
    .replace(/\//g, '-')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return `/${result.replace(/^-*/, '').replace(/-\s*$/, '')}`
}
