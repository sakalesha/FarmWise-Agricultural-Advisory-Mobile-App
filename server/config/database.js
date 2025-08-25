const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await createIndexes();
    
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Text indexes for search functionality
    await db.collection('crops').createIndex({
      'name.english': 'text',
      'name.hindi': 'text',
      'name.kannada': 'text',
      'description.english': 'text',
      'description.hindi': 'text',
      'description.kannada': 'text'
    });
    
    await db.collection('advice').createIndex({
      'advice.english': 'text',
      'advice.hindi': 'text',
      'advice.kannada': 'text',
      'effect.english': 'text',
      'effect.hindi': 'text',
      'effect.kannada': 'text'
    });
    
    // Regular indexes for efficient querying
    await db.collection('crops').createIndex({ category: 1 });
    await db.collection('advice').createIndex({ crop_id: 1, topic_id: 1 });
    await db.collection('advice').createIndex({ severity: 1 });
    await db.collection('advice').createIndex({ seasonal_relevance: 1 });
    await db.collection('topics').createIndex({ category: 1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

module.exports = connectDB;