const TransactionDTO = require("../dto/TransactionDTO");
const {
  CashInCommission,
  CashOutLegalCommission,
  CashOutNaturalCommission,
} = require("../CommissionStrategy");

class Transaction {
  /**
   * @type { CashInCommission | CashOutLegalCommission | CashOutNaturalCommission | null }
   */
  #strategy = null;

  /**
   * @param {TransactionDTO} data
   */
  constructor(data) {
    const dto = new TransactionDTO(data);

    this.date = dto.date;
    this.user_id = dto.user_id;
    this.user_type = dto.user_type;
    this.type = dto.type;
    this.operation = dto.operation;

    this.#setCommissionStrategy(dto.type, dto.user_type);
  }

  /**
   * Set the commission strategy based on the type.
   *
   * @param type {"cash_in" | "cash_out"}
   * @param userType {"juridical" | "natural"}
   */
  #setCommissionStrategy(type, userType) {
    const strategy = this.#getStrategy(type, userType);

    switch (strategy) {
      case "CASH_IN":
        this.#strategy = new CashInCommission();
        break;
      case "CASH_OUT_LEGAL":
        this.#strategy = new CashOutLegalCommission();
        break;
      case "CASH_OUT_NATURAL":
        this.#strategy = new CashOutNaturalCommission();
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
    return this.#strategy.calculate(this);
  }
}

module.exports = Transaction;
