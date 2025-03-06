// routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
console.log(answerController); // Should show { submitAnswer: [Function], ... }

router.post('/', answerController.submitAnswer);
router.get('/user/:user_id', answerController.getUserAnswers);
router.get('/quest/:quest_id', answerController.getQuestAnswers);
router.put('/:id', answerController.updateAnswer);
router.delete('/:id', answerController.deleteAnswer);

module.exports = router;