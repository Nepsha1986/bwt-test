const {
  validateDate,
  validateUserId,
  validateUserType,
  validateTransactionType,
  validateOperationData,
} = require("./utils/dtoValidation");

class TransactionDTO {
  constructor(dto) {
    this.date = validateDate(dto.date);
    this.user_id = validateUserId(dto.user_id);
    this.user_type = validateUserType(dto.user_type);
    this.type = validateTransactionType(dto.type);
    this.operation = validateOperationData(dto.operation);
  }
}

module.exports = TransactionDTO;
