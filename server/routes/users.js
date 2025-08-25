const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, optionalAuth } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { phone, name, preferred_language, location, farm_details } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this phone number'
      });
    }
    
    // Create new user
    const user = new User({
      phone,
      name,
      preferred_language: preferred_language || 'english',
      location,
      farm_details
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          preferred_language: user.preferred_language,
          location: user.location
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }
    
    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update last login
    await User.updateActivity(user._id, {
      'activity.last_login': new Date()
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          preferred_language: user.preferred_language,
          location: user.location,
          farm_details: user.farm_details
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-__v')
      .populate('preferences.favorite_crops', 'name emoji');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, validateRequest(schemas.userPreferences), async (req, res) => {
  try {
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { preferences: { ...req.user.preferences, ...updates } } },
      { new: true, runValidators: true }
    ).select('-__v');
    
    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: user.preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating preferences',
      error: error.message
    });
  }
});

// @route   POST /api/users/bookmark/:adviceId
// @desc    Bookmark advice
// @access  Private
router.post('/bookmark/:adviceId', auth, async (req, res) => {
  try {
    const { adviceId } = req.params;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { 'activity.bookmarked_advice': adviceId } },
      { new: true }
    );
    
    res.json({
      success: true,
      message: 'Advice bookmarked successfully',
      data: {
        bookmarked_count: user.activity.bookmarked_advice.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error bookmarking advice',
      error: error.message
    });
  }
});

// @route   DELETE /api/users/bookmark/:adviceId
// @desc    Remove bookmark
// @access  Private
router.delete('/bookmark/:adviceId', auth, async (req, res) => {
  try {
    const { adviceId } = req.params;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { 'activity.bookmarked_advice': adviceId } },
      { new: true }
    );
    
    res.json({
      success: true,
      message: 'Bookmark removed successfully',
      data: {
        bookmarked_count: user.activity.bookmarked_advice.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing bookmark',
      error: error.message
    });
  }
});

// @route   GET /api/users/bookmarks
// @desc    Get user bookmarks
// @access  Private
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const Advice = require('../models/Advice');
    
    const bookmarkedAdvice = await Advice.find({
      id: { $in: user.activity.bookmarked_advice }
    })
    .select('id crop problem severity advice rating')
    .sort({ updatedAt: -1 });
    
    res.json({
      success: true,
      data: bookmarkedAdvice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookmarks',
      error: error.message
    });
  }
});

module.exports = router;