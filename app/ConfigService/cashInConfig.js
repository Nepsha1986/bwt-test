const ConfigService = require("./ConfigService");

const { CashInConfigDTO } = require("../dto");

const URL = "https://developers.paysera.com/tasks/api/cash-in";

module.exports = new ConfigService(URL, CashInConfigDTO);
