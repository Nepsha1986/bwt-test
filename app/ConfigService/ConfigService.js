const axios = require("axios");
const CashInConfigDTO = require("../dto/CashInConfigDTO");
const CashOutLegalConfigDTO = require("../dto/CashOutLegalConfigDTO");
const CashOutNaturalConfigDTO = require("../dto/CashOutNaturalConfigDTO");

const CASH_IN = "https://developers.paysera.com/tasks/api/cash-in";
const CASH_OUT_NATURAL =
  "https://developers.paysera.com/tasks/api/cash-out-natural";
const CASH_OUT_LEGAL =
  "https://developers.paysera.com/tasks/api/cash-out-juridical";

class ConfigService {
  static #instance = null;

  #feeConfig = null;

  #cashInPromise = null;

  #cashOutNaturalPromise = null;

  #cashOutLegalPromise = null;

  constructor() {
    if (ConfigService.#instance) {
      throw new Error(
        "ConfigService is a singleton class and cannot be instantiated multiple times."
      );
    }
    this.#feeConfig = {
      cashIn: null,
      cashOutNatural: null,
      cashOutLegal: null,
    };
    ConfigService.#instance = this;
  }

  /**
   * @return {ConfigService}
   */
  static getInstance() {
    if (!ConfigService.#instance) {
      ConfigService.#instance = new ConfigService();
    }
    return ConfigService.#instance;
  }

  async #getData(url) {
    console.log(`Fetching configuration from ${url}`);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }

  async #getCachedConfig(configType, url, dto) {
    if (this.#feeConfig[configType]) {
      return this.#feeConfig[configType];
    }
    if (!this[`#${configType}Promise`]) {
      this[`#${configType}Promise`] = this.#getData(url)
        .then((data) => {
          this.#feeConfig[configType] = dto ? new dto(data) : data;
          return this.#feeConfig[configType];
        })
        .catch((error) => {
          this[`#${configType}Promise`] = null;
          throw error;
        });
    }
    return this[`#${configType}Promise`];
  }

  /**
   * @return {Promise<CashInConfigDTO>}
   */
  async getCashInConfig() {
    return this.#getCachedConfig("cashIn", CASH_IN, CashInConfigDTO);
  }

  /**
   * @return {Promise<CashOutNaturalConfigDTO>}
   */
  async getCashOutNaturalConfig() {
    return this.#getCachedConfig(
      "cashOutNatural",
      CASH_OUT_NATURAL,
      CashOutNaturalConfigDTO
    );
  }

  /**
   * @return {Promise<CashOutLegalConfigDTO>}
   */
  async getCashOutLegalConfig() {
    return this.#getCachedConfig(
      "cashOutLegal",
      CASH_OUT_LEGAL,
      CashOutLegalConfigDTO
    );
  }
}

// Export the singleton instance
module.exports = ConfigService.getInstance();
