const Transaction = require("./Transaction");

class FeeCalculator {
  /**
   * @type {Transaction[]}
   */
  transactions;
  constructor(data) {
    this.transactions = data.map(i => new Transaction(i, data));
  }

  /**
   * @return {Promise<number[]>}
   */
  async calculateFees() {
    const fees = this.transactions.map((i) => i.calculateCommission());
    return Promise.all(fees);
  }
}

module.exports = FeeCalculator;
