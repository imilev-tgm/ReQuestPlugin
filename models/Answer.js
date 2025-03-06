const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  quest_id: { 
    type: String,  // Using String for referencing `unique_code`
    ref: 'Quest',  
    required: true 
  },
  answers: [{
    questionTitle: { type: String, required: true },
    subquestion: { type: String, required: true },
    userAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    urls: [{ type: String, required: true }]  // Changed url to an array of strings
  }],
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
