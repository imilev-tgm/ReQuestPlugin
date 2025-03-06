const mongoose = require('mongoose');

const subItemSchema = new mongoose.Schema({
  subquestion: { type: String, required: true },
  urls: [{ type: String }], // Array of URLs for this subitem
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title for the question
  subitems: [subItemSchema], // Array of subitems for this question
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
  title: { type: String, required: true }, // Main title of the quest
  mainQuestion: { type: String, required: true }, // Main question of the quest
  description: { type: String, required: true }, // Description of the quest
  questions: [questionSchema], // Array of questions with subitems
  sources: [
    {
      source_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
      rating: { type: Number },
    },
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