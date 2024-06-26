const CashOutNaturalCommission = require("./CashOutNaturalCommission");
const { cashOutNaturalConfig } = require("../configs");

jest.mock("../configs");

describe("cashOutNaturalCommission", () => {
  beforeEach(() => {
    cashOutNaturalConfig.getConfig.mockResolvedValue({
      percents: 0.3,
      week_limit: {
        amount: 1000,
        currency: "EUR",
      },
    });
  });

  test.each`
    transactionAmount | relatedTransactions                  | expectedFee
    ${500}            | ${[]}                                | ${0}
    ${300}            | ${[{ operation: { amount: 500 } }]}  | ${0}
    ${500}            | ${[{ operation: { amount: 500 } }]}  | ${0}
    ${1500}           | ${[{ operation: { amount: 1000 } }]} | ${4.5}
    ${2000}           | ${[{ operation: { amount: 800 } }]}  | ${5.4}
    ${1000}           | ${[{ operation: { amount: 1000 } }]} | ${3}
  `(
    "should calculate commission correctly for $transactionAmount amount with related transactions $relatedTransactions",
    async ({ transactionAmount, relatedTransactions, expectedFee }) => {
      const transaction = {
        operation: { amount: transactionAmount },
      };
      const fee = await CashOutNaturalCommission.calculate(transaction, [
        ...relatedTransactions,
        transaction,
      ]);
      expect(fee).toBe(expectedFee);
    }
  );
});
