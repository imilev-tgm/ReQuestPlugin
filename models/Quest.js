const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
});

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Boolean, default: false },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
});

const questSchema = new mongoose.Schema({
  unique_code: { type: String, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
  sources: [
    {
      source_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
      rating: { type: Number },
    }
  ],
  ratings: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Quest = mongoose.model('Quest', questSchema);
module.exports = Quest;
