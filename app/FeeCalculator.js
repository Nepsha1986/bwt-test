const ConfigService = require("./ConfigService");

class FeeCalculator {
  constructor() {
    this.configService = new ConfigService();
  }

  get cashInConfig() {
    return this.configService.cashInConfig;
  }
}

module.exports = FeeCalculator;
