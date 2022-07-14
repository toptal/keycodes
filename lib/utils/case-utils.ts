/**
 *
 * @param {string} original
 * @returns {boolean}
 */
export function isCaseable(original: string): boolean {
  const uppercase = original.toUpperCase()
  const lowercase = original.toLowerCase()

  return original !== uppercase || original !== lowercase
}

/**
 *
 * @param {string} original
 * @returns {boolean}
 */
export function isLowerCase(original: string): boolean {
  const uppercase = original.toUpperCase()

  return isCaseable(original) && uppercase !== original
}

/**
 *
 * @param {string} original
 * @returns {string}
 */
export function getOppositeCase(original: string): string {
  return isLowerCase(original) ? original.toUpperCase() : original.toLowerCase()
}
