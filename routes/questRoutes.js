const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes (no authentication needed)
router.get('/code/:code', questController.getQuestByCode);
router.get('/', questController.getQuests);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/', questController.addQuest);

// Admin-only routes
router.put('/:id', adminMiddleware, questController.updateQuest);
router.delete('/:id', adminMiddleware, questController.removeQuest);

module.exports = router;