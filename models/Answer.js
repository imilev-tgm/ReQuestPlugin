const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  quest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest', required: true }, // Reference to the Quest
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  answers: [
    {
      question: { type: String, required: true }, // Question being answered
      response: { type: String, required: true }  // User's answer
    }
  ],
  submitted_at: { type: Date, default: Date.now } // Submission date
});

module.exports = mongoose.model('Answer', answerSchema);
