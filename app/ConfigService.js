const axios = require("axios");

const CASH_IN = "https://developers.paysera.com/tasks/api/cash-in";
const CASH_OUT_NATURAL =
  "https://developers.paysera.com/tasks/api/cash-out-natural";
const CASH_OUT_LEGAL =
  "https://developers.paysera.com/tasks/api/cash-out-juridical";

class ConfigService {
  #feeConfig = {
    cashIn: undefined,
    cashOutNatural: undefined,
    cashOutLegal: undefined,
  };
  constructor() {
    this.#init();
  }

  async #getData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }

  #init() {
    Promise.all([
      this.#getCashInData(),
      this.#getCashOutNaturalData(),
      this.#getCashOutLegalData(),
    ]).then((data) => {
      this.#feeConfig.cashIn = data[0];
      this.#feeConfig.cashOutNatural = data[1];
      this.#feeConfig.cashOutLegal = data[2]
    });
  }

  async #getCashInData() {
    return await this.#getData(CASH_IN);
  }

  async #getCashOutNaturalData() {
    return await this.#getData(CASH_OUT_NATURAL);
  }

  async #getCashOutLegalData() {
    return await this.#getData(CASH_OUT_LEGAL);
  }

  get cashInConfig() {
    return this.#feeConfig.cashIn;
  }

  get cashOutNaturalConfig() {
    return this.#feeConfig.cashOutNatural;
  }

  get cashOutLegalConfig() {
    return this.#feeConfig.cashOutLegal;
  }
}

module.exports = ConfigService;
