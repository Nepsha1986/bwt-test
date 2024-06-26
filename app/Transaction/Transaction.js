const { TransactionDTO } = require("../dto");
const {
  CashInCommission,
  CashOutLegalCommission,
  CashOutNaturalCommission,
} = require("../commission");
const {
  getUserSameWeekTransactions,
  getCommissionStrategy,
} = require("./utils");

class Transaction {
  /**
   * @type {{
   *     calculate: Function,
   *     related: TransactionDTO[] | []
   * }}
   */
  #commission = {
    calculate: null,
    related: [],
  };

  /**
   * @param {TransactionDTO} data
   * @param {TransactionDTO[]} transactions
   */
  constructor(data, transactions) {
    const dto = new TransactionDTO(data);

    this.date = dto.date;
    this.user_id = dto.user_id;
    this.user_type = dto.user_type;
    this.type = dto.type;
    this.operation = dto.operation;

    this.#setCommissionStrategy(dto, transactions);
  }

  /**
   * Set the commission strategy based on the transaction.
   *
   * @param {TransactionDTO} dto
   * @param {TransactionDTO[]} transactions
   */
  #setCommissionStrategy(dto, transactions) {
    const strategy = getCommissionStrategy(dto.type, dto.user_type);

    switch (strategy) {
      case "CASH_IN":
        this.#commission.calculate = CashInCommission.calculate;
        break;
      case "CASH_OUT_LEGAL":
        this.#commission.calculate = CashOutLegalCommission.calculate;
        break;
      case "CASH_OUT_NATURAL":
        this.#commission.calculate = CashOutNaturalCommission.calculate;
        this.#commission.related = getUserSameWeekTransactions(
          dto.user_id,
          dto.date,
          transactions
        );
        break;
      default:
        throw new Error("Unknown commission strategy");
    }
  }

  /**
   * Calculate the commission for the transaction.
   * @return {Promise<number>}
   */
  async calculateCommission() {
    const { calculate, related } = this.#commission;
    return calculate(this, related);
  }
}

module.exports = Transaction;
