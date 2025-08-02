const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");

router.get("/", alertController.getMockAlerts);

module.exports = router;
