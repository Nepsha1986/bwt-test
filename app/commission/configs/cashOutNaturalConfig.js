const ConfigService = require("../../ConfigService");

const { CashOutNaturalConfigDTO } = require("../../dto");

const URL = "https://developers.paysera.com/tasks/api/cash-out-natural";

module.exports = new ConfigService(URL, CashOutNaturalConfigDTO);
