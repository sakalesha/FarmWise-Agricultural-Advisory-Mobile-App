const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    english: { type: String, required: true },
    hindi: { type: String, required: true },
    kannada: { type: String, required: true }
  },
  emoji: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetables', 'grains', 'cash_crops', 'fruits', 'spices', 'pulses'],
    index: true
  },
  description: {
    english: String,
    hindi: String,
    kannada: String
  },
  growing_seasons: [{
    type: String,
    enum: ['kharif', 'rabi', 'zaid', 'perennial']
  }],
  climate_zones: [String],
  soil_types: [String],
  topics: {
    type: Number,
    default: 0
  },
  view_count: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  metadata: {
    scientific_name: String,
    family: String,
    origin: String,
    nutritional_value: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting advice count
cropSchema.virtual('advice_count', {
  ref: 'Advice',
  localField: 'id',
  foreignField: 'crop_id',
  count: true
});

// Update topics count before saving
cropSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('id')) {
    const Advice = mongoose.model('Advice');
    this.topics = await Advice.countDocuments({ crop_id: this.id });
  }
  next();
});

// Static method to increment view count
cropSchema.statics.incrementViewCount = function(cropId) {
  return this.findOneAndUpdate(
    { id: cropId },
    { $inc: { view_count: 1 } },
    { new: true }
  );
};

module.exports = mongoose.model('Crop', cropSchema);