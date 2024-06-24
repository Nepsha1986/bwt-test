const axios = require("axios");
const CashInConfigDTO = require('./dto/CashInConfigDTO');

const CASH_IN = "https://developers.paysera.com/tasks/api/cash-in";
const CASH_OUT_NATURAL =
  "https://developers.paysera.com/tasks/api/cash-out-natural";
const CASH_OUT_LEGAL =
  "https://developers.paysera.com/tasks/api/cash-out-juridical";

class ConfigService {
  #feeConfig = null;
  constructor() {
    this.#feeConfig = {
      cashIn: undefined,
      cashOutNatural: undefined,
      cashOutLegal: undefined,
    };
  }

  async init() {
    try {
      const [cashIn, cashOutNatural, cashOutLegal] = await Promise.all([
        this.#getData(CASH_IN),
        this.#getData(CASH_OUT_NATURAL),
        this.#getData(CASH_OUT_LEGAL),
      ]);
      this.#feeConfig.cashIn = new CashInConfigDTO(cashIn);
      this.#feeConfig.cashOutNatural = cashOutNatural;
      this.#feeConfig.cashOutLegal = cashOutLegal;
    } catch (error) {
      console.error("Error initializing ConfigService:", error);
      throw error;
    }
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

  /**
   * @return {CashInConfigDTO}
   */
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
