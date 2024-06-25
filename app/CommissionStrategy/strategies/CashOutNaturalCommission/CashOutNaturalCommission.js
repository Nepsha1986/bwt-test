const Commission = require("../Commission");
const configService = require("../../../ConfigService/ConfigService");
const round = require("../../../utils/round");

class cashOutNaturalCommission extends Commission {
  async calculate(transaction, prevTransactions) {
    const config = await configService.getCashOutNaturalConfig();

    const { amount } = transaction.operation;
    return round(config.percents * (amount / 100));
  }
}

module.exports = cashOutNaturalCommission;
