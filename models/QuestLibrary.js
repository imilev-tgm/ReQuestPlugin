const mongoose = require('mongoose');
const { Schema } = mongoose;

const questLibrarySchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  quest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest', required: true }, // Reference to the Quest
  created_at: { type: Date, default: Date.now }, // Creation date
  updated_at: { type: Date, default: Date.now }  // Update date
});

// Middleware to update the updated_at field on save
questLibrarySchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('QuestLibrary', questLibrarySchema);
