const {
  validatePercents,
  validateOperationData,
} = require("./utils/dtoValidation");

class CashOutLegalConfigDTO {
  constructor(dto) {
    this.percents = validatePercents(dto.percents);
    this.min = validateOperationData(dto.min);
  }
}

module.exports = CashOutLegalConfigDTO;
