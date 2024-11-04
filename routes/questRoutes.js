// routes/questRoutes.js
const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');

// Routes for quests
router.get('/', questController.getQuests);      // Get all quests
router.post('/', questController.addQuest);      // Add a new quest
router.put('/:id', questController.updateQuest); // Update a quest
router.delete('/:id', questController.removeQuest); // Remove a quest

// Route to check if a quest exists by unique_code
router.get('/check/:unique_code', questController.checkQuestExists);

module.exports = router;
