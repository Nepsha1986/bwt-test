const Commission = require("../Commission.abstract");
const { cashOutLegalConfig } = require("../../ConfigService");
const { round } = require("../utils");

class CashOutLegalCommission extends Commission {
  async calculate(transaction) {
    const config = await cashOutLegalConfig.getConfig();

    const { amount } = transaction.operation;
    const fee = round(config.percents * (amount / 100));
    const minFeeAmount = config.min.amount;

    return fee < minFeeAmount ? minFeeAmount : fee;
  }
}

module.exports = CashOutLegalCommission;
