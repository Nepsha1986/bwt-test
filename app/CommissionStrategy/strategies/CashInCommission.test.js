const CashInCommission = require("./CashInCommission");
const configService = require("../../ConfigService/ConfigService");

jest.mock("../../ConfigService/ConfigService");

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

  it("should calculate fee correctly when fee is less than max amount", async () => {
    const transaction = {
      operation: {
        amount: 100.0,
      },
    };
    const fee = await cashInCommission.calculate(transaction);
    expect(fee).toBe(0.03);
  });

  it("should return max fee when calculated fee exceeds max amount", async () => {
    const transaction = {
      operation: {
        amount: 100000.0,
      },
    };
    const fee = await cashInCommission.calculate(transaction);
    expect(fee).toBe(5);
  });

  it("should calculate fee correctly for zero amount", async () => {
    const transaction = {
      operation: {
        amount: 0.0,
      },
    };
    const fee = await cashInCommission.calculate(transaction);
    expect(fee).toBe(0);
  });
});
