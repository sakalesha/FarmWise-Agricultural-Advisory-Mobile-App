export const crops = [
  { id: 'tomato', name: { english: 'Tomato', hindi: 'टमाटर', kannada: 'ಟೊಮೆಟೊ' }, emoji: '🍅', category: 'vegetables', topics: 12 },
  { id: 'rice', name: { english: 'Rice', hindi: 'चावल', kannada: 'ಅಕ್ಕಿ' }, emoji: '🌾', category: 'grains', topics: 15 },
  { id: 'wheat', name: { english: 'Wheat', hindi: 'गेहूं', kannada: 'ಗೋಧಿ' }, emoji: '🌾', category: 'grains', topics: 18 },
  { id: 'maize', name: { english: 'Maize', hindi: 'मक्का', kannada: 'ಜೋಳ' }, emoji: '🌽', category: 'grains', topics: 14 },
  { id: 'cotton', name: { english: 'Cotton', hindi: 'कपास', kannada: 'ಹತ್ತಿ' }, emoji: '🌿', category: 'cash_crops', topics: 20 },
  { id: 'potato', name: { english: 'Potato', hindi: 'आलू', kannada: 'ಆಲೂಗೆಡ್ಡೆ' }, emoji: '🥔', category: 'vegetables', topics: 16 },
  { id: 'onion', name: { english: 'Onion', hindi: 'प्याज', kannada: 'ಈರುಳ್ಳಿ' }, emoji: '🧅', category: 'vegetables', topics: 10 },
  { id: 'chili', name: { english: 'Chili', hindi: 'मिर्च', kannada: 'ಮೆಣಸಿನಕಾಯಿ' }, emoji: '🌶️', category: 'vegetables', topics: 13 },
  { id: 'banana', name: { english: 'Banana', hindi: 'केला', kannada: 'ಬಾಳೆ' }, emoji: '🍌', category: 'fruits', topics: 11 }
];

export const problems = [
  { 
    id: 'water_stress', 
    name: { english: 'Water Stress', hindi: 'पानी की कमी', kannada: 'ನೀರಿನ ಕೊರತೆ' }, 
    icon: '💧', 
    theme: 'blue', 
    affectedCrops: 8 
  },
  { 
    id: 'nutrient_issues', 
    name: { english: 'Nutrient Issues', hindi: 'पोषक तत्वों की समस्या', kannada: 'ಪೋಷಕಾಂಶದ ಸಮಸ್ಯೆಗಳು' }, 
    icon: '🧪', 
    theme: 'orange', 
    affectedCrops: 9 
  },
  { 
    id: 'heat_stress', 
    name: { english: 'Heat Stress', hindi: 'गर्मी का तनाव', kannada: 'ಶಾಖದ ಒತ್ತಡ' }, 
    icon: '🌡️', 
    theme: 'red', 
    affectedCrops: 7 
  },
  { 
    id: 'pest_problems', 
    name: { english: 'Pest Problems', hindi: 'कीट की समस्या', kannada: 'ಕೀಟ ಸಮಸ್ಯೆಗಳು' }, 
    icon: '🐛', 
    theme: 'yellow', 
    affectedCrops: 9 
  },
  { 
    id: 'diseases', 
    name: { english: 'Diseases', hindi: 'रोग', kannada: 'ರೋಗಗಳು' }, 
    icon: '🦠', 
    theme: 'purple', 
    affectedCrops: 8 
  },
  { 
    id: 'soil_issues', 
    name: { english: 'Soil Issues', hindi: 'मिट्टी की समस्या', kannada: 'ಮಣ್ಣಿನ ಸಮಸ್ಯೆಗಳು' }, 
    icon: '🌱', 
    theme: 'brown', 
    affectedCrops: 9 
  }
];

export const adviceEntries = [
  {
    id: "tomato_water_stress",
    crop: "Tomato",
    cropId: "tomato",
    problem: "Water Stress",
    problemId: "water_stress",
    severity: "high",
    category: "water_management",
    effect: {
      english: "Causes wilting, attracts whiteflies, aphids, and increases disease risk",
      hindi: "मुरझाने का कारण बनता है, सफेद मक्खी, एफिड आकर्षित करता है और बीमारी का जोखिम बढ़ाता है",
      kannada: "ಬಾಡುವಿಕೆಗೆ ಕಾರಣವಾಗುತ್ತದೆ, ಬಿಳಿ ನೊಣಗಳು, ಗಿಡಹೇನುಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ ಮತ್ತು ರೋಗದ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ"
    },
    advice: {
      english: "Water consistently in early morning to reduce pest risk and maintain plant health",
      hindi: "कीट के जोखिम को कम करने और पौधे के स्वास्थ्य को बनाए रखने के लिए सुबह जल्दी लगातार पानी दें",
      kannada: "ಕೀಟಗಳ ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಸಸ್ಯದ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಲು ಬೆಳಿಗ್ಗೆ ಸ್ಥಿರವಾಗಿ ನೀರು ನೀಡಿ"
    },
    actionSteps: {
      english: [
        "Check soil moisture daily by inserting finger 2-3 inches deep",
        "Water early morning (6-8 AM) to reduce evaporation",
        "Apply organic mulch around plants to retain moisture",
        "Install drip irrigation if possible for consistent watering"
      ],
      hindi: [
        "मिट्टी की नमी की जांच रोजाना करें, 2-3 इंच गहराई में उंगली डालकर",
        "वाष्पीकरण कम करने के लिए सुबह जल्दी (6-8 बजे) पानी दें",
        "नमी बनाए रखने के लिए पौधों के चारों ओर जैविक मल्च लगाएं",
        "यदि संभव हो तो लगातार पानी देने के लिए ड्रिप सिंचाई स्थापित करें"
      ],
      kannada: [
        "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪ್ರತಿದಿನ ಪರಿಶೀಲಿಸಿ, ಬೆರಳನ್ನು 2-3 ಇಂಚು ಆಳಕ್ಕೆ ಹಾಕಿ",
        "ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ (6-8 ಗಂಟೆಗೆ) ನೀರು ನೀಡಿ",
        "ತೇವಾಂಶವನ್ನು ಉಳಿಸಲು ಸಸ್ಯಗಳ ಸುತ್ತ ಸಾವಯವ ಮಲ್ಚ್ ಅನ್ನು ಅನ್ವಯಿಸಿ",
        "ಸ್ಥಿರವಾದ ನೀರಾವರಿಗಾಗಿ ಸಾಧ್ಯವಾದರೆ ಡ್ರಿಪ್ ನೀರಾವರಿಯನ್ನು ಸ್ಥಾಪಿಸಿ"
      ]
    },
    preventionTips: {
      english: [
        "Use drip irrigation for consistent water supply",
        "Monitor soil moisture regularly with simple tools",
        "Mulch around plants to reduce water loss",
        "Plant tomatoes in well-draining soil"
      ],
      hindi: [
        "लगातार पानी की आपूर्ति के लिए ड्रिप सिंचाई का उपयोग करें",
        "सरल उपकरणों से मिट्टी की नमी की नियमित निगरानी करें",
        "पानी की हानि को कम करने के लिए पौधों के चारों ओर मल्च करें",
        "टमाटर को अच्छी जल निकासी वाली मिट्टी में लगाएं"
      ],
      kannada: [
        "ಸ್ಥಿರ ನೀರು ಪೂರೈಕೆಗಾಗಿ ಡ್ರಿಪ್ ನೀರಾವರಿ ಬಳಸಿ",
        "ಸರಳ ಸಾಧನಗಳೊಂದಿಗೆ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
        "ನೀರಿನ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಸಸ್ಯಗಳ ಸುತ್ತ ಮಲ್ಚ್ ಮಾಡಿ",
        "ಉತ್ತಮ ಒಳಚರಂಡಿ ಇರುವ ಮಣ್ಣಿನಲ್ಲಿ ಟೊಮೆಟೊ ನಾಟಿ"
      ]
    },
    scientificExplanation: "Water stress reduces photosynthetic activity, weakens plant immunity, and creates favorable conditions for pest infestations and fungal diseases.",
    seasonalRelevance: ["march", "april", "may"],
    relatedTopics: ["tomato_heat_stress", "tomato_nutrient_deficiency"]
  },
  {
    id: "rice_pest_problems",
    crop: "Rice",
    cropId: "rice",
    problem: "Pest Problems",
    problemId: "pest_problems",
    severity: "medium",
    category: "pest_management",
    effect: {
      english: "Brown plant hopper and stem borer can reduce yield by 20-40%",
      hindi: "भूरा पादप फुदका और तना छेदक उत्पादन को 20-40% तक कम कर सकता है",
      kannada: "ಕಂದು ಸಸ್ಯ ಚಿಗಟೆ ಮತ್ತು ಕಾಂಡ ಕೊರೆಯುವವು ಇಳುವರಿಯನ್ನು 20-40% ವರೆಗೆ ಕಡಿಮೆ ಮಾಡಬಹುದು"
    },
    advice: {
      english: "Use integrated pest management combining biological controls, resistant varieties, and targeted spraying",
      hindi: "जैविक नियंत्रण, प्रतिरोधी किस्मों और लक्षित छिड़काव को मिलाकर एकीकृत कीट प्रबंधन का उपयोग करें",
      kannada: "ಜೈವಿಕ ನಿಯಂತ್ರಣ, ನಿರೋಧಕ ಪ್ರಭೇದಗಳು ಮತ್ತು ಗುರಿಯ ಸಿಂಪಣೆಯನ್ನು ಸಂಯೋಜಿಸಿ ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆಯನ್ನು ಬಳಸಿ"
    },
    actionSteps: {
      english: [
        "Monitor fields weekly for early pest detection",
        "Use pheromone traps to catch male insects",
        "Apply neem-based organic pesticides when needed",
        "Maintain proper water levels to discourage pests"
      ],
      hindi: [
        "कीटों की जल्दी पहचान के लिए साप्ताहिक खेतों की निगरानी करें",
        "नर कीटों को पकड़ने के लिए फेरोमोन ट्रैप का उपयोग करें",
        "जरूरत पड़ने पर नीम आधारित जैविक कीटनाशकों का प्रयोग करें",
        "कीटों को हतोत्साहित करने के लिए उचित पानी का स्तर बनाए रखें"
      ],
      kannada: [
        "ಮುಂಚಿತವಾಗಿ ಕೀಟಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ವಾರಕ್ಕೊಮ್ಮೆ ಹೊಲಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
        "ಗಂಡು ಕೀಟಗಳನ್ನು ಹಿಡಿಯಲು ಫೆರೋಮೋನ್ ಬಲೆಗಳನ್ನು ಬಳಸಿ",
        "ಅಗತ್ಯವಿದ್ದಾಗ ಬೇವಿನ ಆಧಾರಿತ ಸಾವಯವ ಕೀಟನಾಶಕಗಳನ್ನು ಅನ್ವಯಿಸಿ",
        "ಕೀಟಗಳನ್ನು ನಿರುತ್ಸಾಹಗೊಳಿಸಲು ಸರಿಯಾದ ನೀರಿನ ಮಟ್ಟವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಿ"
      ]
    },
    preventionTips: {
      english: [
        "Choose resistant rice varieties when available",
        "Remove crop residues after harvest",
        "Rotate with non-host crops when possible",
        "Encourage natural predators like spiders"
      ],
      hindi: [
        "जब उपलब्ध हो तो प्रतिरोधी चावल की किस्मों को चुनें",
        "फसल काटने के बाद फसल के अवशेषों को हटा दें",
        "जब संभव हो तो गैर-मेजबान फसलों के साथ फसल चक्र करें",
        "मकड़ियों जैसे प्राकृतिक शिकारियों को प्रोत्साहित करें"
      ],
      kannada: [
        "ಲಭ್ಯವಿದ್ದಾಗ ನಿರೋಧಕ ಅಕ್ಕಿ ಪ್ರಭೇದಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        "ಸುಗ್ಗಿಯ ನಂತರ ಬೆಳೆ ಉಳಿಕೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
        "ಸಾಧ್ಯವಾದಾಗ ಆತಿಥೇಯವಲ್ಲದ ಬೆಳೆಗಳೊಂದಿಗೆ ಪರ್ಯಾಯಕ್ರಮ ಮಾಡಿ",
        "ಜೇಡಗಳಂತಹ ನೈಸರ್ಗಿಕ ಪರಭಕ್ಷಕಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ"
      ]
    },
    scientificExplanation: "Integrated pest management reduces chemical dependency while maintaining effective pest control through multiple complementary approaches.",
    seasonalRelevance: ["july", "august", "september"],
    relatedTopics: ["rice_diseases", "rice_nutrient_management"]
  }
];

export const seasonalGuidance = {
  january: {
    weather: { english: "Cool and dry", hindi: "ठंडा और शुष्क", kannada: "ತಂಪಾದ ಮತ್ತು ಶುಷ್ಕ" },
    activities: {
      english: ["Harvest rabi crops", "Prepare land for summer crops", "Prune fruit trees"],
      hindi: ["रबी फसलों की कटाई", "गर्मियों की फसलों के लिए भूमि तैयार करें", "फलों के पेड़ों की छंटाई"],
      kannada: ["ರಬಿ ಬೆಳೆಗಳ ಸುಗ್ಗಿ", "ಬೇಸಿಗೆ ಬೆಳೆಗಳಿಗೆ ಭೂಮಿ ತಯಾರಿಸಿ", "ಹಣ್ಣಿನ ಮರಗಳ ಕೊಯ್ಲು"]
    },
    alerts: {
      english: ["Watch for aphids in wheat", "Protect vegetables from cold"],
      hindi: ["गेहूं में एफिड्स के लिए सावधान रहें", "सब्जियों को ठंड से बचाएं"],
      kannada: ["ಗೋಧಿಯಲ್ಲಿ ಗಿಡಹೇನುಗಳಿಗೆ ಗಮನಿಸಿ", "ತರಕಾರಿಗಳನ್ನು ತಂಪಿನಿಂದ ರಕ್ಷಿಸಿ"]
    },
    irrigation: {
      english: "Reduce watering frequency, water during midday",
      hindi: "पानी देने की आवृत्ति कम करें, दोपहर में पानी दें",
      kannada: "ನೀರಾವರಿ ಆವರ್ತನ ಕಡಿಮೆಮಾಡಿ, ಮಧ್ಯಾಹ್ನ ನೀರು ನೀಡಿ"
    }
  }
  // Add more months as needed
};