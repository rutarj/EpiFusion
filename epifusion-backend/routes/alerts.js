const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");

router.get("/", alertController.getMockAlerts);
router.post("/", alertController.addAlert);

module.exports = router;
