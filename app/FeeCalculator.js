const ConfigService = require("./ConfigService");
const TransactionDTO = require('./dto/TransactionDTO');

class FeeCalculator {
  constructor(data) {
    this.transactions = data;
    this.configService = new ConfigService();
  }

  #calculations = {
    cashIn: this.#calculateCashInFee,
    cashOut: {
      natural: this.#calculateCashOutNaturalFee,
      legal: this.#calculateCashOutLegalFee,
    }
  }

  async init() {
    await this.configService.init();
  }

  get cashInConfig() {
    return this.configService.cashInConfig;
  }

  get cashOutNaturalConfig() {
    return this.configService.cashOutNaturalConfig;
  }

  get cashOutLegalConfig() {
    return this.configService.cashOutLegalConfig;
  }

  /**
   * @return number[]
   */
  calculateFees() {
    return this.transactions.map(i => {
      return this.#calculateCashInFee(i);
    })
  }

  /**
   * @param data{TransactionDTO}
   * @return number
   */
  #calculateCashInFee(data) {
    const transaction = new TransactionDTO(data);

    const amount = transaction.operation.amount;
    const fee = this.cashInConfig.percents*amount;
    const maxFeeAmount = this.cashInConfig.max.amount;

    return fee > maxFeeAmount  ? maxFeeAmount : fee;
  }

  #calculateCashOutNaturalFee(data) {
    return 1
  }

  #calculateCashOutLegalFee(data) {
    return 1
  }
}

module.exports = FeeCalculator;
