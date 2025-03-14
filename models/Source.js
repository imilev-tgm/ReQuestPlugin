const mongoose = require('mongoose');
const { Schema } = mongoose;

const sourceSchema = new Schema({
  url: { type: String, required: true }, // Original Source URL
  normalizedUrl: { type: String, required: true, unique: true }, // Normalized URL
  likes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      created_at: { type: Date, default: Date.now }
    }
  ],
  dislikes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      created_at: { type: Date, default: Date.now }
    }
  ],
  created_at: { type: Date, default: Date.now } // Creation date
});

// Middleware to normalize the URL before saving
sourceSchema.pre('save', function (next) {
  this.normalizedUrl = normalizeUrl(this.url);
  next();
});

// Utility function to normalize a URL
function normalizeUrl(url) {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, '') // Remove protocol and "www."
    .replace(/\/$/, ''); // Remove trailing slash
}

module.exports = mongoose.model('Source', sourceSchema);
