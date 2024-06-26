const axios = require("axios");

class ConfigService {
  #commissionConfig = null;

  #configPromise = null;

  constructor(url, Shape) {
    this.configURL = url;
    this.Shape = Shape;
  }

  async #getData() {
    const url = this.configURL;
    console.log(`Fetching configuration from ${url}`);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }

  async #getCachedConfig() {
    if (this.#commissionConfig) {
      return this.#commissionConfig;
    }
    if (!this.#configPromise) {
      this.#configPromise = this.#getData(this.configURL)
        .then((data) => {
          this.#commissionConfig = new this.Shape(data);
          return this.#commissionConfig;
        })
        .catch((error) => {
          this.#configPromise = null;
          throw error;
        });
    }
    return this.#configPromise;
  }

  /**
   * @return {Promise<any>}
   */
  async getConfig() {
    return this.#getCachedConfig();
  }
}

module.exports = ConfigService;
