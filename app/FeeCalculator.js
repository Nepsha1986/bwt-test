const ConfigService = require("./ConfigService");

class FeeCalculator {
  constructor() {
    this.configService = new ConfigService();
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
}

module.exports = FeeCalculator;
