const express = require('express');
const router = express.Router();
const questLibraryController = require('../controllers/questLibraryController');

// Route to get all quests in a user's library
router.get('/:userId', questLibraryController.getQuestLibrary);

// Route to add a new quest to the library
router.post('/', questLibraryController.addQuestToLibrary);

// Route to update a quest in the library
router.put('/:id', questLibraryController.updateQuestInLibrary);

// Route to remove a quest from the library
router.delete('/:id', questLibraryController.removeQuestFromLibrary);

module.exports = router;
