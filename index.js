const fs = require("fs");
const path = require("path");
const App = require("./app");

const filePath = process.argv[2];
if (!filePath) process.exit(1);

const absolutePath = path.resolve(filePath);
fs.readFile(absolutePath, "utf8", async (err, data) => {
  if (err) {
    console.error("An error occurred", err)
    process.exit(1);
  }

  try {
    const jsonData = JSON.parse(data);
    const app = new App(jsonData);
    await app.calculateFees();
    app.logFees();
  } catch (err) {
    console.error("An error occurred", err)
    process.exit(1);
  }
});
