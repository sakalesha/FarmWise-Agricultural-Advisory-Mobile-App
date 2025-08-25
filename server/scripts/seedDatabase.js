const mongoose = require('mongoose');
require('dotenv').config();

const Crop = require('../models/Crop');
const Topic = require('../models/Topic');
const Advice = require('../models/Advice');
const Calendar = require('../models/Calendar');

// Sample data
const crops = [
  {
    id: 'tomato',
    name: { english: 'Tomato', hindi: 'टमाटर', kannada: 'ಟೊಮೆಟೊ' },
    emoji: '🍅',
    category: 'vegetables',
    description: {
      english: 'Popular vegetable crop grown worldwide',
      hindi: 'दुनिया भर में उगाई जाने वाली लोकप्रिय सब्जी फसल',
      kannada: 'ವಿಶ್ವಾದ್ಯಂತ ಬೆಳೆಯುವ ಜನಪ್ರಿಯ ತರಕಾರಿ ಬೆಳೆ'
    },
    growing_seasons: ['kharif', 'rabi'],
    topics: 12
  },
  {
    id: 'rice',
    name: { english: 'Rice', hindi: 'चावल', kannada: 'ಅಕ್ಕಿ' },
    emoji: '🌾',
    category: 'grains',
    description: {
      english: 'Staple food crop for billions of people',
      hindi: 'अरबों लोगों के लिए मुख्य खाद्य फसल',
      kannada: 'ಶತಕೋಟಿ ಜನರಿಗೆ ಮುಖ್ಯ ಆಹಾರ ಬೆಳೆ'
    },
    growing_seasons: ['kharif'],
    topics: 15
  },
  {
    id: 'wheat',
    name: { english: 'Wheat', hindi: 'गेहूं', kannada: 'ಗೋಧಿ' },
    emoji: '🌾',
    category: 'grains',
    description: {
      english: 'Important cereal grain crop',
      hindi: 'महत्वपूर्ण अनाज फसल',
      kannada: 'ಪ್ರಮುಖ ಧಾನ್ಯ ಬೆಳೆ'
    },
    growing_seasons: ['rabi'],
    topics: 18
  }
];

const topics = [
  {
    id: 'water_stress',
    name: { english: 'Water Stress', hindi: 'पानी की कमी', kannada: 'ನೀರಿನ ಕೊರತೆ' },
    icon: '💧',
    theme: 'blue',
    category: 'water_management',
    description: {
      english: 'Insufficient water supply affecting crop growth',
      hindi: 'फसल की वृद्धि को प्रभावित करने वाली अपर्याप्त पानी की आपूर्ति',
      kannada: 'ಬೆಳೆ ಬೆಳವಣಿಗೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಅಸಮರ್ಪಕ ನೀರು ಪೂರೈಕೆ'
    },
    affected_crops: 8
  },
  {
    id: 'pest_problems',
    name: { english: 'Pest Problems', hindi: 'कीट की समस्या', kannada: 'ಕೀಟ ಸಮಸ್ಯೆಗಳು' },
    icon: '🐛',
    theme: 'yellow',
    category: 'pest_management',
    description: {
      english: 'Insect and pest infestations damaging crops',
      hindi: 'फसलों को नुकसान पहुंचाने वाले कीट और कीट संक्रमण',
      kannada: 'ಬೆಳೆಗಳನ್ನು ಹಾನಿಗೊಳಿಸುವ ಕೀಟ ಮತ್ತು ಕೀಟ ಸೋಂಕುಗಳು'
    },
    affected_crops: 9
  }
];

const advice = [
  {
    id: 'tomato_water_stress',
    crop: 'Tomato',
    crop_id: 'tomato',
    problem: 'Water Stress',
    topic_id: 'water_stress',
    severity: 'high',
    category: 'water_management',
    effect: {
      english: 'Causes wilting, attracts whiteflies, aphids, and increases disease risk',
      hindi: 'मुरझाने का कारण बनता है, सफेद मक्खी, एफिड आकर्षित करता है और बीमारी का जोखिम बढ़ाता है',
      kannada: 'ಬಾಡುವಿಕೆಗೆ ಕಾರಣವಾಗುತ್ತದೆ, ಬಿಳಿ ನೊಣಗಳು, ಗಿಡಹೇನುಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ ಮತ್ತು ರೋಗದ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ'
    },
    advice: {
      english: 'Water consistently in early morning to reduce pest risk and maintain plant health',
      hindi: 'कीट के जोखिम को कम करने और पौधे के स्वास्थ्य को बनाए रखने के लिए सुबह जल्दी लगातार पानी दें',
      kannada: 'ಕೀಟಗಳ ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಸಸ್ಯದ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಲು ಬೆಳಿಗ್ಗೆ ಸ್ಥಿರವಾಗಿ ನೀರು ನೀಡಿ'
    },
    action_steps: {
      english: [
        'Check soil moisture daily by inserting finger 2-3 inches deep',
        'Water early morning (6-8 AM) to reduce evaporation',
        'Apply organic mulch around plants to retain moisture',
        'Install drip irrigation if possible for consistent watering'
      ],
      hindi: [
        'मिट्टी की नमी की जांच रोजाना करें, 2-3 इंच गहराई में उंगली डालकर',
        'वाष्पीकरण कम करने के लिए सुबह जल्दी (6-8 बजे) पानी दें',
        'नमी बनाए रखने के लिए पौधों के चारों ओर जैविक मल्च लगाएं',
        'यदि संभव हो तो लगातार पानी देने के लिए ड्रिप सिंचाई स्थापित करें'
      ],
      kannada: [
        'ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪ್ರತಿದಿನ ಪರಿಶೀಲಿಸಿ, ಬೆರಳನ್ನು 2-3 ಇಂಚು ಆಳಕ್ಕೆ ಹಾಕಿ',
        'ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ (6-8 ಗಂಟೆಗೆ) ನೀರು ನೀಡಿ',
        'ತೇವಾಂಶವನ್ನು ಉಳಿಸಲು ಸಸ್ಯಗಳ ಸುತ್ತ ಸಾವಯವ ಮಲ್ಚ್ ಅನ್ನು ಅನ್ವಯಿಸಿ',
        'ಸ್ಥಿರವಾದ ನೀರಾವರಿಗಾಗಿ ಸಾಧ್ಯವಾದರೆ ಡ್ರಿಪ್ ನೀರಾವರಿಯನ್ನು ಸ್ಥಾಪಿಸಿ'
      ]
    },
    prevention_tips: {
      english: [
        'Use drip irrigation for consistent water supply',
        'Monitor soil moisture regularly with simple tools',
        'Mulch around plants to reduce water loss',
        'Plant tomatoes in well-draining soil'
      ],
      hindi: [
        'लगातार पानी की आपूर्ति के लिए ड्रिप सिंचाई का उपयोग करें',
        'सरल उपकरणों से मिट्टी की नमी की नियमित निगरानी करें',
        'पानी की हानि को कम करने के लिए पौधों के चारों ओर मल्च करें',
        'टमाटर को अच्छी जल निकासी वाली मिट्टी में लगाएं'
      ],
      kannada: [
        'ಸ್ಥಿರ ನೀರು ಪೂರೈಕೆಗಾಗಿ ಡ್ರಿಪ್ ನೀರಾವರಿ ಬಳಸಿ',
        'ಸರಳ ಸಾಧನಗಳೊಂದಿಗೆ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
        'ನೀರಿನ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಸಸ್ಯಗಳ ಸುತ್ತ ಮಲ್ಚ್ ಮಾಡಿ',
        'ಉತ್ತಮ ಒಳಚರಂಡಿ ಇರುವ ಮಣ್ಣಿನಲ್ಲಿ ಟೊಮೆಟೊ ನಾಟಿ'
      ]
    },
    scientific_explanation: 'Water stress reduces photosynthetic activity, weakens plant immunity, and creates favorable conditions for pest infestations and fungal diseases.',
    seasonal_relevance: ['march', 'april', 'may'],
    related_topics: ['tomato_heat_stress', 'tomato_nutrient_deficiency']
  }
];

const calendar = [
  {
    month: 'january',
    weather: {
      english: 'Cool and dry',
      hindi: 'ठंडा और शुष्क',
      kannada: 'ತಂಪಾದ ಮತ್ತು ಶುಷ್ಕ'
    },
    temperature_range: { min: 10, max: 25, unit: 'celsius' },
    rainfall: { average: 15, unit: 'mm' },
    activities: {
      english: ['Harvest rabi crops', 'Prepare land for summer crops', 'Prune fruit trees'],
      hindi: ['रबी फसलों की कटाई', 'गर्मियों की फसलों के लिए भूमि तैयार करें', 'फलों के पेड़ों की छंटाई'],
      kannada: ['ರಬಿ ಬೆಳೆಗಳ ಸುಗ್ಗಿ', 'ಬೇಸಿಗೆ ಬೆಳೆಗಳಿಗೆ ಭೂಮಿ ತಯಾರಿಸಿ', 'ಹಣ್ಣಿನ ಮರಗಳ ಕೊಯ್ಲು']
    },
    alerts: {
      english: ['Watch for aphids in wheat', 'Protect vegetables from cold'],
      hindi: ['गेहूं में एफिड्स के लिए सावधान रहें', 'सब्जियों को ठंड से बचाएं'],
      kannada: ['ಗೋಧಿಯಲ್ಲಿ ಗಿಡಹೇನುಗಳಿಗೆ ಗಮನಿಸಿ', 'ತರಕಾರಿಗಳನ್ನು ತಂಪಿನಿಂದ ರಕ್ಷಿಸಿ']
    },
    irrigation: {
      english: 'Reduce watering frequency, water during midday',
      hindi: 'पानी देने की आवृत्ति कम करें, दोपहर में पानी दें',
      kannada: 'ನೀರಾವರಿ ಆವರ್ತನ ಕಡಿಮೆಮಾಡಿ, ಮಧ್ಯಾಹ್ನ ನೀರು ನೀಡಿ'
    },
    featured_crops: [
      {
        crop_id: 'wheat',
        activity: {
          english: 'Harvesting time',
          hindi: 'कटाई का समय',
          kannada: 'ಸುಗ್ಗಿ ಸಮಯ'
        },
        priority: 'high'
      }
    ],
    pest_disease_alerts: [
      {
        name: {
          english: 'Aphids',
          hindi: 'एफिड्स',
          kannada: 'ಗಿಡಹೇನುಗಳು'
        },
        affected_crops: ['wheat', 'mustard'],
        severity: 'medium',
        prevention_tips: {
          english: ['Use neem oil spray', 'Encourage beneficial insects'],
          hindi: ['नीम तेल का छिड़काव करें', 'लाभकारी कीड़ों को प्रोत्साहित करें'],
          kannada: ['ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಣೆ ಬಳಸಿ', 'ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ']
        }
      }
    ],
    market_trends: {
      high_demand_crops: ['wheat', 'mustard', 'potato'],
      price_predictions: [
        {
          crop_id: 'wheat',
          trend: 'rising',
          confidence: 'high'
        }
      ]
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Crop.deleteMany({}),
      Topic.deleteMany({}),
      Advice.deleteMany({}),
      Calendar.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert sample data
    await Promise.all([
      Crop.insertMany(crops),
      Topic.insertMany(topics),
      Advice.insertMany(advice),
      Calendar.insertMany(calendar)
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Inserted: ${crops.length} crops, ${topics.length} topics, ${advice.length} advice entries, ${calendar.length} calendar entries`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;