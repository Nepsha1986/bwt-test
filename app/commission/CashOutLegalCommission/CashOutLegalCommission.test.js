const CashOutLegalCommission = require("./CashOutLegalCommission");
const { cashOutLegalConfig } = require("../configs");

jest.mock("../configs");

describe("CashOutLegalCommission", () => {
  beforeEach(() => {
    cashOutLegalConfig.getConfig.mockResolvedValue({
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: "EUR",
      },
    });
  });

  test.each`
    amount       | expectedFee
    ${5.0}       | ${0.5}
    ${100_000.0} | ${300}
    ${0.0}       | ${0.5}
  `(
    "should calculate commission correctly for $amount amount",
    async ({ amount, expectedFee }) => {
      const transaction = {
        operation: { amount },
      };
      const fee = await CashOutLegalCommission.calculate(transaction);
      expect(fee).toBe(expectedFee);
    }
  );
});
