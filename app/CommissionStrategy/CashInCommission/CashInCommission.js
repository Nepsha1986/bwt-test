const Commission = require("../Commission.abstract");
const { round } = require("../utils");
const cashInConfig = require("../../ConfigService/cashInConfig");

class CashInCommission extends Commission {
  async calculate(transaction) {
    const config = await cashInConfig.getConfig();

    const { amount } = transaction.operation;
    const fee = round(config.percents * (amount / 100));

    const maxFeeAmount = config.max.amount;

    return fee > maxFeeAmount ? maxFeeAmount : fee;
  }
}

module.exports = CashInCommission;
