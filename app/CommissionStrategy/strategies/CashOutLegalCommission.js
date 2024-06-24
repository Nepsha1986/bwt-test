const Commission = require("./Commission");

class CashOutLegalCommission extends Commission {
  calculate(transaction) {
    return 1;
  }
}

module.exports = CashOutLegalCommission;
