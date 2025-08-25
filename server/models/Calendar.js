const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true,
    enum: ['january', 'february', 'march', 'april', 'may', 'june',
           'july', 'august', 'september', 'october', 'november', 'december'],
    index: true
  },
  weather: {
    english: { type: String, required: true },
    hindi: { type: String, required: true },
    kannada: { type: String, required: true }
  },
  temperature_range: {
    min: Number,
    max: Number,
    unit: { type: String, default: 'celsius' }
  },
  rainfall: {
    average: Number,
    unit: { type: String, default: 'mm' }
  },
  activities: {
    english: [{ type: String, required: true }],
    hindi: [{ type: String, required: true }],
    kannada: [{ type: String, required: true }]
  },
  alerts: {
    english: [{ type: String, required: true }],
    hindi: [{ type: String, required: true }],
    kannada: [{ type: String, required: true }]
  },
  irrigation: {
    english: { type: String, required: true },
    hindi: { type: String, required: true },
    kannada: { type: String, required: true }
  },
  featured_crops: [{
    crop_id: String,
    activity: {
      english: String,
      hindi: String,
      kannada: String
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }],
  pest_disease_alerts: [{
    name: {
      english: String,
      hindi: String,
      kannada: String
    },
    affected_crops: [String],
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    prevention_tips: {
      english: [String],
      hindi: [String],
      kannada: [String]
    }
  }],
  market_trends: {
    high_demand_crops: [String],
    price_predictions: [{
      crop_id: String,
      trend: {
        type: String,
        enum: ['rising', 'stable', 'falling']
      },
      confidence: {
        type: String,
        enum: ['low', 'medium', 'high']
      }
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Calendar', calendarSchema);