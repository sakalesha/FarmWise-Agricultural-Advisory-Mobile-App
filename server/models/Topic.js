const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
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
  icon: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true,
    enum: ['blue', 'orange', 'red', 'yellow', 'purple', 'brown', 'green']
  },
  category: {
    type: String,
    required: true,
    enum: ['pest_management', 'disease_control', 'water_management', 'nutrient_management', 'soil_health', 'climate_stress'],
    index: true
  },
  description: {
    english: String,
    hindi: String,
    kannada: String
  },
  affected_crops: {
    type: Number,
    default: 0
  },
  severity_distribution: {
    low: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    high: { type: Number, default: 0 }
  },
  seasonal_peak: [String], // months when this problem is most common
  prevention_priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting affected crops list
topicSchema.virtual('crops', {
  ref: 'Advice',
  localField: 'id',
  foreignField: 'topic_id'
});

// Update affected crops count before saving
topicSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('id')) {
    const Advice = mongoose.model('Advice');
    this.affected_crops = await Advice.distinct('crop_id', { topic_id: this.id }).then(crops => crops.length);
  }
  next();
});

module.exports = mongoose.model('Topic', topicSchema);