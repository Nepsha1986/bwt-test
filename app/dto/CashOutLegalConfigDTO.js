class CashOutLegalConfigDTO {
  constructor(dto) {
    this.percents = this.validatePercents(dto.percents);
    this.min = this.validateMin(dto.min);
  }

  validatePercents(percents) {
    if (typeof percents !== "number" || percents <= 0) {
      throw new Error("Percents must be a positive number");
    }
    return percents;
  }

  validateMin(min) {
    const { amount, currency } = min;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Min amount must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Min currency must be "EUR"');
    }
    return min;
  }
}

module.exports = CashOutLegalConfigDTO;
