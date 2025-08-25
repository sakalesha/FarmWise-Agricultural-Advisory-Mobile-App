const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const Advice = require('../models/Advice');
const Topic = require('../models/Topic');
const Calendar = require('../models/Calendar');
const { validateQuery, schemas } = require('../middleware/validation');

// @route   GET /api/search
// @desc    Full-text search across crops, topics, and advisories
// @access  Public
router.get('/', validateQuery(schemas.searchQuery), async (req, res) => {
  try {
    const { q, language, category, page, limit } = req.query;
    const skip = (page - 1) * limit;
    
    let results = [];
    
    // Search crops
    if (category === 'all' || category === 'crops') {
      const cropResults = await searchCrops(q, language, limit);
      results = results.concat(cropResults.map(crop => ({
        type: 'crop',
        id: crop.id,
        title: crop.name[language] || crop.name.english,
        subtitle: `${crop.topics} topics available`,
        category: crop.category,
        emoji: crop.emoji,
        relevance: calculateRelevance(q, crop.name[language] || crop.name.english),
        data: crop
      })));
    }
    
    // Search advice/problems
    if (category === 'all' || category === 'problems') {
      const adviceResults = await searchAdvice(q, language, limit);
      results = results.concat(adviceResults.map(advice => ({
        type: 'advice',
        id: advice.id,
        title: `${advice.crop} - ${advice.problem}`,
        subtitle: truncateText(advice.advice[language] || advice.advice.english, 100),
        category: advice.category,
        severity: advice.severity,
        rating: advice.rating.average,
        relevance: calculateRelevance(q, advice.advice[language] || advice.advice.english),
        data: advice
      })));
    }
    
    // Search seasonal content
    if (category === 'all' || category === 'seasonal') {
      const seasonalResults = await searchSeasonal(q, language, limit);
      results = results.concat(seasonalResults.map(seasonal => ({
        type: 'seasonal',
        id: seasonal.month,
        title: `${seasonal.month.charAt(0).toUpperCase() + seasonal.month.slice(1)} Guidance`,
        subtitle: seasonal.weather[language] || seasonal.weather.english,
        category: 'seasonal',
        relevance: calculateSeasonalRelevance(q, seasonal, language),
        data: seasonal
      })));
    }
    
    // Sort by relevance and paginate
    results.sort((a, b) => b.relevance - a.relevance);
    const paginatedResults = results.slice(skip, skip + parseInt(limit));
    
    res.json({
      success: true,
      data: paginatedResults,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(results.length / limit),
        total_items: results.length,
        items_per_page: parseInt(limit)
      },
      search_meta: {
        query: q,
        language,
        category,
        execution_time: Date.now() - req.start_time
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing search',
      error: error.message
    });
  }
});

// @route   GET /api/search/suggestions
// @desc    Get search suggestions based on partial query
// @access  Public
router.get('/suggestions', async (req, res) => {
  try {
    const { q, language = 'english', limit = 5 } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }
    
    const suggestions = [];
    
    // Crop name suggestions
    const crops = await Crop.find({
      [`name.${language}`]: { $regex: q, $options: 'i' }
    })
    .select(`name.${language} emoji`)
    .limit(parseInt(limit));
    
    crops.forEach(crop => {
      suggestions.push({
        type: 'crop',
        text: crop.name[language],
        emoji: crop.emoji
      });
    });
    
    // Problem/topic suggestions
    const topics = await Topic.find({
      [`name.${language}`]: { $regex: q, $options: 'i' }
    })
    .select(`name.${language} icon`)
    .limit(parseInt(limit));
    
    topics.forEach(topic => {
      suggestions.push({
        type: 'topic',
        text: topic.name[language],
        icon: topic.icon
      });
    });
    
    res.json({
      success: true,
      data: suggestions.slice(0, parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching suggestions',
      error: error.message
    });
  }
});

// Helper functions
async function searchCrops(query, language, limit) {
  return await Crop.find({
    $or: [
      { [`name.${language}`]: { $regex: query, $options: 'i' } },
      { [`description.${language}`]: { $regex: query, $options: 'i' } }
    ]
  })
  .select('-__v')
  .limit(parseInt(limit))
  .sort({ view_count: -1, topics: -1 });
}

async function searchAdvice(query, language, limit) {
  return await Advice.find({
    $or: [
      { [`advice.${language}`]: { $regex: query, $options: 'i' } },
      { [`effect.${language}`]: { $regex: query, $options: 'i' } },
      { crop: { $regex: query, $options: 'i' } },
      { problem: { $regex: query, $options: 'i' } }
    ]
  })
  .select('-scientific_explanation -__v')
  .limit(parseInt(limit))
  .sort({ rating: -1, view_count: -1 });
}

async function searchSeasonal(query, language, limit) {
  return await Calendar.find({
    $or: [
      { [`weather.${language}`]: { $regex: query, $options: 'i' } },
      { [`activities.${language}`]: { $regex: query, $options: 'i' } },
      { [`alerts.${language}`]: { $regex: query, $options: 'i' } }
    ]
  })
  .select('-__v')
  .limit(parseInt(limit));
}

function calculateRelevance(query, text) {
  if (!text) return 0;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match gets highest score
  if (textLower.includes(queryLower)) {
    const position = textLower.indexOf(queryLower);
    return 1.0 - (position / text.length) * 0.3; // Earlier matches score higher
  }
  
  // Word match scoring
  const queryWords = queryLower.split(' ');
  const textWords = textLower.split(' ');
  const matches = queryWords.filter(word => 
    textWords.some(textWord => textWord.includes(word))
  );
  
  return matches.length / queryWords.length * 0.7;
}

function calculateSeasonalRelevance(query, seasonal, language) {
  const relevanceScore = 
    calculateRelevance(query, seasonal.weather[language]) * 0.3 +
    calculateRelevance(query, seasonal.activities[language]?.join(' ')) * 0.4 +
    calculateRelevance(query, seasonal.alerts[language]?.join(' ')) * 0.3;
  
  return relevanceScore;
}

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

module.exports = router;