/**
 * Abstract class representing a commission calculation strategy.
 * Subclasses should implement the `calculate` method.
 */
class Commission {
  /**
   * @param {Transaction} transaction - Current transaction.
   * @param {Transaction[]} [related] - (Optional) Related transactions that have effect on calculated commission
   *
   * @return {Promise<number>}
   */
  // eslint-disable-next-line
  static async calculate(transaction, related) {
    throw new Error("Method 'calculate()' must be implemented.");
  }
}

module.exports = Commission;
