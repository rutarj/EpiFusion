const fs = require("fs");
const path = require("path");

const getMockAlerts = (req, res) => {
  const rawData = fs.readFileSync(path.join(__dirname, "../data/mockNews.json"));
  const alerts = JSON.parse(rawData);
  res.json(alerts);
};

module.exports = { getMockAlerts };
