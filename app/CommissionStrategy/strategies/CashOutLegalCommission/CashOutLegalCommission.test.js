const CashOutLegalCommission = require("./CashOutLegalCommission");
const configService = require("../../../ConfigService/ConfigService");

jest.mock("../../../ConfigService/ConfigService");

describe("CashOutLegalCommission", () => {
  let cashOutLegalCommission;

  beforeEach(() => {
    cashOutLegalCommission = new CashOutLegalCommission();
    configService.getCashOutLegalConfig.mockResolvedValue({
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: "EUR"
      }});
  });

  test.each`
    amount        | expectedFee
    ${5.0}        | ${0.5}
    ${100_000.00} | ${300}
    ${0.0}        | ${0.5}
  `(
      "should calculate commission correctly for $amount amount",
      async ({ amount, expectedFee }) => {
        const transaction = {
          operation: { amount },
        };
        const fee = await cashOutLegalCommission.calculate(transaction);
        expect(fee).toBe(expectedFee);
      }
  );
});