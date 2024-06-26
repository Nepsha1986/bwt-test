const {
  validatePercents,
  validateOperationData,
} = require("./utils/dtoValidation");

class CashInConfigDTO {
  constructor(dto) {
    this.percents = validatePercents(dto.percents);
    this.max = validateOperationData(dto.max);
  }
}

module.exports = CashInConfigDTO;
