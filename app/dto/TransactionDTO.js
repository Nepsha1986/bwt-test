class TransactionDTO {
  constructor(dto) {
    this.date = dto.date;
    this.user_id = dto.user_id;
    this.user_type = dto.user_type;
    this.type = dto.type;
    this.operation = dto.operation;

    this.#validate();
  }

  #validate() {
    this.#validateDate();
    this.#validateUserId();
    this.#validateUserType();
    this.#validateTransactionType();
    this.#validateOperation();
  }

  #validateDate() {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(this.date)) {
      throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
    }
  }

  #validateUserId() {
    if (!Number.isInteger(this.user_id)) {
      throw new Error("User ID must be an integer");
    }
  }

  #validateUserType() {
    const validUserTypes = ["natural", "juridical"];
    if (!validUserTypes.includes(this.user_type)) {
      throw new Error(
        'Invalid user type. Expected one of: "natural", "juridical"'
      );
    }
  }

  #validateTransactionType() {
    const validTypes = ["cash_in", "cash_out"];
    if (!validTypes.includes(this.type)) {
      throw new Error(
        'Invalid operation type. Expected one of: "cash_in", "cash_out"'
      );
    }
  }

  #validateOperation(operation) {
    const { amount, currency } = operation;
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid operation amount. Must be a positive number");
    }
    if (currency !== "EUR") {
      throw new Error('Invalid currency. Expected "EUR"');
    }
    return operation;
  }
}

module.exports = TransactionDTO;
