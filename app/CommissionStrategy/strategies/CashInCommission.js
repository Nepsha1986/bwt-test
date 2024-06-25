const Commission = require("./Commission");
const round = require("../../utils/round");
const configService = require("../../ConfigService/ConfigService");

class CashInCommission extends Commission {
  async calculate(transaction) {
    const config = await configService.getCashInConfig();

    const { amount } = transaction.operation;
    const fee = round(config.percents * (amount / 100));

    const maxFeeAmount = config.max.amount;

    return fee > maxFeeAmount ? maxFeeAmount : fee;
  }
}

module.exports = CashInCommission;
