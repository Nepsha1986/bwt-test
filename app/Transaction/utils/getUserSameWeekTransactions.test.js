const getUserSameWeekTransactions = require("./getUserSameWeekTransactions"); // Adjust the path accordingly

describe("getUserSameWeekTransactions", () => {
  it("should handle transactions that starts on Monday and ends on Sunday", () => {
    const transactions = [
      { user_id: 1, date: "2023-06-19" }, // Monday
      { user_id: 1, date: "2023-06-25" }, // Sunday
    ];

    const result = getUserSameWeekTransactions(1, "2023-06-25", transactions);
    expect(result.length).toBe(2);
  });

  it("should return transactions for the same week", () => {
    const transactions = [
      { user_id: 1, date: "2023-06-10" },
      { user_id: 1, date: "2023-06-19" },
      { user_id: 1, date: "2023-06-20" },
      { user_id: 2, date: "2023-06-20" },
    ];

    const result = getUserSameWeekTransactions(1, "2023-06-20", transactions);
    expect(result.length).toBe(2);
  });

  it("should return an empty array if no user found", () => {
    const transactions = [
      { user_id: 1, date: "2023-06-25" },
      { user_id: 2, date: "2023-06-20" },
    ];

    const result = getUserSameWeekTransactions(3, "2023-06-22", transactions);
    expect(result.length).toBe(0);
  });
});
