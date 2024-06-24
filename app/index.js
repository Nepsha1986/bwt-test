const fs = require("fs");
const path = require("path");
const FeeCalculator = require("./FeeCalculator");

const filePath = process.argv[2];
if (!filePath) process.exit(1);

const absolutePath = path.resolve(filePath);
fs.readFile(absolutePath, "utf8", async (err, data) => {
  if (err) {
    process.exit(1);
  }

  try {
    const jsonData = JSON.parse(data);
    const feeCalculator = new FeeCalculator(jsonData);
    await feeCalculator.init();

    console.log(feeCalculator.cashInConfig);
  } catch (err) {
    process.exit(1);
  }
});
