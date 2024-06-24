const Commission = require("./Commission");

class cashOutNaturalCommission extends Commission {
  calculate(transaction) {
    return 2;
  }
}

module.exports = cashOutNaturalCommission;
