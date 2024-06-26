const ConfigService = require("../../ConfigService");

const { CashOutLegalConfigDTO } = require("../../dto");

const URL = "https://developers.paysera.com/tasks/api/cash-out-juridical";

module.exports = new ConfigService(URL, CashOutLegalConfigDTO);
