const getCommissionStrategy = require("./getCommissionStrategy");

describe("getCommissionStrategy", () => {
  it.each`
    type          | userType       | expected
    ${"cash_in"}  | ${"juridical"} | ${"CASH_IN"}
    ${"cash_out"} | ${"juridical"} | ${"CASH_OUT_LEGAL"}
    ${"cash_out"} | ${"natural"}   | ${"CASH_OUT_NATURAL"}
  `(
    "returns $expected commission strategy for type: $type and userType: $userType",
    ({ type, userType, expected }) => {
      expect(getCommissionStrategy(type, userType)).toBe(expected);
    }
  );

  it("should throw an Error if input data is wrong", () => {
    expect(() => {
      getCommissionStrategy("cash_out", "fake");
    }).toThrow(
      "The strategy cannot be determined for type: cash_out and userType: fake"
    );
  });
});
