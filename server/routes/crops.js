const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const Advice = require('../models/Advice');
const { optionalAuth } = require('../middleware/auth');
const { validateQuery, schemas } = require('../middleware/validation');

// @route   GET /api/crops
// @desc    Get all crops with metadata and topic counts
// @access  Public
router.get('/', validateQuery(schemas.pagination), async (req, res) => {
  try {
    const { page, limit, sort, order, category } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    const crops = await Crop.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await Crop.countDocuments(query);
    
    res.json({
      success: true,
      data: crops,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching crops',
      error: error.message
    });
  }
});

// @route   GET /api/crops/categories
// @desc    Get crop categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Crop.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          crops: { $push: { id: '$id', name: '$name', emoji: '$emoji' } }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          sample_crops: { $slice: ['$crops', 3] },
          _id: 0
        }
      }
    ]);
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching crop categories',
      error: error.message
    });
  }
});

// @route   GET /api/crops/:cropId
// @desc    Get detailed crop info with available advisory topics
// @access  Public
router.get('/:cropId', optionalAuth, async (req, res) => {
  try {
    const { cropId } = req.params;
    
    const crop = await Crop.findOne({ id: cropId }).select('-__v');
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }
    
    // Get related advice topics
    const adviceTopics = await Advice.find({ crop_id: cropId })
      .select('id topic_id problem severity category view_count rating')
      .populate('topic_id', 'name icon theme')
      .sort({ severity: -1, view_count: -1 });
    
    // Increment view count if user is authenticated
    if (req.user) {
      await Crop.incrementViewCount(cropId);
    }
    
    res.json({
      success: true,
      data: {
        crop,
        advice_topics: adviceTopics,
        total_topics: adviceTopics.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching crop details',
      error: error.message
    });
  }
});

// @route   GET /api/crops/:cropId/advice
// @desc    Get all advice for a specific crop
// @access  Public
router.get('/:cropId/advice', validateQuery(schemas.pagination), async (req, res) => {
  try {
    const { cropId } = req.params;
    const { page, limit, severity, category } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = { crop_id: cropId };
    if (severity) query.severity = severity;
    if (category) query.category = category;
    
    const advice = await Advice.find(query)
      .select('-scientific_explanation -__v')
      .sort({ severity: -1, view_count: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Advice.countDocuments(query);
    
    res.json({
      success: true,
      data: advice,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching crop advice',
      error: error.message
    });
  }
});

module.exports = router;