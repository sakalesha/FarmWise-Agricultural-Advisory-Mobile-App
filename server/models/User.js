const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  preferred_language: {
    type: String,
    enum: ['english', 'hindi', 'kannada'],
    default: 'english'
  },
  location: {
    state: String,
    district: String,
    village: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  farm_details: {
    size_acres: Number,
    soil_type: String,
    irrigation_type: String,
    primary_crops: [String]
  },
  preferences: {
    favorite_crops: [String],
    notification_settings: {
      seasonal_alerts: { type: Boolean, default: true },
      pest_alerts: { type: Boolean, default: true },
      weather_updates: { type: Boolean, default: true },
      market_prices: { type: Boolean, default: false }
    }
  },
  activity: {
    last_login: Date,
    total_sessions: { type: Number, default: 0 },
    viewed_advice: [String],
    bookmarked_advice: [String],
    search_history: [{
      query: String,
      timestamp: { type: Date, default: Date.now }
    }]
  },
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    expires_at: Date,
    features: [String]
  }
}, {
  timestamps: true
});

// Hash phone number for privacy (optional)
userSchema.pre('save', async function(next) {
  if (!this.isModified('phone')) return next();
  
  // In production, consider hashing phone numbers for privacy
  // this.phone = await bcrypt.hash(this.phone, 12);
  next();
});

// Static method to update user activity
userSchema.statics.updateActivity = function(userId, activityData) {
  return this.findByIdAndUpdate(
    userId,
    {
      $set: { 'activity.last_login': new Date() },
      $inc: { 'activity.total_sessions': 1 },
      ...activityData
    },
    { new: true }
  );
};

module.exports = mongoose.model('User', userSchema);