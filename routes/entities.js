const express = require('express');
const router = express.Router();
const entitiesController = require('../controllers/entities.js');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureAuth, entitiesController.getEntities);

router.get('/:id', ensureAuth, entitiesController.getEntity);

router.get('/:id/sort/:sortOrder', ensureAuth, entitiesController.getEntity);

router.post('/add', ensureAuth, entitiesController.createEntity);

router.put('/:id', ensureAuth, entitiesController.updateEntity);

router.delete('/:id', ensureAuth, entitiesController.deleteEntity);

module.exports = router;