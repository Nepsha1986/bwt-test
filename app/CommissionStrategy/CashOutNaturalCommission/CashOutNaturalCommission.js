const Commission = require("../Commission.abstract");
const configService = require("../../ConfigService/ConfigService");
const { round } = require("../utils");

class cashOutNaturalCommission extends Commission {
  async calculate(transaction, related = []) {
    const config = await configService.getCashOutNaturalConfig();

    const weekLimitAmount = config.week_limit.amount;
    const curTransactionAmount = transaction.operation.amount;
    const totalAmountWithCurrent = related.reduce(
      (acc, cur) => acc + cur.operation.amount,
      0
    );

    if (totalAmountWithCurrent < weekLimitAmount) {
      return 0;
    }
    const exceededAmount = totalAmountWithCurrent - weekLimitAmount;
    const commissionAmount = Math.min(exceededAmount, curTransactionAmount);

    return round(config.percents * (commissionAmount / 100));
  }
}

module.exports = cashOutNaturalCommission;
