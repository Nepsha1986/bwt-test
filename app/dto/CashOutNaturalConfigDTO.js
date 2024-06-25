class CashOutNaturalConfigDTO {
  constructor(dto) {
    this.percents = dto.percents;
    this.week_limit = dto.week_limit;
    this.#validate();
  }

  #validate() {
    this.validatePercents();
    this.validateWeekLimit();
  }

  validatePercents() {
    const { percents } = this;
    if (typeof percents !== "number" || percents <= 0) {
      throw new Error("Percents must be a positive number");
    }
  }

  validateWeekLimit() {
    const { amount, currency } = this.week_limit;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Max amount must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Max currency must be "EUR"');
    }
  }
}

module.exports = CashOutNaturalConfigDTO;
