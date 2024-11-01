const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  questcounter: { type: Number, default: 0 },
  likes: [
    {
      quest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }
    }
  ],
  dislikes: [
    {
      quest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
