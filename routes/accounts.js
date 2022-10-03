const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureAuth, accountsController.getAccounts);

router.get('/sort/:sortOrder', ensureAuth, accountsController.getAccounts);

router.get('/:id', ensureAuth, accountsController.getAccount);

router.get('/:id/sort/:sortOrder', ensureAuth, accountsController.getAccount);

router.post('/add', ensureAuth, accountsController.createAccount);

router.put('/:id', ensureAuth, accountsController.updateAccount);

router.delete('/:id', ensureAuth, accountsController.deleteAccount);

module.exports = router;