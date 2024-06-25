const Commission = require("../Commission");
const configService = require("../../../ConfigService/ConfigService");
const { round } = require("../../../utils");

class cashOutNaturalCommission extends Commission {
  async calculate(transaction, related) {
    const config = await configService.getCashOutNaturalConfig();

    const spentAmount = related.reduce((acc, cur) => {
      return acc + cur.operation.amount;
    }, 0);

    if(spentAmount + transaction.operation.amount < config.week_limit.amount) return 0;

    const { amount } = transaction.operation;
    return round(config.percents * (amount / 100));
  }
}

module.exports = cashOutNaturalCommission;
