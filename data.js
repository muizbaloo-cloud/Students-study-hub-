/* =========================================================
   STUDENT STUDY HUB — data.js
   Shared application data, XP, ranks, quiz messages,
   subjects, levels, topics and question helpers.
   ========================================================= */

/* ---------- APP INFORMATION ---------- */

window.APP_INFO = {
  name: "Student Study Hub",
  creator: "BALOGUN MUIZ",
  school: "ST PETER'S COLLEGE OLOMORE",
  session: "2026/27 ACADEMIC SESSION"
};


/* =========================================================
   SUBJECTS
   ========================================================= */

window.SUBJECTS = [
  "Mathematics",
  "English Language",
  "Physics",
  "Chemistry",
  "Biology",
  "Further Mathematics",
  "Computer Science",
  "Economics",
  "Government",
  "Geography"
];

window.LEVELS = [
  "SS1",
  "SS2",
  "SS3",
  "All SS levels"
];


/* =========================================================
   RANK SYSTEM
   ========================================================= */

window.RANKS = [
  {
    name: "Beginners",
    minXP: 0,
    maxXP: 99,
    icon: "🌱",
    description: "You are just getting started. Keep learning!",
    colorClass: "rank-beginners"
  },
  {
    name: "Intermediate",
    minXP: 100,
    maxXP: 299,
    icon: "📘",
    description: "You're building a strong learning habit.",
    colorClass: "rank-intermediate"
  },
  {
    name: "Bookworm",
    minXP: 300,
    maxXP: 599,
    icon: "📚",
    description: "You're becoming a serious learner!",
    colorClass: "rank-bookworm"
  },
  {
    name: "Elite",
    minXP: 600,
    maxXP: 999,
    icon: "🏅",
    description: "Your consistency is putting you among the best.",
    colorClass: "rank-elite"
  },
  {
    name: "Genius",
    minXP: 1000,
    maxXP: Infinity,
    icon: "🧠",
    description: "Outstanding! You've reached the highest rank.",
    colorClass: "rank-genius"
  }
];


/* =========================================================
   XP VALUES
   ========================================================= */

window.XP_RULES = {
  correctPracticeAnswer: 5,
  correctExamAnswer: 10,
  completedPracticeQuiz: 10,
  completedExam: 20,
  perfectQuizBonus: 25,
  highScoreBonus: 15,
  dailyLearningBonus: 10,
  noteCompleted: 5,
  formulaStudied: 3
};


/* =========================================================
   RANK HELPERS
   ========================================================= */

window.getRank = function (xp) {
  xp = Number(xp) || 0;

  for (let i = window.RANKS.length - 1; i >= 0; i--) {
    if (xp >= window.RANKS[i].minXP) {
      return window.RANKS[i];
    }
  }

  return window.RANKS[0];
};


window.getNextRank = function (xp) {
  xp = Number(xp) || 0;

  for (let i = 0; i < window.RANKS.length; i++) {
    if (xp < window.RANKS[i].minXP) {
      return window.RANKS[i];
    }
  }

  return null;
};


window.getRankProgress = function (xp) {
  xp = Number(xp) || 0;

  const current = window.getRank(xp);
  const next = window.getNextRank(xp);

  if (!next) {
    return {
      currentRank: current.name,
      nextRank: null,
      currentXP: xp,
      neededXP: 0,
      percentage: 100
    };
  }

  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;

  return {
    currentRank: current.name,
    nextRank: next.name,
    currentXP: xp,
    neededXP: Math.max(0, next.minXP - xp),
    percentage: Math.min(100, Math.max(0, (progress / range) * 100))
  };
};


/* =========================================================
   XP / RESULT MESSAGES
   ========================================================= */

window.getPerformanceMessage = function (percentage) {
  percentage = Number(percentage) || 0;

  if (percentage >= 90) {
    return {
      title: "Outstanding! 🔥",
      message: "Excellent performance. You really know your stuff!",
      type: "excellent"
    };
  }

  if (percentage >= 75) {
    return {
      title: "Great Work! 👏",
      message: "Very strong performance. Keep pushing!",
      type: "great"
    };
  }

  if (percentage >= 60) {
    return {
      title: "Good Job! 👍",
      message: "You're making solid progress. Keep practising!",
      type: "good"
    };
  }

  if (percentage >= 40) {
    return {
      title: "Keep Going! 💪",
      message: "You're getting there. Review the corrections and try again.",
      type: "average"
    };
  }

  return {
    title: "Don't Give Up! 🌱",
    message: "Every attempt is practice. Study the explanations and try again.",
    type: "needs-improvement"
  };
};


window.getXPMessage = function (xpEarned) {
  xpEarned = Number(xpEarned) || 0;

  if (xpEarned >= 50) {
    return "Massive XP gain! You're on fire! 🔥";
  }

  if (xpEarned >= 30) {
    return "Excellent XP gain! Keep climbing! 🚀";
  }

  if (xpEarned >= 15) {
    return "Nice XP boost! 📈";
  }

  if (xpEarned > 0) {
    return "Every point counts. Keep learning! ⭐";
  }

  return "Keep practising to start earning XP! 🌱";
};


window.getRankUpMessage = function (oldXP, newXP) {
  const oldRank = window.getRank(oldXP);
  const newRank = window.getRank(newXP);

  if (oldRank.name === newRank.name) {
    return null;
  }

  return {
    oldRank: oldRank.name,
    newRank: newRank.name,
    title: "Rank Up! 🎉",
    message:
      "Congratulations! You have moved from " +
      oldRank.name +
      " to " +
      newRank.name +
      "!"
  };
};


/* =========================================================
   LEVEL / DIFFICULTY
   ========================================================= */

window.DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
  "Very Hard"
];

window.QUESTION_COUNTS = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100
];

window.EXAM_DURATIONS = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100
];


/* =========================================================
   SUBJECT TOPICS
   ========================================================= */

window.TOPICS = {
  "Mathematics": [
    "Number Bases",
    "Fractions, Decimals & Percentages",
    "Approximation",
    "Ratio & Proportion",
    "Sets",
    "Algebra",
    "Linear Equations & Inequalities",
    "Simultaneous Equations",
    "Sequences & Series",
    "Variation",
    "Quadratic Equations",
    "Indices & Logarithms",
    "Surds",
    "Trigonometry",
    "Bearings & Distances",
    "Coordinate Geometry",
    "Mensuration",
    "Circle Geometry",
    "Vectors",
    "Matrices",
    "Calculus",
    "Statistics",
    "Probability",
    "Plane Geometry & Polygons",
    "Mathematical Logic"
  ],

  "English Language": [
    "Grammar",
    "Parts of Speech",
    "Nouns & Pronouns",
    "Tenses",
    "Concord",
    "Clauses & Phrases",
    "Punctuation",
    "Vocabulary",
    "Synonyms & Antonyms",
    "Idioms",
    "Comprehension",
    "Summary Writing",
    "Sentence Completion",
    "Oral English",
    "Essay Writing",
    "Formal & Informal Letters",
    "Reports & Articles",
    "Figures of Speech"
  ],

  "Physics": [
    "Measurements & Units",
    "Scalars & Vectors",
    "Mechanics",
    "Motion",
    "Forces",
    "Work Energy & Power",
    "Simple Machines",
    "Pressure",
    "Heat",
    "Gas Laws",
    "Waves",
    "Sound",
    "Light",
    "Electricity",
    "Magnetism",
    "Electromagnetic Induction",
    "Atomic Physics",
    "Radioactivity",
    "Modern Physics"
  ],

  "Chemistry": [
    "Matter & Separation Techniques",
    "Atomic Structure",
    "Chemical Bonding",
    "Periodic Table",
    "Chemical Formulae & Equations",
    "Mole Concept",
    "Stoichiometry",
    "Gas Laws",
    "Acids Bases & Salts",
    "Oxidation & Reduction",
    "Rates of Reaction",
    "Chemical Equilibrium",
    "Electrochemistry",
    "Metals & Non-metals",
    "Organic Chemistry",
    "Hydrocarbons",
    "Polymers",
    "Environmental Chemistry"
  ],

  "Biology": [
    "Characteristics of Living Things",
    "Cell Biology",
    "Cell Division",
    "Classification of Living Things",
    "Nutrition",
    "Transport in Plants & Animals",
    "Respiration",
    "Excretion",
    "Support & Movement",
    "Nervous & Hormonal Coordination",
    "Human Systems",
    "Reproduction",
    "Genetics",
    "Evolution",
    "Ecology",
    "Adaptation",
    "Conservation",
    "Microorganisms & Disease"
  ],

  "Further Mathematics": [
    "Number Systems",
    "Algebra",
    "Functions",
    "Polynomial Equations",
    "Complex Numbers",
    "Matrices",
    "Determinants",
    "Vectors",
    "Trigonometry",
    "Coordinate Geometry",
    "Differentiation",
    "Integration",
    "Mechanics",
    "Probability",
    "Statistics",
    "Series"
  ],

  "Computer Science": [
    "Computer Fundamentals",
    "Hardware",
    "Software",
    "Data Representation",
    "Number Systems",
    "Algorithms",
    "Flowcharts & Pseudocode",
    "Programming",
    "Boolean Logic",
    "Operating Systems",
    "Databases",
    "Networking",
    "Internet & Web",
    "Cybersecurity Basics",
    "Systems Analysis",
    "Spreadsheets"
  ],

  "Economics": [
    "Basic Economic Concepts",
    "Demand & Supply",
    "Elasticity",
    "Production",
    "Factors of Production",
    "Cost & Revenue",
    "Market Structures",
    "National Income",
    "Money & Banking",
    "Inflation & Unemployment",
    "Public Finance",
    "International Trade",
    "Economic Growth & Development",
    "Population & Labour",
    "Agriculture & Industry",
    "Nigerian Economy"
  ],

  "Government": [
    "Meaning & Scope of Government",
    "Constitution",
    "Citizenship",
    "Political Socialisation",
    "Political Parties",
    "Electoral Systems",
    "Public Opinion",
    "Pressure Groups",
    "Political Institutions",
    "Legislature",
    "Executive",
    "Judiciary",
    "Public Administration",
    "Local Government",
    "Federalism",
    "Public Policy",
    "Foreign Policy",
    "International Organisations"
  ],

  "Geography": [
    "Map Reading",
    "Scale & Bearings",
    "Latitude & Longitude",
    "Earth Structure",
    "Rocks & Minerals",
    "Weather & Climate",
    "Weather Instruments",
    "Geomorphology",
    "Drainage",
    "Soils & Vegetation",
    "Population",
    "Settlement",
    "Agriculture",
    "Natural Resources",
    "Industry & Transport",
    "Environmental Issues",
    "Map Interpretation",
    "Nigeria & Africa"
  ]
};


/* =========================================================
   LEVEL-SPECIFIC TOPICS
   ========================================================= */

window.LEVEL_TOPICS = {
  "Mathematics": {
    "SS1": [
      "Number Bases",
      "Fractions, Decimals & Percentages",
      "Approximation",
      "Ratio & Proportion",
      "Sets",
      "Algebra",
      "Linear Equations & Inequalities",
      "Simultaneous Equations",
      "Sequences & Series",
      "Variation",
      "Mensuration",
      "Plane Geometry & Polygons",
      "Statistics",
      "Probability"
    ],

    "SS2": [
      "Quadratic Equations",
      "Indices & Logarithms",
      "Surds",
      "Trigonometry",
      "Bearings & Distances",
      "Coordinate Geometry",
      "Circle Geometry",
      "Plane Geometry & Polygons",
      "Mathematical Logic",
      "Mensuration",
      "Vectors",
      "Matrices",
      "Statistics",
      "Probability"
    ],

    "SS3": [
      "Quadratic Equations",
      "Indices & Logarithms",
      "Trigonometry",
      "Coordinate Geometry",
      "Mensuration",
      "Circle Geometry",
      "Vectors",
      "Matrices",
      "Calculus",
      "Statistics",
      "Probability"
    ]
  },

  "English Language": {
    "SS1": [
      "Parts of Speech",
      "Nouns & Pronouns",
      "Tenses",
      "Concord",
      "Clauses & Phrases",
      "Punctuation",
      "Vocabulary",
      "Synonyms & Antonyms",
      "Comprehension",
      "Essay Writing",
      "Oral English"
    ],

    "SS2": [
      "Grammar",
      "Tenses",
      "Concord",
      "Vocabulary",
      "Synonyms & Antonyms",
      "Idioms",
      "Comprehension",
      "Summary Writing",
      "Sentence Completion",
      "Oral English",
      "Formal & Informal Letters",
      "Figures of Speech"
    ],

    "SS3": [
      "Grammar",
      "Concord",
      "Vocabulary",
      "Comprehension",
      "Summary Writing",
      "Essay Writing",
      "Formal & Informal Letters",
      "Reports & Articles",
      "Oral English",
      "Figures of Speech"
    ]
  },

  "Physics": {
    "SS1": [
      "Measurements & Units",
      "Scalars & Vectors",
      "Mechanics",
      "Motion",
      "Forces",
      "Work Energy & Power",
      "Simple Machines",
      "Pressure",
      "Heat"
    ],

    "SS2": [
      "Motion",
      "Forces",
      "Heat",
      "Gas Laws",
      "Waves",
      "Sound",
      "Light",
      "Electricity",
      "Magnetism"
    ],

    "SS3": [
      "Waves",
      "Sound",
      "Light",
      "Electricity",
      "Magnetism",
      "Electromagnetic Induction",
      "Atomic Physics",
      "Radioactivity",
      "Modern Physics"
    ]
  },

  "Chemistry": {
    "SS1": [
      "Matter & Separation Techniques",
      "Atomic Structure",
      "Chemical Bonding",
      "Periodic Table",
      "Chemical Formulae & Equations",
      "Mole Concept"
    ],

    "SS2": [
      "Mole Concept",
      "Stoichiometry",
      "Gas Laws",
      "Acids Bases & Salts",
      "Oxidation & Reduction",
      "Rates of Reaction",
      "Chemical Equilibrium",
      "Metals & Non-metals"
    ],

    "SS3": [
      "Organic Chemistry",
      "Hydrocarbons",
      "Polymers",
      "Electrochemistry",
      "Stoichiometry",
      "Environmental Chemistry",
      "Chemical Equilibrium"
    ]
  },

  "Biology": {
    "SS1": [
      "Characteristics of Living Things",
      "Cell Biology",
      "Cell Division",
      "Classification of Living Things",
      "Nutrition",
      "Transport in Plants & Animals",
      "Respiration"
    ],

    "SS2": [
      "Transport in Plants & Animals",
      "Respiration",
      "Excretion",
      "Support & Movement",
      "Nervous & Hormonal Coordination",
      "Human Systems",
      "Reproduction",
      "Ecology"
    ],

    "SS3": [
      "Reproduction",
      "Genetics",
      "Evolution",
      "Ecology",
      "Adaptation",
      "Conservation",
      "Microorganisms & Disease"
    ]
  },

  "Further Mathematics": {
    "SS1": [
      "Number Systems",
      "Algebra",
      "Functions",
      "Polynomial Equations",
      "Trigonometry",
      "Coordinate Geometry"
    ],

    "SS2": [
      "Complex Numbers",
      "Matrices",
      "Determinants",
      "Vectors",
      "Trigonometry",
      "Mechanics",
      "Probability",
      "Statistics"
    ],

    "SS3": [
      "Matrices",
      "Vectors",
      "Differentiation",
      "Integration",
      "Mechanics",
      "Probability",
      "Statistics",
      "Series"
    ]
  },

  "Computer Science": {
    "SS1": [
      "Computer Fundamentals",
      "Hardware",
      "Software",
      "Data Representation",
      "Number Systems",
      "Operating Systems",
      "Spreadsheets"
    ],

    "SS2": [
      "Algorithms",
      "Flowcharts & Pseudocode",
      "Programming",
      "Boolean Logic",
      "Databases",
      "Networking",
      "Internet & Web"
    ],

    "SS3": [
      "Algorithms",
      "Programming",
      "Databases",
      "Networking",
      "Cybersecurity Basics",
      "Systems Analysis",
      "Spreadsheets"
    ]
  },

  "Economics": {
    "SS1": [
      "Basic Economic Concepts",
      "Demand & Supply",
      "Elasticity",
      "Production",
      "Factors of Production",
      "Cost & Revenue"
    ],

    "SS2": [
      "Market Structures",
      "Money & Banking",
      "Inflation & Unemployment",
      "Public Finance",
      "International Trade",
      "Agriculture & Industry"
    ],

    "SS3": [
      "National Income",
      "Market Structures",
      "Money & Banking",
      "Economic Growth & Development",
      "Population & Labour",
      "Nigerian Economy"
    ]
  },

  "Government": {
    "SS1": [
      "Meaning & Scope of Government",
      "Constitution",
      "Citizenship",
      "Political Socialisation",
      "Political Parties"
    ],

    "SS2": [
      "Electoral Systems",
      "Public Opinion",
      "Pressure Groups",
      "Political Institutions",
      "Legislature",
      "Executive",
      "Judiciary",
      "Federalism"
    ],

    "SS3": [
      "Public Administration",
      "Local Government",
      "Federalism",
      "Public Policy",
      "Foreign Policy",
      "International Organisations",
      "Constitution"
    ]
  },

  "Geography": {
    "SS1": [
      "Map Reading",
      "Scale & Bearings",
      "Latitude & Longitude",
      "Earth Structure",
      "Rocks & Minerals",
      "Weather & Climate",
      "Weather Instruments"
    ],

    "SS2": [
      "Geomorphology",
      "Drainage",
      "Soils & Vegetation",
      "Population",
      "Settlement",
      "Agriculture",
      "Natural Resources",
      "Industry & Transport"
    ],

    "SS3": [
      "Natural Resources",
      "Geomorphology",
      "Environmental Issues",
      "Map Interpretation",
      "Nigeria & Africa",
      "Weather & Climate",
      "Population"
    ]
  }
};


/* =========================================================
   QUESTION BANK COMPATIBILITY
   ========================================================= */

/*
   Keep the existing question files compatible.

   We do NOT replace:
   questions-old.js
   questions-new1.js
   questions-new2.js
   pastpapers.js
   gen.js
   gen2.js

   They can continue loading their own question arrays.
*/

window.QBANK = window.QBANK || [];


/*
   Helper for adding questions programmatically.

   Existing question-generation files can continue using this.
*/

window.addQ = function (
  subject,
  level,
  topic,
  question,
  options,
  answer,
  explanation,
  extra
) {
  const item = Object.assign(
    {
      id: "q-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      subject: subject,
      level: level,
      topic: topic,
      exam: "Practice",
      year: "",
      q: question,
      question: question,
      options: Array.isArray(options) ? options : [],
      answer: answer,
      explanation: explanation || "",
      difficulty: "Medium"
    },
    extra || {}
  );

  window.QBANK.push(item);

  return item;
};


/* =========================================================
   UTILITY HELPERS
   ========================================================= */

window.getTopicsForLevel = function (subject, level) {
  if (
    level &&
    level !== "All SS levels" &&
    window.LEVEL_TOPICS[subject] &&
    window.LEVEL_TOPICS[subject][level]
  ) {
    return window.LEVEL_TOPICS[subject][level];
  }

  return window.TOPICS[subject] || [];
};


window.getSubjectCount = function (subject) {
  if (!subject) return 0;

  return window.QBANK.filter(function (question) {
    return question.subject === subject;
  }).length;
};


window.getTopicCount = function (subject, topic) {
  if (!subject || !topic) return 0;

  return window.QBANK.filter(function (question) {
    return (
      question.subject === subject &&
      question.topic === topic
    );
  }).length;
};


/* =========================================================
   QUIZ XP CALCULATOR
   ========================================================= */

window.calculateQuizXP = function ({
  correct = 0,
  total = 0,
  mode = "practice",
  completed = true
} = {}) {

  correct = Number(correct) || 0;
  total = Number(total) || 0;

  if (!completed || total <= 0) {
    return 0;
  }

  const rule =
    mode === "exam"
      ? window.XP_RULES.correctExamAnswer
      : window.XP_RULES.correctPracticeAnswer;

  let xp = correct * rule;

  if (mode === "exam") {
    xp += window.XP_RULES.completedExam;
  } else {
    xp += window.XP_RULES.completedPracticeQuiz;
  }

  const percentage = (correct / total) * 100;

  if (percentage 