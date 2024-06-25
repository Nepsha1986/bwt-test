class TransactionDTO {
  constructor(data) {
    this.date = this.#validateDate(data.date);
    this.user_id = this.#validateUserId(data.user_id);
    this.user_type = this.#validateUserType(data.user_type);
    this.type = this.#validateType(data.type);
    this.operation = this.#validateOperation(data.operation);
  }

  #validateDate(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
    }
    return date;
  }

  #validateUserId(user_id) {
    if (!Number.isInteger(user_id)) {
      throw new Error("User ID must be an integer");
    }
    return user_id;
  }

  #validateUserType(user_type) {
    const validUserTypes = ["natural", "juridical"];
    if (!validUserTypes.includes(user_type)) {
      throw new Error(
        'Invalid user type. Expected one of: "natural", "juridical"'
      );
    }
    return user_type;
  }

  #validateType(type) {
    const validTypes = ["cash_in", "cash_out"];
    if (!validTypes.includes(type)) {
      throw new Error(
        'Invalid operation type. Expected one of: "cash_in", "cash_out"'
      );
    }
    return type;
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
