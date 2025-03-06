const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

// Route to get all sources
router.get('/', sourceController.getAllSources);

// Route to add a new source
router.post('/', sourceController.addSource);

// Route to find a source by URL
router.get('/find', sourceController.findSourceByUrl);

// Route to add a like to a source
router.post('/like', sourceController.addLike);

// Route to add a dislike to a source
router.post('/dislike', sourceController.addDislike);

// Route to update a source
router.put('/:id', sourceController.updateSource);

// Route to remove a source
router.delete('/:id', sourceController.removeSource);

router.post('/search-batch', sourceController.searchBatch)

module.exports = router;
