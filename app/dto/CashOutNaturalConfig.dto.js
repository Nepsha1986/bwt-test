const {
  validatePercents,
  validateOperationData,
} = require("./utils/dtoValidation");

class CashOutNaturalConfigDTO {
  constructor(dto) {
    this.percents = validatePercents(dto.percents);
    this.week_limit = validateOperationData(dto.week_limit);
  }
}

module.exports = CashOutNaturalConfigDTO;
