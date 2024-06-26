const {
  validatePercents,
  validateDate,
  validateUserId,
  validateUserType,
  validateTransactionType,
  validateOperationData,
} = require("./dtoValidation");

describe("validatePercents", () => {
  it("returns percent if valid", () => {
    expect(validatePercents(10)).toBe(10);
  });

  it("throw an error if percent not a number", () => {
    expect(() => validatePercents(null)).toThrow();
    expect(() => validatePercents("5.2")).toThrow();
  });

  it("should throw an error if the percent is negative", () => {
    expect(() => validatePercents(-5)).toThrow();
  });
});

describe("validateDate", () => {
  it("should return the date if it have YYYY-MM-DD format", () => {
    expect(validateDate("2023-06-25")).toBe("2023-06-25");
  });

  it("should throw an error if the date is not in YYYY-MM-DD format", () => {
    expect(() => validateDate("06-25-2023")).toThrow();
    expect(() => validateDate("2023/06/25")).toThrow();
    expect(() => validateDate(null)).toThrow();
    expect(() => validateDate(9039222323223)).toThrow();
  });
});

describe("validateUserId", () => {
  it("should return the user ID if it is an integer", () => {
    expect(validateUserId(1)).toBe(1);
  });

  it("should throw an error if the user ID is not an integer", () => {
    expect(() => validateUserId("1")).toThrow();
    expect(() => validateUserId(1.5)).toThrow();
    expect(() => validateUserId(null)).toThrow();
  });
});

describe("validateUserType", () => {
  it('should return the user type if it is "natural" or "juridical"', () => {
    expect(validateUserType("natural")).toBe("natural");
    expect(validateUserType("juridical")).toBe("juridical");
  });

  it("should throw an error if the user type is not valid", () => {
    expect(() => validateUserType("unregistered")).toThrow();
  });
});

describe("validateTransactionType", () => {
  it('should return the transaction type if it is "cash_in" or "cash_out"', () => {
    expect(validateTransactionType("cash_in")).toBe("cash_in");
    expect(validateTransactionType("cash_out")).toBe("cash_out");
  });

  it("should throw an error if the transaction type is not valid", () => {
    expect(() => validateTransactionType("transfer")).toThrow();
  });
});

describe("validateOperationData", () => {
  it('should return the data if the amount is positive and currency is "EUR"', () => {
    const data = { amount: 100, currency: "EUR" };
    expect(validateOperationData(data)).toEqual(data);
  });

  it("should throw an error if the amount is not a positive number", () => {
    const data = { amount: -100, currency: "EUR" };
    expect(() => validateOperationData(data)).toThrow();
  });

  it('should throw an error if the currency is not "EUR"', () => {
    const data = { amount: 100, currency: "USD" };
    expect(() => validateOperationData(data)).toThrow();
  });
});
