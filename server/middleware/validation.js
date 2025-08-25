const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Query validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Common validation schemas
const schemas = {
  searchQuery: Joi.object({
    q: Joi.string().min(1).max(100).required(),
    language: Joi.string().valid('english', 'hindi', 'kannada').default('english'),
    category: Joi.string().valid('crops', 'problems', 'seasonal', 'all').default('all'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10)
  }),
  
  userPreferences: Joi.object({
    preferred_language: Joi.string().valid('english', 'hindi', 'kannada'),
    favorite_crops: Joi.array().items(Joi.string()),
    notification_settings: Joi.object({
      seasonal_alerts: Joi.boolean(),
      pest_alerts: Joi.boolean(),
      weather_updates: Joi.boolean(),
      market_prices: Joi.boolean()
    })
  }),
  
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    sort: Joi.string().valid('name', 'created_at', 'view_count', 'rating').default('name'),
    order: Joi.string().valid('asc', 'desc').default('asc')
  })
};

module.exports = { validateRequest, validateQuery, schemas };