/**
 * Abstract class representing a commission calculation strategy.
 * Subclasses should implement the `calculate` method.
 */
class Commission {
  calculate(transaction) {
    throw new Error("Method 'calculate()' must be implemented.");
  }
}

module.exports = Commission;
