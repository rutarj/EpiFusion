const fs = require("fs");
const path = require("path");


const { alerts } = require("../data/alertStore");
const { v4: uuidv4 } = require("uuid");

const getMockAlerts = (req, res) => {
  res.json(alerts);
};

const addAlert = (req, res) => {
  const { disease, location, risk_score, credibility } = req.body;

  if (!disease || !location || !risk_score || !credibility) {
    return res.status(400).json({ error: "Missing required alert fields" });
  }

  const newAlert = {
    id: uuidv4(),
    disease,
    location,
    risk_score,
    credibility,
    timestamp: new Date().toISOString()
  };

  alerts.push(newAlert);
  res.status(201).json(newAlert);
};

module.exports = { getMockAlerts, addAlert };



