const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');

// @route   GET /api/calendar
// @desc    Get 12-month agricultural calendar
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { language = 'english' } = req.query;
    
    const calendar = await Calendar.find({})
      .select('-__v')
      .sort({ month: 1 });
    
    // Transform data for frontend consumption
    const monthlyData = calendar.reduce((acc, month) => {
      acc[month.month] = {
        weather: month.weather[language] || month.weather.english,
        activities: month.activities[language] || month.activities.english,
        alerts: month.alerts[language] || month.alerts.english,
        irrigation: month.irrigation[language] || month.irrigation.english,
        temperature_range: month.temperature_range,
        rainfall: month.rainfall,
        featured_crops: month.featured_crops,
        pest_disease_alerts: month.pest_disease_alerts.map(alert => ({
          name: alert.name[language] || alert.name.english,
          affected_crops: alert.affected_crops,
          severity: alert.severity,
          prevention_tips: alert.prevention_tips[language] || alert.prevention_tips.english
        })),
        market_trends: month.market_trends
      };
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: monthlyData,
      language
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching calendar data',
      error: error.message
    });
  }
});

// @route   GET /api/calendar/:month
// @desc    Get detailed month-wise guidance
// @access  Public
router.get('/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const { language = 'english' } = req.query;
    
    const monthData = await Calendar.findOne({ 
      month: month.toLowerCase() 
    }).select('-__v');
    
    if (!monthData) {
      return res.status(404).json({
        success: false,
        message: 'Month data not found'
      });
    }
    
    // Transform for specific language
    const response = {
      month: monthData.month,
      weather: monthData.weather[language] || monthData.weather.english,
      temperature_range: monthData.temperature_range,
      rainfall: monthData.rainfall,
      activities: monthData.activities[language] || monthData.activities.english,
      alerts: monthData.alerts[language] || monthData.alerts.english,
      irrigation: monthData.irrigation[language] || monthData.irrigation.english,
      featured_crops: monthData.featured_crops.map(crop => ({
        crop_id: crop.crop_id,
        activity: crop.activity[language] || crop.activity.english,
        priority: crop.priority
      })),
      pest_disease_alerts: monthData.pest_disease_alerts.map(alert => ({
        name: alert.name[language] || alert.name.english,
        affected_crops: alert.affected_crops,
        severity: alert.severity,
        prevention_tips: alert.prevention_tips[language] || alert.prevention_tips.english
      })),
      market_trends: monthData.market_trends
    };
    
    res.json({
      success: true,
      data: response,
      language
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching month data',
      error: error.message
    });
  }
});

// @route   GET /api/calendar/current/guidance
// @desc    Get current month's guidance
// @access  Public
router.get('/current/guidance', async (req, res) => {
  try {
    const { language = 'english' } = req.query;
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    
    const monthData = await Calendar.findOne({ month: currentMonth });
    
    if (!monthData) {
      return res.status(404).json({
        success: false,
        message: 'Current month data not found'
      });
    }
    
    // Get relevant advice for current month
    const Advice = require('../models/Advice');
    const seasonalAdvice = await Advice.find({
      seasonal_relevance: currentMonth,
      featured: true
    })
    .select('id crop problem severity advice rating')
    .limit(5)
    .sort({ rating: -1 });
    
    res.json({
      success: true,
      data: {
        month: currentMonth,
        weather: monthData.weather[language] || monthData.weather.english,
        key_activities: (monthData.activities[language] || monthData.activities.english).slice(0, 3),
        urgent_alerts: (monthData.alerts[language] || monthData.alerts.english).slice(0, 2),
        irrigation_advice: monthData.irrigation[language] || monthData.irrigation.english,
        featured_advice: seasonalAdvice
      },
      language
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching current guidance',
      error: error.message
    });
  }
});

// @route   GET /api/calendar/alerts/current
// @desc    Get current pest and disease alerts
// @access  Public
router.get('/alerts/current', async (req, res) => {
  try {
    const { language = 'english' } = req.query;
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    
    const monthData = await Calendar.findOne({ month: currentMonth });
    
    if (!monthData) {
      return res.json({
        success: true,
        data: [],
        message: 'No alerts for current month'
      });
    }
    
    const alerts = monthData.pest_disease_alerts
      .filter(alert => alert.severity === 'high' || alert.severity === 'medium')
      .map(alert => ({
        name: alert.name[language] || alert.name.english,
        affected_crops: alert.affected_crops,
        severity: alert.severity,
        prevention_tips: alert.prevention_tips[language] || alert.prevention_tips.english
      }));
    
    res.json({
      success: true,
      data: alerts,
      month: currentMonth,
      language
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching current alerts',
      error: error.message
    });
  }
});

module.exports = router;