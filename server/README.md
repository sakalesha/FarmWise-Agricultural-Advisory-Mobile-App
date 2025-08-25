# FarmWise Backend API

A comprehensive RESTful backend API for the FarmWise Agricultural Advisory Application, built with Node.js, Express.js, and MongoDB.

## Features

- **Multi-language Support**: English, Hindi, and Kannada
- **Comprehensive Agricultural Data**: Crops, problems, advice, and seasonal guidance
- **Advanced Search**: Full-text search across all content
- **Security**: Rate limiting, CORS, input validation, and JWT authentication
- **Performance**: Optimized queries with proper indexing
- **Scalability**: Designed for high concurrent usage

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, Rate Limiting, JWT
- **Validation**: Joi
- **Logging**: Morgan
- **Compression**: gzip compression

## Installation

1. **Clone and navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/farmwise
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

6. **Start the server**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Health Check
- `GET /health` - API health status

### Crops
- `GET /api/crops` - List all crops with pagination
- `GET /api/crops/categories` - Get crop categories with counts
- `GET /api/crops/:cropId` - Get detailed crop information
- `GET /api/crops/:cropId/advice` - Get all advice for a specific crop

### Topics/Problems
- `GET /api/topics` - List all problem categories
- `GET /api/topics/categories` - Get topic categories with counts
- `GET /api/topics/:topicId` - Get detailed topic information
- `GET /api/topics/:topicId/crops` - Get crops affected by a topic
- `GET /api/topics/:topicId/severity-stats` - Get severity statistics

### Advice
- `GET /api/advice/:cropId/:topicId` - Get advice for crop-topic combination
- `GET /api/advice/:adviceId` - Get advice by ID
- `GET /api/advice/seasonal/:month` - Get seasonal advice for a month
- `POST /api/advice/:adviceId/rate` - Rate an advice entry

### Search
- `GET /api/search?q={query}&language={lang}&category={cat}` - Full-text search
- `GET /api/search/suggestions?q={query}` - Get search suggestions

### Calendar
- `GET /api/calendar` - Get 12-month agricultural calendar
- `GET /api/calendar/:month` - Get detailed month guidance
- `GET /api/calendar/current/guidance` - Get current month's guidance
- `GET /api/calendar/alerts/current` - Get current pest/disease alerts

### Users (Optional)
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/preferences` - Update user preferences (auth required)
- `POST /api/users/bookmark/:adviceId` - Bookmark advice (auth required)
- `GET /api/users/bookmarks` - Get user bookmarks (auth required)

## Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 50)
- `sort`: Sort field (name, created_at, view_count, rating)
- `order`: Sort order (asc, desc)

### Language Support
- `language`: Response language (english, hindi, kannada)

### Search
- `q`: Search query
- `category`: Search category (all, crops, problems, seasonal)

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {...},
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 50,
    "items_per_page": 10
  },
  "message": "Optional message"
}
```

## Error Handling

Errors return appropriate HTTP status codes with descriptive messages:

```json
{
  "success": false,
  "message": "Error description",
  "details": ["Validation error details"]
}
```

## Database Schema

### Collections

1. **crops**: Crop information with multi-language names and descriptions
2. **topics**: Problem/topic categories with icons and themes
3. **advice**: Detailed agricultural advice with action steps and prevention tips
4. **calendar**: Monthly seasonal guidance and alerts
5. **users**: User profiles and preferences (optional)

### Indexes

- Text indexes for full-text search on crops and advice
- Compound indexes for efficient querying
- Single field indexes for common query patterns

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable allowed origins
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation
- **JWT Authentication**: For user-specific features
- **Error Sanitization**: No sensitive data in error responses

## Performance Optimizations

- **Database Indexing**: Optimized for common query patterns
- **Compression**: gzip compression for responses
- **Pagination**: Efficient data loading
- **Caching Headers**: Appropriate cache control
- **Connection Pooling**: MongoDB connection optimization

## Development

### Scripts
- `npm run dev` - Start with nodemon for development
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests (when implemented)

### Adding New Data

1. **Crops**: Add to `scripts/seedDatabase.js` crops array
2. **Topics**: Add to topics array with proper categorization
3. **Advice**: Link crops and topics with detailed multilingual advice
4. **Calendar**: Add monthly guidance for all 12 months

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/farmwise |
| JWT_SECRET | JWT signing secret | Required |
| JWT_EXPIRE | JWT expiration time | 7d |
| ALLOWED_ORIGINS | CORS allowed origins | localhost:3000,localhost:5173 |
| RATE_LIMIT_WINDOW_MS | Rate limit window | 900000 (15 min) |
| RATE_LIMIT_MAX_REQUESTS | Max requests per window | 100 |

## Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure proper `MONGODB_URI`
4. Set appropriate `ALLOWED_ORIGINS`
5. Configure reverse proxy (nginx)
6. Set up SSL/TLS certificates
7. Configure logging and monitoring
8. Set up database backups

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Monitoring and Logging

- **Request Logging**: Morgan middleware for HTTP request logs
- **Error Logging**: Console error logging with stack traces in development
- **Performance Monitoring**: Request timing and database query optimization
- **Health Checks**: `/health` endpoint for monitoring systems

## Contributing

1. Follow existing code structure and naming conventions
2. Add proper validation for new endpoints
3. Include multi-language support for user-facing content
4. Update documentation for new features
5. Test thoroughly before deployment

## License

MIT License - see LICENSE file for details