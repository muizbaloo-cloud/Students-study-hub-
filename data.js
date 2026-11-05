/* data.js: subjects, classes and topic lists. */

window.SUBJECTS = ["Mathematics", "English Language", "Physics", "Chemistry", "Biology", "Further Mathematics", "Computer Science", "Economics", "Government", "Geography"];

window.LEVELS = ["SS1", "SS2", "SS3", "All SS levels"];

window.TOPICS = {
  "Mathematics": ["Number Bases", "Fractions, Decimals & Percentages", "Approximation", "Ratio & Proportion", "Sets", "Algebra", "Linear Equations & Inequalities", "Simultaneous Equations", "Sequences & Series", "Variation", "Quadratic Equations", "Indices & Logarithms", "Surds", "Trigonometry", "Bearings & Distances", "Coordinate Geometry", "Mensuration", "Circle Geometry", "Vectors", "Matrices", "Calculus", "Statistics", "Probability", "Plane Geometry & Polygons", "Mathematical Logic"],
  "English Language": ["Grammar", "Parts of Speech", "Nouns & Pronouns", "Tenses", "Concord", "Clauses & Phrases", "Punctuation", "Vocabulary", "Synonyms & Antonyms", "Idioms", "Comprehension", "Summary Writing", "Sentence Completion", "Oral English", "Essay Writing", "Formal & Informal Letters", "Reports & Articles", "Figures of Speech"],
  "Physics": ["Measurements & Units", "Scalars & Vectors", "Mechanics", "Motion", "Forces", "Work Energy & Power", "Simple Machines", "Pressure", "Heat", "Gas Laws", "Waves", "Sound", "Light", "Electricity", "Magnetism", "Electromagnetic Induction", "Atomic Physics", "Radioactivity", "Modern Physics"],
  "Chemistry": ["Matter & Separation Techniques", "Atomic Structure", "Chemical Bonding", "Periodic Table", "Chemical Formulae & Equations", "Mole Concept", "Stoichiometry", "Gas Laws", "Acids Bases & Salts", "Oxidation & Reduction", "Rates of Reaction", "Chemical Equilibrium", "Electrochemistry", "Metals & Non-metals", "Organic Chemistry", "Hydrocarbons", "Polymers", "Environmental Chemistry"],
  "Biology": ["Characteristics of Living Things", "Cell Biology", "Cell Division", "Classification of Living Things", "Nutrition", "Transport in Plants & Animals", "Respiration", "Excretion", "Support & Movement", "Nervous & Hormonal Coordination", "Human Systems", "Reproduction", "Genetics", "Evolution", "Ecology", "Adaptation", "Conservation", "Microorganisms & Disease"],
  "Further Mathematics": ["Number Systems", "Algebra", "Functions", "Polynomial Equations", "Complex Numbers", "Matrices", "Determinants", "Vectors", "Trigonometry", "Coordinate Geometry", "Differentiation", "Integration", "Mechanics", "Probability", "Statistics", "Series"],
  "Computer Science": ["Computer Fundamentals", "Hardware", "Software", "Data Representation", "Number Systems", "Algorithms", "Flowcharts & Pseudocode", "Programming", "Boolean Logic", "Operating Systems", "Databases", "Networking", "Internet & Web", "Cybersecurity Basics", "Systems Analysis", "Spreadsheets"],
  "Economics": ["Basic Economic Concepts", "Demand & Supply", "Elasticity", "Production", "Factors of Production", "Cost & Revenue", "Market Structures", "National Income", "Money & Banking", "Inflation & Unemployment", "Public Finance", "International Trade", "Economic Growth & Development", "Population & Labour", "Agriculture & Industry", "Nigerian Economy"],
  "Government": ["Meaning & Scope of Government", "Constitution", "Citizenship", "Political Socialisation", "Political Parties", "Electoral Systems", "Public Opinion", "Pressure Groups", "Political Institutions", "Legislature", "Executive", "Judiciary", "Public Administration", "Local Government", "Federalism", "Public Policy", "Foreign Policy", "International Organisations"],
  "Geography": ["Map Reading", "Scale & Bearings", "Latitude & Longitude", "Earth Structure", "Rocks & Minerals", "Weather & Climate", "Weather Instruments", "Geomorphology", "Drainage", "Soils & Vegetation", "Population", "Settlement", "Agriculture", "Natural Resources", "Industry & Transport", "Environmental Issues", "Map Interpretation", "Nigeria & Africa"]
};

window.LEVEL_TOPICS = {
  "Mathematics": {
    "SS1": ["Number Bases", "Fractions, Decimals & Percentages", "Approximation", "Ratio & Proportion", "Sets", "Algebra", "Linear Equations & Inequalities", "Simultaneous Equations", "Sequences & Series", "Variation", "Mensuration", "Plane Geometry & Polygons", "Statistics", "Probability"],
    "SS2": ["Quadratic Equations", "Indices & Logarithms", "Surds", "Trigonometry", "Bearings & Distances", "Coordinate Geometry", "Circle Geometry", "Plane Geometry & Polygons", "Mathematical Logic", "Mensuration", "Vectors", "Matrices", "Statistics", "Probability"],
    "SS3": ["Quadratic Equations", "Indices & Logarithms", "Trigonometry", "Coordinate Geometry", "Mensuration", "Circle Geometry", "Vectors", "Matrices", "Calculus", "Statistics", "Probability"]
  },
  "English Language": {
    "SS1": ["Parts of Speech", "Nouns & Pronouns", "Tenses", "Concord", "Clauses & Phrases", "Punctuation", "Vocabulary", "Synonyms & Antonyms", "Comprehension", "Essay Writing", "Oral English"],
    "SS2": ["Grammar", "Tenses", "Concord", "Vocabulary", "Synonyms & Antonyms", "Idioms", "Comprehension", "Summary Writing", "Sentence Completion", "Oral English", "Formal & Informal Letters", "Figures of Speech"],
    "SS3": ["Grammar", "Concord", "Vocabulary", "Comprehension", "Summary Writing", "Essay Writing", "Formal & Informal Letters", "Reports & Articles", "Oral English", "Figures of Speech"]
  },
  "Physics": {
    "SS1": ["Measurements & Units", "Scalars & Vectors", "Mechanics", "Motion", "Forces", "Work Energy & Power", "Simple Machines", "Pressure", "Heat"],
    "SS2": ["Motion", "Forces", "Heat", "Gas Laws", "Waves", "Sound", "Light", "Electricity", "Magnetism"],
    "SS3": ["Waves", "Sound", "Light", "Electricity", "Magnetism", "Electromagnetic Induction", "Atomic Physics", "Radioactivity", "Modern Physics"]
  },
  "Chemistry": {
    "SS1": ["Matter & Separation Techniques", "Atomic Structure", "Chemical Bonding", "Periodic Table", "Chemical Formulae & Equations", "Mole Concept"],
    "SS2": ["Mole Concept", "Stoichiometry", "Gas Laws", "Acids Bases & Salts", "Oxidation & Reduction", "Rates of Reaction", "Chemical Equilibrium", "Metals & Non-metals"],
    "SS3": ["Organic Chemistry", "Hydrocarbons", "Polymers", "Electrochemistry", "Stoichiometry", "Environmental Chemistry", "Chemical Equilibrium"]
  },
  "Biology": {
    "SS1": ["Characteristics of Living Things", "Cell Biology", "Cell Division", "Classification of Living Things", "Nutrition", "Transport in Plants & Animals", "Respiration"],
    "SS2": ["Transport in Plants & Animals", "Respiration", "Excretion", "Support & Movement", "Nervous & Hormonal Coordination", "Human Systems", "Reproduction", "Ecology"],
    "SS3": ["Reproduction", "Genetics", "Evolution", "Ecology", "Adaptation", "Conservation", "Microorganisms & Disease"]
  },
  "Further Mathematics": {
    "SS1": ["Number Systems", "Algebra", "Functions", "Polynomial Equations", "Trigonometry", "Coordinate Geometry"],
    "SS2": ["Complex Numbers", "Matrices", "Determinants", "Vectors", "Trigonometry", "Mechanics", "Probability", "Statistics"],
    "SS3": ["Matrices", "Vectors", "Differentiation", "Integration", "Mechanics", "Probability", "Statistics", "Series"]
  },
  "Computer Science": {
    "SS1": ["Computer Fundamentals", "Hardware", "Software", "Data Representation", "Number Systems", "Operating Systems", "Spreadsheets"],
    "SS2": ["Algorithms", "Flowcharts & Pseudocode", "Programming", "Boolean Logic", "Databases", "Networking", "Internet & Web"],
    "SS3": ["Algorithms", "Programming", "Databases", "Networking", "Cybersecurity Basics", "Systems Analysis", "Spreadsheets"]
  },
  "Economics": {
    "SS1": ["Basic Economic Concepts", "Demand & Supply", "Elasticity", "Production", "Factors of Production", "Cost & Revenue"],
    "SS2": ["Market Structures", "Money & Banking", "Inflation & Unemployment", "Public Finance", "International Trade", "Agriculture & Industry"],
    "SS3": ["National Income", "Market Structures", "Money & Banking", "Economic Growth & Development", "Population & Labour", "Nigerian Economy"]
  },
  "Government": {
    "SS1": ["Meaning & Scope of Government", "Constitution", "Citizenship", "Political Socialisation", "Political Parties"],
    "SS2": ["Electoral Systems", "Public Opinion", "Pressure Groups", "Political Institutions", "Legislature", "Executive", "Judiciary", "Federalism"],
    "SS3": ["Public Administration", "Local Government", "Federalism", "Public Policy", "Foreign Policy", "International Organisations", "Constitution"]
  },
  "Geography": {
    "SS1": ["Map Reading", "Scale & Bearings", "Latitude & Longitude", "Earth Structure", "Rocks & Minerals", "Weather & Climate", "Weather Instruments"],
    "SS2": ["Geomorphology", "Drainage", "Soils & Vegetation", "Population", "Settlement", "Agriculture", "Natural Resources", "Industry & Transport"],
    "SS3": ["Natural Resources", "Geomorphology", "Environmental Issues", "Map Interpretation", "Nigeria & Africa", "Weather & Climate", "Population"]
  }
};

/* ---------- question bank helpers ---------- */
window.QBANK = window.QBANK || [];
// addQ(subject, level, topic, question, [options], correctIndex, explanation, {extra fields})
window.addQ = function (subject, level, topic, q, options, answer, explanation, extra) {
  window.QBANK.push(Object.assign({
    id: "h" + (window.QBANK.length + 1), subject: subject, level: level, topic: topic,
    exam: "Practice", year: "", q: q, options: options, answer: answer, explanation: explanation
  }, extra || {}));
};
