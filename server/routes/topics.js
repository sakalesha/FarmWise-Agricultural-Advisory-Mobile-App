const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Advice = require('../models/Advice');
const { validateQuery, schemas } = require('../middleware/validation');

// @route   GET /api/topics
// @desc    Get all advisory topic categories with icons and descriptions
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
    
    const topics = await Topic.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await Topic.countDocuments(query);
    
    res.json({
      success: true,
      data: topics,
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
      message: 'Error fetching topics',
      error: error.message
    });
  }
});

// @route   GET /api/topics/categories
// @desc    Get topic categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Topic.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          topics: { 
            $push: { 
              id: '$id', 
              name: '$name', 
              icon: '$icon',
              theme: '$theme',
              affected_crops: '$affected_crops'
            } 
          }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          topics: 1,
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
      message: 'Error fetching topic categories',
      error: error.message
    });
  }
});

// @route   GET /api/topics/:topicId
// @desc    Get detailed topic information
// @access  Public
router.get('/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params;
    
    const topic = await Topic.findOne({ id: topicId }).select('-__v');
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }
    
    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching topic details',
      error: error.message
    });
  }
});

// @route   GET /api/topics/:topicId/crops
// @desc    Get all crops affected by a specific topic/problem
// @access  Public
router.get('/:topicId/crops', validateQuery(schemas.pagination), async (req, res) => {
  try {
    const { topicId } = req.params;
    const { page, limit, severity } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = { topic_id: topicId };
    if (severity) query.severity = severity;
    
    const advice = await Advice.find(query)
      .select('crop crop_id severity effect advice rating view_count')
      .sort({ severity: -1, view_count: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get unique crops
    const cropIds = [...new Set(advice.map(a => a.crop_id))];
    const Crop = require('../models/Crop');
    const crops = await Crop.find({ id: { $in: cropIds } })
      .select('id name emoji category');
    
    // Combine crop info with advice
    const result = advice.map(adv => {
      const crop = crops.find(c => c.id === adv.crop_id);
      return {
        ...adv.toObject(),
        crop_details: crop
      };
    });
    
    const total = await Advice.countDocuments(query);
    
    res.json({
      success: true,
      data: result,
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
      message: 'Error fetching crops for topic',
      error: error.message
    });
  }
});

// @route   GET /api/topics/:topicId/severity-stats
// @desc    Get severity distribution for a topic
// @access  Public
router.get('/:topicId/severity-stats', async (req, res) => {
  try {
    const { topicId } = req.params;
    
    const stats = await Advice.aggregate([
      { $match: { topic_id: topicId } },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 },
          avg_rating: { $avg: '$rating.average' },
          total_views: { $sum: '$view_count' }
        }
      },
      {
        $project: {
          severity: '$_id',
          count: 1,
          avg_rating: { $round: ['$avg_rating', 2] },
          total_views: 1,
          _id: 0
        }
      }
    ]);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching severity statistics',
      error: error.message
    });
  }
});

module.exports = router;