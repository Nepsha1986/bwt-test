const Commission = require("./Commission");

class CashInCommission extends Commission {
  calculate(transaction) {
    const { amount } = transaction.operation;
    const fee = this.cashInConfig.percents * amount;
    const maxFeeAmount = this.cashInConfig.max.amount;

    return fee > maxFeeAmount ? maxFeeAmount : fee;
  }
}

module.exports = CashInCommission;
