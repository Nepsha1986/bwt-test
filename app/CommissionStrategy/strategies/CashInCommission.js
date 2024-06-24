const Commission = require("./Commission");
const configService = require("../../ConfigService");

class CashInCommission extends Commission {
  async calculate(transaction) {
    const config = await configService.getCashInConfig();

    const { amount } = transaction.operation;
    const fee = config.percents * amount;
    const maxFeeAmount = config.max.amount;

    return fee > maxFeeAmount ? maxFeeAmount : fee;
  }
}

module.exports = CashInCommission;
