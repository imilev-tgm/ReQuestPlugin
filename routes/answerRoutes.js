// routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, answerController.submitAnswer);
router.get('/user', authMiddleware, answerController.getUserAnswers);
router.get('/quest/:quest_id', answerController.getQuestAnswers);
router.put('/:id', authMiddleware, answerController.updateAnswer);
router.delete('/:id', authMiddleware, answerController.deleteAnswer);

module.exports = router;