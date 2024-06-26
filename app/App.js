const Transaction = require("./Transaction");

class App {
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
    this.fees = await Promise.all(fees);
  }

  logFees() {
    console.log(this.fees.map(i => i.toFixed(2)).join('\n'));
  }
}

module.exports = App;
