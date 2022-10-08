const express = require ('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.js');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, dashboardController.getDashboard);
router.post("/", ensureAuth, dashboardController.getDashboard);
module.exports = router;