class CashInConfigDTO {
  constructor(dto) {
    this.percents = this.validatePercents(dto.percents);
    this.max = this.validateMax(dto.max);
  }

  validatePercents(percents) {
    if (typeof percents !== "number" || percents <= 0) {
      throw new Error("Percents must be a positive number");
    }
    return percents;
  }

  validateMax(max) {
    const { amount, currency } = max;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Max amount must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Max currency must be "EUR"');
    }
    return max;
  }
}

module.exports = CashInConfigDTO;
