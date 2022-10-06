const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const transactionsController = require("../controllers/transactions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Get all transactions
router.get("/", ensureAuth, transactionsController.getTransactions);

//Get all transactions sorted
router.get("/sort/:sortOrder", ensureAuth, transactionsController.getTransactions);

//Get all transactions in date range
router.post("/filter", ensureAuth, transactionsController.getTransactions);

//Get one transaction
router.get("/:id", ensureAuth, transactionsController.getTransaction);

//Create transaction
router.post("/add", upload.single("file"), transactionsController.createTransaction);

router.put("/update/:id", upload.single("file"), transactionsController.updateTransaction);

router.delete("/delete/:id", transactionsController.deleteTransaction);

module.exports = router;
