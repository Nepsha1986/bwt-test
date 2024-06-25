const TransactionDTO = require("../dto/Transaction.dto");
const {
  CashInCommission,
  CashOutLegalCommission,
  CashOutNaturalCommission,
} = require("../CommissionStrategy");
const { getUserSameWeekTransactions } = require("./utils");

class Transaction {
  /**
   * @type { CashInCommission | CashOutLegalCommission | CashOutNaturalCommission | null }
   */
  #commission = {
    strategy: null,
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
   * Set the commission strategy based on the type.
   *
   * @param dto {TransactionDTO}
   * @param transactions {TransactionDTO[]}
   */
  #setCommissionStrategy(dto, transactions) {
    const strategy = this.#getStrategy(dto.type, dto.user_type);

    switch (strategy) {
      case "CASH_IN":
        this.#commission.strategy = new CashInCommission();
        break;
      case "CASH_OUT_LEGAL":
        this.#commission.strategy = new CashOutLegalCommission();
        break;
      case "CASH_OUT_NATURAL":
        this.#commission.strategy = new CashOutNaturalCommission();
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

  #getStrategy(type, userType) {
    if (type === "cash_in") return "CASH_IN";
    if (type === "cash_out" && userType === "juridical")
      return "CASH_OUT_LEGAL";
    if (type === "cash_out" && userType === "natural")
      return "CASH_OUT_NATURAL";

    return null;
  }

  /**
   * Calculate the commission for the transaction.
   * @return {Promise<number>}
   */
  async calculateCommission() {
    const { strategy, related } = this.#commission;
    return strategy.calculate(this, related);
  }
}

module.exports = Transaction;
