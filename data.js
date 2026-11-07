/* =========================================================
   STUDENT STUDY HUB — DATA
   ========================================================= */

window.APP_INFO = {
  name: "STUDENT STUDY HUB",
  creator: "BALOGUN MUIZ",
  school: "ST PETER'S COLLEGE OLOMORE",
  session: "2026/27 ACADEMIC SESSION",
  description:
    "SS1–SS3 learning, practice, notes, formulas and past papers."
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

/* =========================================================
   LEVELS
   ========================================================= */

window.LEVELS = [
  "SS1",
  "SS2",
  "SS3",
  "All SS levels"
];

/* =========================================================
   RANKS
   ========================================================= */

window.RANKS = [
  {
    name: "Beginners",
    minXP: 0,
    maxXP: 99,
    icon: "🌱",
    description: "You are just getting started.",
    colorClass: "rank-beginners"
  },
  {
    name: "Intermediate",
    minXP: 100,
    maxXP: 299,
    icon: "📘",
    description: "Your learning journey is growing.",
    colorClass: "rank-intermediate"
  },
  {
    name: "Bookworm",
    minXP: 300,
    maxXP: 599,
    icon: "📚",
    description: "You are becoming a serious learner.",
    colorClass: "rank-bookworm"
  },
  {
    name: "Elite",
    minXP: 600,
    maxXP: 999,
    icon: "🔥",
    description: "Your performance is impressive.",
    colorClass: "rank-elite"
  },
  {
    name: "Genius",
    minXP: 1000,
    maxXP: Infinity,
    icon: "🧠",
    description: "Outstanding academic performance.",
    colorClass: "rank-genius"
  }
];

/* =========================================================
   XP RULES
   ========================================================= */

window.XP_RULES = {
  practiceCorrect: 5,
  examCorrect: 10,
  completedPractice: 10,
  completedExam: 20,
  perfectBonus: 25,
  highScoreBonus: 15,
  dailyLearning: 10,
  noteCompleted: 5,
  formulaStudied: 3
};

/* =========================================================
   DIFFICULTY
   ========================================================= */

window.DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
  "Very Hard"
];

/* =========================================================
   QUESTION COUNTS
   ========================================================= */

window.QUESTION_COUNTS = [
  10, 20, 30, 40, 50,
  60, 70, 80, 90, 100
];

/* =========================================================
   EXAM DURATIONS
   ========================================================= */

window.EXAM_DURATIONS = [
  10, 20, 30, 40, 50,
  60, 70, 80, 90, 100
];

/* =========================================================
   TOPICS
   ========================================================= */

window.TOPICS = {

  "Mathematics": [
    "Number Bases",
    "Fractions",
    "Decimals",
    "Percentages",
    "Ratio and Proportion",
    "Indices",
    "Logarithms",
    "Surds",
    "Sets",
    "Algebraic Expressions",
    "Factorization",
    "Linear Equations",
    "Simultaneous Equations",
    "Quadratic Equations",
    "Inequalities",
    "Sequences and Series",
    "Variation",
    "Functions",
    "Matrices",
    "Vectors",
    "Trigonometry",
    "Mensuration",
    "Geometry",
    "Coordinate Geometry",
    "Statistics",
    "Probability",
    "Differentiation",
    "Integration",
    "Construction",
    "Bearings"
  ],

  "English Language": [
    "Comprehension",
    "Summary",
    "Vocabulary",
    "Synonyms",
    "Antonyms",
    "Grammar",
    "Parts of Speech",
    "Tenses",
    "Concord",
    "Sentence Structure",
    "Question Tags",
    "Punctuation",
    "Figures of Speech",
    "Oral English",
    "Word Stress",
    "Vowel Sounds",
    "Consonant Sounds",
    "Essay Writing",
    "Letter Writing",
    "Article Writing",
    "Report Writing",
    "Speech Writing"
  ],

  "Physics": [
    "Measurement",
    "Scalars and Vectors",
    "Motion",
    "Speed and Velocity",
    "Acceleration",
    "Forces",
    "Newton's Laws",
    "Work Energy and Power",
    "Machines",
    "Pressure",
    "Density",
    "Heat",
    "Temperature",
    "Waves",
    "Sound",
    "Light",
    "Reflection",
    "Refraction",
    "Electricity",
    "Current Electricity",
    "Magnetism",
    "Electromagnetic Induction",
    "Simple Harmonic Motion",
    "Gravitation",
    "Atomic Physics",
    "Nuclear Physics"
  ],

  "Chemistry": [
    "Matter",
    "Measurement",
    "Atomic Structure",
    "Periodic Table",
    "Chemical Bonding",
    "Mole Concept",
    "Chemical Formulae",
    "Chemical Equations",
    "Stoichiometry",
    "Acids Bases and Salts",
    "pH",
    "Redox Reactions",
    "Electrochemistry",
    "Organic Chemistry",
    "Hydrocarbons",
    "Alkanes",
    "Alkenes",
    "Alkynes",
    "Alcohols",
    "Carboxylic Acids",
    "Polymers",
    "Metals",
    "Non-metals",
    "Water",
    "Air",
    "Environmental Chemistry"
  ],

  "Biology": [
    "Characteristics of Living Things",
    "Cell Structure",
    "Cell Functions",
    "Nutrition",
    "Photosynthesis",
    "Respiration",
    "Transport",
    "Excretion",
    "Homeostasis",
    "Support and Movement",
    "Reproduction",
    "Growth",
    "Genetics",
    "Evolution",
    "Ecology",
    "Food Chains",
    "Food Webs",
    "Population",
    "Adaptation",
    "Classification",
    "Microorganisms",
    "Disease",
    "Human Health",
    "Plant Biology",
    "Animal Biology"
  ],

  "Further Mathematics": [
    "Algebra",
    "Functions",
    "Polynomial Equations",
    "Matrices",
    "Determinants",
    "Vectors",
    "Complex Numbers",
    "Sequences",
    "Series",
    "Binomial Expansion",
    "Trigonometry",
    "Coordinate Geometry",
    "Differentiation",
    "Integration",
    "Differential Equations",
    "Mechanics",
    "Statistics",
    "Probability",
    "Linear Programming",
    "Numerical Methods"
  ],

  "Computer Science": [
    "Computer Fundamentals",
    "Computer Hardware",
    "Computer Software",
    "Operating Systems",
    "Data Representation",
    "Number Systems",
    "Algorithms",
    "Flowcharts",
    "Programming",
    "Variables",
    "Data Types",
    "Control Structures",
    "Arrays",
    "Databases",
    "Computer Networks",
    "Internet",
    "Cybersecurity",
    "Artificial Intelligence",
    "Ethics"
  ],

  "Economics": [
    "Basic Economic Concepts",
    "Scarcity",
    "Choice",
    "Opportunity Cost",
    "Demand",
    "Supply",
    "Elasticity",
    "Production",
    "Factors of Production",
    "Division of Labour",
    "Market",
    "Price Determination",
    "Money",
    "Banking",
    "Inflation",
    "Unemployment",
    "National Income",
    "Economic Growth",
    "Economic Development",
    "Public Finance",
    "International Trade",
    "Population",
    "Agriculture",
    "Industry"
  ],

  "Government": [
    "Meaning of Government",
    "Political Concepts",
    "Power and Authority",
    "Constitution",
    "Rule of Law",
    "Democracy",
    "Political Parties",
    "Pressure Groups",
    "Elections",
    "Electoral Systems",
    "Legislature",
    "Executive",
    "Judiciary",
    "Federalism",
    "Unitary System",
    "Confederation",
    "Local Government",
    "Public Opinion",
    "Citizenship",
    "Human Rights",
    "International Organizations",
    "ECOWAS",
    "African Union",
    "United Nations"
  ],

  "Geography": [
    "The Solar System",
    "The Earth",
    "Latitude and Longitude",
    "Maps",
    "Scale",
    "Relief",
    "Weather",
    "Climate",
    "Rocks",
    "Weathering",
    "Erosion",
    "Rivers",
    "Drainage",
    "Vegetation",
    "Soils",
    "Population",
    "Settlement",
    "Migration",
    "Agriculture",
    "Industry",
    "Transport",
    "Trade",
    "Resources",
    "Environmental Issues"
  ]
};

/* =========================================================
   LEVEL-SPECIFIC TOPICS
   ========================================================= */

window.LEVEL_TOPICS = {

  "Mathematics": {
    "SS1": [
      "Number Bases",
      "Fractions",
      "Decimals",
      "Percentages",
      "Ratio and Proportion",
      "Indices",
      "Sets",
      "Algebraic Expressions",
      "Linear Equations",
      "Geometry",
      "Mensuration",
      "Statistics"
    ],

    "SS2": [
      "Logarithms",
      "Surds",
      "Quadratic Equations",
      "Simultaneous Equations",
      "Sequences and Series",
      "Variation",
      "Trigonometry",
      "Coordinate Geometry",
      "Probability",
      "Statistics"
    ],

    "SS3": [
      "Quadratic Equations",
      "Inequalities",
      "Matrices",
      "Vectors",
      "Trigonometry",
      "Mensuration",
      "Geometry",
      "Differentiation",
      "Integration",
      "Probability",
      "Statistics"
    ]
  },

  "Physics": {
    "SS1": [
      "Measurement",
      "Scalars and Vectors",
      "Motion",
      "Speed and Velocity",
      "Acceleration",
      "Forces",
      "Work Energy and Power",
      "Machines",
      "Pressure"
    ],

    "SS2": [
      "Heat",
      "Temperature",
      "Waves",
      "Sound",
      "Light",
      "Reflection",
      "Refraction",
      "Electricity"
    ],

    "SS3": [
      "Current Electricity",
      "Magnetism",
      "Electromagnetic Induction",
      "Gravitation",
      "Atomic Physics",
      "Nuclear Physics"
    ]
  },

  "Chemistry": {
    "SS1": [
      "Matter",
      "Measurement",
      "Atomic Structure",
      "Periodic Table",
      "Chemical Bonding",
      "Chemical Formulae",
      "Chemical Equations"
    ],

    "SS2": [
      "Mole Concept",
      "Stoichiometry",
      "Acids Bases and Salts",
      "pH",
      "Redox Reactions",
      "Electrochemistry"
    ],

    "SS3": [
      "Organic Chemistry",
      "Hydrocarbons",
      "Alkanes",
      "Alkenes",
      "Alkynes",
      "Alcohols",
      "Carboxylic Acids",
      "Polymers",
      "Metals",
      "Environmental Chemistry"
    ]
  },

  "Biology": {
    "SS1": [
      "Characteristics of Living Things",
      "Cell Structure",
      "Cell Functions",
      "Nutrition",
      "Photosynthesis",
      "Respiration"
    ],

    "SS2": [
      "Transport",
      "Excretion",
      "Homeostasis",
      "Support and Movement",
      "Reproduction",
      "Growth"
    ],

    "SS3": [
      "Genetics",
      "Evolution",
      "Ecology",
      "Food Chains",
      "Food Webs",
      "Adaptation",
      "Disease",
      "Human Health"
    ]
  }
};

/* =========================================================
   QUESTION BANK
   ========================================================= */

window.QBANK = window.QBANK || [];

/* =========================================================
   QUESTION CREATOR
   ========================================================= */

window.addQ = function (
  subject,
  level,
  topic,
  question,
  options,
  answer,
  explanation = "",
  extra = {}
) {
  const item = {
    id:
      extra.id ||
      `q_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}`,

    subject,
    level:
      level || "All SS levels",

    topic:
      topic || "General",

    exam:
      extra.exam || "Practice",

    year:
      extra.year || null,

    paper:
      extra.paper || "Paper 1",

    question,

    q: question,

    options:
      Array.isArray(options)
        ? options
        : [],

    answer,

    explanation:
      explanation || "",

    difficulty:
      extra.difficulty || "Medium",

    diagram:
      extra.diagram || null,

    diagramUrl:
      extra.diagramUrl || null,

    imageUrl:
      extra.imageUrl || null,

    inPastPaper:
      Boolean(extra.inPastPaper),

    inQuiz:
      extra.inQuiz !== false
  };

  window.QBANK.push(item);

  return item;
};

/* =========================================================
   TOPIC HELPERS
   ========================================================= */

window.getTopicsForLevel = function (
  subject,
  level
) {
  if (!subject) return [];

  if (
    level &&
    level !== "All SS levels" &&
    window.LEVEL_TOPICS?.[subject]?.[level]
  ) {
    return window.LEVEL_TOPICS[subject][level];
  }

  return window.TOPICS?.[subject] || [];
};

window.getSubjectCount = function (
  subject
) {
  return window.QBANK.filter(
    q => q.subject === subject
  ).length;
};

window.getTopicCount = function (
  subject,
  topic
) {
  return window.QBANK.filter(
    q =>
      q.subject === subject &&
      q.topic === topic
  ).length;
};

/* =========================================================
   RANK HELPERS
   ========================================================= */

window.getRank = function (xp) {
  xp = Number(xp) || 0;

  for (let i = window.RANKS.length - 1; i >= 0; i--) {
    const rank = window.RANKS[i];

    if (xp >= rank.minXP) {
      return rank;
    }
  }

  return window.RANKS[0];
};

window.getNextRank = function (xp) {
  xp = Number(xp) || 0;

  for (const rank of window.RANKS) {
    if (xp < rank.minXP) {
      return rank;
    }
  }

  return null;
};

window.getRankProgress = function (xp) {
  xp = Number(xp) || 0;

  const current =
    window.getRank(xp);

  const next =
    window.getNextRank(xp);

  if (!next) {
    return {
      percentage: 100,
      currentRank: current,
      nextRank: null,
      neededXP: 0
    };
  }

  const range =
    next.minXP - current.minXP;

  const progress =
    xp - current.minXP;

  return {
    percentage:
      Math.max(
        0,
        Math.min(
          100,
          (progress / range) * 100
        )
      ),

    currentRank: current,

    nextRank: next.name,

    neededXP:
      Math.max(
        0,
        next.minXP - xp
      )
  };
};

/* =========================================================
   PERFORMANCE MESSAGES
   ========================================================= */

window.getPerformanceMessage =
  function (percentage) {
    percentage =
      Number(percentage) || 0;

    if (percentage >= 90) {
      return "Excellent! You really know your stuff. 🔥";
    }

    if (percentage >= 75) {
      return "Great work! Keep pushing. 💪";
    }

    if (percentage >= 60) {
      return "Good effort. A little more revision will help.";
    }

    if (percentage >= 40) {
      return "You're improving. Review the questions you missed.";
    }

    return "Don't give up. Study the topic and try again. 🌱";
  };

window.getXPMessage =
  function (xp) {
    return `You earned ${Number(xp) || 0} XP!`;
  };

window.getRankUpMessage =
  function (oldXP, newXP) {
    const oldRank =
      window.getRank(oldXP);

    const newRank =
      window.getRank(newXP);

    if (
      oldRank.name !== newRank.name
    ) {
      return {
        title: "🎉 RANK UP!",
        message:
          `You are now ${newRank.name}!`
      };
    }

    return null;
  };

/* =========================================================
   QUIZ XP
   ========================================================= */

window.calculateQuizXP = function (
  correct,
  total,
  mode = "practice"
) {
  correct =
    Math.max(
      0,
      Number(correct) || 0
    );

  total =
    Math.max(
      0,
      Number(total) || 0
    );

  const rules =
    window.XP_RULES;

  const perQuestion =
    mode === "exam"
      ? rules.examCorrect
      : rules.practiceCorrect;

  let xp =
    correct * perQuestion;

  if (total > 0 && correct === total) {
    xp += rules.perfectBonus;
  }

  if (
    total > 0 &&
    correct / total >= 0.8
  ) {
    xp += rules.highScoreBonus;
  }

  xp +=
    mode === "exam"
      ? rules.completedExam
      : rules.completedPractice;

  return xp;
};

/* =========================================================
   APP METADATA
   ========================================================= */

window.STUDENT_STUDY_HUB = {
  version: "2.0",
  name: "STUDENT STUDY HUB",
  creator: "BALOGUN MUIZ",
  school: "ST PETER'S COLLEGE OLOMORE",
  session: "2026/27 ACADEMIC SESSION"
};

/* Compatibility aliases */
window.SSH = window.STUDENT_STUDY_HUB;
window.APP_DATA = window.STUDENT_STUDY_HUB;

console.log(
  "Student Study Hub data loaded:",
  window.QBANK.length,
  "questions currently registered."
); 