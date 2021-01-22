/**
 *
 * @param {string} original
 * @returns {boolean}
 */
export function isCaseable(original) {
  const uppercase = original.toUpperCase();
  const lowercase = original.toLowerCase();
  return original !== uppercase || original !== lowercase;
}

/**
 *
 * @param {string} original
 * @returns {boolean}
 */
export function isLowerCase(original) {
  const uppercase = original.toUpperCase();
  return isCaseable(original) && uppercase !== original;
}

/**
 *
 * @param {string} original
 * @returns {boolean}
 */
export function isUpperCase(original) {
  const lowercase = original.toLowerCase();
  return isCaseable(original) && lowercase !== original;
}

/**
 *
 * @param {string} original
 * @returns {string}
 */
export function getOppositeCase(original) {
  return isLowerCase(original)
    ? original.toUpperCase()
    : original.toLowerCase();
}
