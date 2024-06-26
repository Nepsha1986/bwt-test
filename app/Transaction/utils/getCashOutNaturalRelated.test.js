const getCashOutNaturalRelated = require("./getCashOutNaturalRelated"); // Adjust the path accordingly

describe("getCashOutNaturalRelated", () => {
  it("should handle transactions that starts on Monday and ends on Sunday", () => {
    const transaction = { user_id: 1, date: "2023-06-25" };

    const transactions = [
      { user_id: 1, date: "2023-06-19", type: "cash_out" }, // Monday
      { user_id: 1, date: "2023-06-25", type: "cash_out" }, // Sunday
    ];

    const result = getCashOutNaturalRelated(transaction, transactions);
    expect(result.length).toBe(2);
  });

  it("should return transactions for the same week", () => {
    const transaction = { user_id: 1, date: "2023-06-20" };

    const transactions = [
      { user_id: 1, date: "2023-06-10", type: "cash_out" },
      { user_id: 1, date: "2023-06-19", type: "cash_out" },
      { user_id: 1, date: "2023-06-20", type: "cash_out" },
      { user_id: 2, date: "2023-06-20", type: "cash_out" },
    ];

    const result = getCashOutNaturalRelated(transaction, transactions);
    expect(result.length).toBe(2);
  });

  it("should return an empty array if no user found", () => {
    const transaction = { user_id: 3, date: "2023-06-20" };

    const transactions = [
      { user_id: 1, date: "2023-06-25", type: "cash_out" },
      { user_id: 2, date: "2023-06-20", type: "cash_out" },
    ];

    const result = getCashOutNaturalRelated(transaction, transactions);
    expect(result.length).toBe(0);
  });

  it("should return only 'cash_out' transactions", () => {
    const transaction = { user_id: 1, date: "2023-06-25" };

    const transactions = [
      { user_id: 1, date: "2023-06-25", type: "cash_out" },
      { user_id: 1, date: "2023-06-25", type: "cash_in" },
      { user_id: 2, date: "2023-06-26", type: "cash_out" },
    ];

    const result = getCashOutNaturalRelated(transaction, transactions);
    expect(result.length).toBe(1);
  });
});
