const validatePercents = (percents) => {
  if (typeof percents !== "number" || percents < 0) {
    throw new Error("Percents must be a positive number");
  }

  return percents;
};

function validateDate(date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    throw new Error(`Invalid date format ${date}. Expected format: YYYY-MM-DD`);
  }
  return date;
}

function validateUserId(userId) {
  if (!Number.isInteger(userId)) {
    throw new Error("User ID must be an integer");
  }
  return userId;
}

function validateUserType(userType) {
  const validUserTypes = ["natural", "juridical"];
  if (!validUserTypes.includes(userType)) {
    throw new Error(
      'Invalid user type. Expected one of: "natural", "juridical"'
    );
  }
  return userType;
}

function validateTransactionType(type) {
  const transactionTypes = ["cash_in", "cash_out"];
  if (!transactionTypes.includes(type)) {
    throw new Error(
      'Invalid operation type. Expected one of: "cash_in", "cash_out"'
    );
  }
  return type;
}

function validateOperationData(data) {
  const { amount, currency } = data;
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Invalid operation amount. Must be a positive number");
  }
  if (currency !== "EUR") {
    throw new Error('Invalid currency. Expected "EUR"');
  }
  return data;
}

module.exports = {
  validatePercents,
  validateDate,
  validateUserId,
  validateUserType,
  validateTransactionType,
  validateOperationData,
};
