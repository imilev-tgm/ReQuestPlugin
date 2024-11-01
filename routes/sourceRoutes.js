const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

// Route to get all sources
router.get('/', sourceController.getAllSources);

// Route to add a new source
router.post('/', sourceController.addSource);

// Route to update a source
router.put('/:id', sourceController.updateSource);

// Route to remove a source
router.delete('/:id', sourceController.removeSource);

module.exports = router;
