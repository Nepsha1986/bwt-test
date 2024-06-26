/**
 * @param {number} number
 * @param {number} [decimals=2]
 *
 * @returns {number}
 */
function round(number, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.ceil(number * factor) / factor;
}

module.exports = round;
