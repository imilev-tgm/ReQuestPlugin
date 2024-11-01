const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

// Route to get all answers
router.get('/', answerController.getAllAnswers);

// Route to add a new answer
router.post('/', answerController.addAnswer);


router.put('/:id', answerController.updateAnswer);

// Route to add a new answer
router.delete('/:id', answerController.removeAnswer);


module.exports = router;
