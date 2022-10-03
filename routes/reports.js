const express = require ('express');
const router = express.Router();
const reportsController = require('../controllers/reports.js');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/dashboard", ensureAuth, reportsController.getDashboard);
router.get("/dashboard/sort/:sortOrder", ensureAuth, reportsController.getDashboard);
module.exports = router;