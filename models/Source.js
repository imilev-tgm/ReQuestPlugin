const mongoose = require('mongoose');
const { Schema } = mongoose;

const sourceSchema = new Schema({
  url: { type: String, required: true }, // Source URL
  title: { type: String, required: true }, // Title of the source
  avgRating: { type: Number, default: 0 }, // Average rating for the source
  evaluations: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
      rating: { type: Number, required: true }, // Rating given by the user
      comment: { type: String }, // User's comment on the source
      created_at: { type: Date, default: Date.now } // Date of the evaluation
    }
  ],
  created_at: { type: Date, default: Date.now } // Creation date
});

// Middleware to update the created_at field on save
sourceSchema.pre('save', function (next) {
  this.created_at = Date.now();
  next();
});

module.exports = mongoose.model('Source', sourceSchema);
