class CashOutLegalConfigDTO {
  constructor(dto) {
    this.percents = dto.percents;
    this.min = dto.min;
    this.#validate();
  }

  #validate() {
    this.validatePercents();
    this.validateMin();
  }

  validatePercents() {
    const { percents } = this;
    if (typeof percents !== "number" || percents <= 0) {
      throw new Error("Percents must be a positive number");
    }
  }

  validateMin() {
    const { amount, currency } = this.min;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Min amount must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Min currency must be "EUR"');
    }
  }
}

module.exports = CashOutLegalConfigDTO;
