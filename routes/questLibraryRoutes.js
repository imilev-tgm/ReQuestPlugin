const express = require('express');
const router = express.Router();
const questLibraryController = require('../controllers/questLibraryController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', questLibraryController.getQuestLibrary);
router.post('/', authMiddleware, adminMiddleware, questLibraryController.addQuestToLibrary);

module.exports = router; // ✅ Correct export