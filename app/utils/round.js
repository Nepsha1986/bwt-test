/**
 *
 * @param number {number}
 * @param decimals {number}
 *
 * @return {number}
 */
function round(number, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.ceil(number * factor) / factor;
}

module.exports = round;
