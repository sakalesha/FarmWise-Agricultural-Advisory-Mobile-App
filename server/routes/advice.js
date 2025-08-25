const express = require('express');
const router = express.Router();
const Advice = require('../models/Advice');
const Crop = require('../models/Crop');
const Topic = require('../models/Topic');
const { optionalAuth } = require('../middleware/auth');

// @route   GET /api/advice/:cropId/:topicId
// @desc    Get detailed advisory information for crop-topic combination
// @access  Public
router.get('/:cropId/:topicId', optionalAuth, async (req, res) => {
  try {
    const { cropId, topicId } = req.params;
    
    const advice = await Advice.findOne({ 
      crop_id: cropId, 
      topic_id: topicId 
    }).select('-__v');
    
    if (!advice) {
      return res.status(404).json({
        success: false,
        message: 'Advice not found for this crop-topic combination'
      });
    }
    
    // Get related advice
    const relatedAdvice = await Advice.find({
      $or: [
        { crop_id: cropId, topic_id: { $ne: topicId } },
        { topic_id: topicId, crop_id: { $ne: cropId } }
      ]
    })
    .select('id crop crop_id problem topic_id severity rating')
    .limit(5)
    .sort({ rating: -1, view_count: -1 });
    
    // Increment view count
    await Advice.incrementViewCount(advice.id);
    
    // Update user activity if authenticated
    if (req.user) {
      req.user.activity.viewed_advice.push(advice.id);
      await req.user.save();
    }
    
    res.json({
      success: true,
      data: {
        advice,
        related_advice: relatedAdvice
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching advice details',
      error: error.message
    });
  }
});

// @route   GET /api/advice/:adviceId
// @desc    Get advice by ID
// @access  Public
router.get('/:adviceId', optionalAuth, async (req, res) => {
  try {
    const { adviceId } = req.params;
    
    const advice = await Advice.findOne({ id: adviceId }).select('-__v');
    
    if (!advice) {
      return res.status(404).json({
        success: false,
        message: 'Advice not found'
      });
    }
    
    // Get crop and topic details
    const [crop, topic] = await Promise.all([
      Crop.findOne({ id: advice.crop_id }).select('name emoji category'),
      Topic.findOne({ id: advice.topic_id }).select('name icon theme')
    ]);
    
    // Increment view count
    await Advice.incrementViewCount(adviceId);
    
    res.json({
      success: true,
      data: {
        advice,
        crop,
        topic
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching advice',
      error: error.message
    });
  }
});

// @route   GET /api/advice/seasonal/:month
// @desc    Get seasonal advice for a specific month
// @access  Public
router.get('/seasonal/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const { limit = 10 } = req.query;
    
    const seasonalAdvice = await Advice.find({
      seasonal_relevance: month.toLowerCase()
    })
    .select('id crop crop_id problem topic_id severity effect advice rating')
    .sort({ featured: -1, rating: -1, view_count: -1 })
    .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: seasonalAdvice,
      month: month.toLowerCase()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching seasonal advice',
      error: error.message
    });
  }
});

// @route   POST /api/advice/:adviceId/rate
// @desc    Rate an advice entry
// @access  Private
router.post('/:adviceId/rate', optionalAuth, async (req, res) => {
  try {
    const { adviceId } = req.params;
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const advice = await Advice.updateRating(adviceId, rating);
    
    if (!advice) {
      return res.status(404).json({
        success: false,
        message: 'Advice not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: {
        average_rating: advice.rating.average,
        total_ratings: advice.rating.count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting rating',
      error: error.message
    });
  }
});

module.exports = router;