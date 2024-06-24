const TransactionDTO = require("../dto/TransactionDTO");
const { CashInCommission } = require("../CommissionStrategy");

class Transaction {
  /**
   * @param data{any}
   */
  constructor(data) {
    const dto = new TransactionDTO(data);

    this.date = dto.date;
    this.user_id = dto.user_id;
    this.user_type = dto.user_type;
    this.type = dto.type;
    this.operation = dto.operation;
  }

  /**
   * @return number
   */
  async calculateCommission() {
    const cashInCommission = new CashInCommission();
    return cashInCommission.calculate(this);
  }
}

module.exports = Transaction;
