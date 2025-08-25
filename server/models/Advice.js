const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  crop: {
    type: String,
    required: true
  },
  crop_id: {
    type: String,
    required: true,
    ref: 'Crop',
    index: true
  },
  problem: {
    type: String,
    required: true
  },
  topic_id: {
    type: String,
    required: true,
    ref: 'Topic',
    index: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ['pest_management', 'disease_control', 'water_management', 'nutrient_management', 'soil_health', 'climate_stress'],
    index: true
  },
  effect: {
    english: { type: String, required: true },
    hindi: { type: String, required: true },
    kannada: { type: String, required: true }
  },
  advice: {
    english: { type: String, required: true },
    hindi: { type: String, required: true },
    kannada: { type: String, required: true }
  },
  action_steps: {
    english: [{ type: String, required: true }],
    hindi: [{ type: String, required: true }],
    kannada: [{ type: String, required: true }]
  },
  prevention_tips: {
    english: [{ type: String, required: true }],
    hindi: [{ type: String, required: true }],
    kannada: [{ type: String, required: true }]
  },
  scientific_explanation: {
    type: String,
    required: true
  },
  seasonal_relevance: [{
    type: String,
    enum: ['january', 'february', 'march', 'april', 'may', 'june', 
           'july', 'august', 'september', 'october', 'november', 'december'],
    index: true
  }],
  related_topics: [String],
  economic_impact: {
    yield_loss_percentage: { type: Number, min: 0, max: 100 },
    cost_of_treatment: String,
    prevention_cost: String
  },
  view_count: {
    type: Number,
    default: 0
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes for efficient querying
adviceSchema.index({ crop_id: 1, topic_id: 1 });
adviceSchema.index({ severity: 1, category: 1 });
adviceSchema.index({ seasonal_relevance: 1, featured: 1 });

// Static method to increment view count
adviceSchema.statics.incrementViewCount = function(adviceId) {
  return this.findOneAndUpdate(
    { id: adviceId },
    { $inc: { view_count: 1 } },
    { new: true }
  );
};

// Static method to update rating
adviceSchema.statics.updateRating = function(adviceId, newRating) {
  return this.findOneAndUpdate(
    { id: adviceId },
    {
      $inc: { 'rating.count': 1 },
      $push: { ratings: newRating }
    },
    { new: true }
  ).then(advice => {
    if (advice) {
      // Recalculate average rating
      const totalRating = advice.ratings.reduce((sum, rating) => sum + rating, 0);
      advice.rating.average = totalRating / advice.ratings.length;
      return advice.save();
    }
    return advice;
  });
};

module.exports = mongoose.model('Advice', adviceSchema);