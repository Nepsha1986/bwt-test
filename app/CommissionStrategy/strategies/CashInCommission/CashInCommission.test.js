const CashInCommission = require("./CashInCommission");
const configService = require("../../../ConfigService/ConfigService");

jest.mock("../../../ConfigService/ConfigService");

describe("CashInCommission", () => {
  let cashInCommission;

  beforeEach(() => {
    cashInCommission = new CashInCommission();
    configService.getCashInConfig.mockResolvedValue({
      percents: 0.03,
      max: {
        amount: 5.0,
        currency: "EUR",
      },
    });
  });

  test.each`
    amount      | expectedFee
    ${100.0}    | ${0.03}
    ${100000.0} | ${5}
    ${0.0}      | ${0}
  `(
    "should calculate commission correctly for $amount amount",
    async ({ amount, expectedFee }) => {
      const transaction = {
        operation: { amount },
      };
      const fee = await cashInCommission.calculate(transaction);
      expect(fee).toBe(expectedFee);
    }
  );
});
