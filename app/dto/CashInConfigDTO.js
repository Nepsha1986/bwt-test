class CashInConfigDTO {
  constructor(dto) {
    this.percents = dto.percents;
    this.max = dto.max;
    this.#validate();
  }

  #validate() {
    this.validatePercents();
    this.validateMax();
  }

  validatePercents() {
    const { percents } = this;
    if (typeof percents !== "number" || percents <= 0) {
      throw new Error("Percents must be a positive number");
    }
  }

  validateMax() {
    const { amount, currency } = this.max;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Max amount must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Max currency must be "EUR"');
    }
  }
}

module.exports = CashInConfigDTO;
