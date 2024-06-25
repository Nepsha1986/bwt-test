class CashOutNaturalConfigDTO {
  constructor(dto) {
    this.percents = this.validatePercents(dto.percents);
    this.week_limit = this.validateWeekLimit(dto.week_limit);
  }

  validatePercents(percents) {
    if (typeof percents !== "number" || percents <= 0) {
      throw new Error("Percents must be a positive number");
    }
    return percents;
  }

  validateWeekLimit(weekLimit) {
    const { amount, currency } = weekLimit;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Max amount must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Max currency must be "EUR"');
    }
    return weekLimit;
  }
}

module.exports = CashOutNaturalConfigDTO;
