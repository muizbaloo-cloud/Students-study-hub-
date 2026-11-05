/* questions-old.js: hand-written questions carried over from the old Competition Prep Hub app.
   Checked again on the way across. Questions that referred to a missing diagram were left out. */
(function () {
  const A = addQ;
  const M = "Mathematics", E = "English Language", P = "Physics", C = "Chemistry", B = "Biology",
        F = "Further Mathematics", K = "Computer Science", N = "Economics", G = "Government", H = "Geography";

  /* ----- Mathematics ----- */
  A(M, "SS1", "Algebra", "Simplify 4(2x − 3) + 5.", ["8x − 7", "8x − 12", "8x + 2", "6x − 7"], 0, "Expand: 4(2x − 3) = 8x − 12; adding 5 gives 8x − 7.");
  A(M, "SS1", "Probability", "A fair six-sided die is rolled once. What is the probability of obtaining a number greater than 4?", ["1/6", "1/3", "1/2", "2/3"], 1, "The favourable outcomes are 5 and 6, so the probability is 2/6 = 1/3.");
  A(M, "SS2", "Plane Geometry & Polygons", "In the triangle shown, two angles are 48° and 67°. Find angle x.", ["55°", "65°", "75°", "85°"], 1, "Angles in a triangle add up to 180°. Therefore x = 180° − 48° − 67° = 65°.", { diagram: "triangle" });
  A(M, "SS2", "Plane Geometry & Polygons", "A straight line is divided into angles x and 128°. Find x.", ["42°", "52°", "62°", "72°"], 1, "Angles on a straight line add up to 180°, so x = 180° − 128° = 52°.", { diagram: "straight-line" });
  A(M, "SS2", "Mensuration", "A circle has radius 7 cm. Calculate its area using π = 22/7.", ["44 cm²", "77 cm²", "154 cm²", "308 cm²"], 2, "Area = πr² = (22/7) × 7² = 154 cm².", { diagram: "circle" });
  A(M, "SS2", "Mensuration", "A triangular prism has a triangular cross-section with base 6 cm and perpendicular height 4 cm. Its length is 10 cm. Find its volume.", ["60 cm³", "100 cm³", "120 cm³", "240 cm³"], 2, "Triangle area = ½ × 6 × 4 = 12 cm². Volume = 12 × 10 = 120 cm³.", { diagram: "prism" });
  A(M, "SS3", "Trigonometry", "A ladder 13 m long rests against a vertical wall. Its foot is 5 m from the wall. Calculate the angle the ladder makes with the ground, correct to 1 decimal place, and the height reached on the wall.", ["67.4° and 12 m", "22.6° and 12 m", "67.4° and 8 m", "22.6° and 8 m"], 0, "The right triangle has hypotenuse 13 m and adjacent side 5 m. cos θ = 5/13, so θ ≈ 67.4°. By Pythagoras, height² = 13² − 5² = 144, hence height = 12 m.");
  A(M, "SS3", "Trigonometry", "From a point on level ground 24 m from the foot of a tower, the angle of elevation of its top is 35°. A flagpole of height 3 m stands on top. Find the height of the tower only, correct to 1 decimal place. Take tan 35° = 0.7002.", ["13.8 m", "16.8 m", "19.8 m", "34.3 m"], 1, "Let the tower height be h. tan 35° = h/24, so h = 24 × 0.7002 = 16.8048 m ≈ 16.8 m. The question asks for the tower only, so do not include the flagpole.");
  A(M, "SS3", "Bearings & Distances", "A boat travels 12 km due east from P to Q, then 5 km due north to R. Calculate (i) the straight-line distance PR and (ii) the bearing of R from P, to the nearest degree.", ["13 km; 067°", "17 km; 023°", "13 km; 023°", "7 km; 067°"], 0, "PR = √(12² + 5²) = 13 km. Bearing is measured clockwise from north. The angle east of north satisfies tan θ = 12/5, so θ ≈ 67°. Bearing = 067°.");
  A(M, "SS3", "Quadratic Equations", "The length of a rectangle is 3 cm more than its width. Its area is 54 cm². Form a quadratic equation and find the dimensions of the rectangle.", ["6 cm by 9 cm", "3 cm by 18 cm", "−6 cm by −9 cm", "5 cm by 10 cm"], 0, "Let the width be x cm; the length is x + 3. Then x(x + 3) = 54, so x² + 3x − 54 = 0, which factorises as (x + 9)(x − 6) = 0. The positive width is 6 cm and the length is 9 cm.");
  A(M, "SS3", "Indices & Logarithms", "Solve 3^(2x − 1) = 27^(x − 2).", ["x = 5", "x = 3", "No solution", "Every real number is a solution"], 0, "Since 27 = 3³, the equation becomes 3^(2x − 1) = 3^(3x − 6). Equate exponents: 2x − 1 = 3x − 6, hence x = 5.");
  A(M, "SS3", "Mensuration", "A closed cylinder has radius 7 cm and height 10 cm. Calculate its total surface area using π = 22/7. Remember to include both circular ends.", ["440 cm²", "748 cm²", "594 cm²", "308 cm²"], 1, "Total surface area = 2πr² + 2πrh = 2(22/7)(49) + 2(22/7)(7)(10) = 308 + 440 = 748 cm².");
  A(M, "SS3", "Coordinate Geometry", "A line passes through A(−2, 5) and B(4, −1). Find its gradient and the equation of the line in the form y = mx + c.", ["m = −1; y = −x + 3", "m = 1; y = x + 3", "m = −6; y = −6x + 1", "m = −1; y = −x − 3"], 0, "Gradient m = (−1 − 5)/(4 − (−2)) = −6/6 = −1. Substitute A(−2, 5) into y = −x + c: 5 = 2 + c, so c = 3. Hence y = −x + 3.");
  A(M, "SS3", "Statistics", "The mean of five numbers was reported as 14. Later, it was discovered that one value had been entered as 10 instead of 16. What is the corrected mean?", ["14.0", "14.8", "15.2", "16.0"], 2, "The reported total was 5 × 14 = 70. Correcting the entry from 10 to 16 increases the total by 6, giving 76. The corrected mean is 76 ÷ 5 = 15.2.");
  A(M, "SS2", "Statistics", "The mean of 8 observations is 12.5. One observation was recorded as 9 instead of 15, while another was recorded as 18 instead of 13. Find the corrected mean.", ["11.875", "12.125", "12.625", "13.125"], 2, "Recorded total = 8 × 12.5 = 100. Correct the two entries: add 15 − 9 = 6 and subtract 18 − 13 = 5. Correct total = 100 + 6 − 5 = 101. Corrected mean = 101 ÷ 8 = 12.625.");
  A(M, "SS2", "Statistics", "The mean of 6 numbers is 17. The mean of the first four numbers is 15, and the fifth number is 21. Find the sixth number.", ["19", "20", "21", "22"], 2, "The total of all six numbers = 6 × 17 = 102. The first four sum to 4 × 15 = 60. Including the fifth gives 60 + 21 = 81. The sixth number is 102 − 81 = 21.");
  A(M, "SS3", "Circle Geometry", "In a circle, the angle at the centre subtended by chord AB is 124°. Point C lies on the major arc AB. Find angle ACB.", ["28°", "62°", "124°", "236°"], 1, "The angle at the circumference standing on the same minor arc AB is half the angle at the centre: 124° ÷ 2 = 62°.");
  A(M, "SS3", "Mensuration", "A solid cylinder of radius 3 cm and height 10 cm is melted and recast into identical spheres of radius 1 cm. How many complete spheres can be made?", ["45", "60", "67", "90"], 2, "Cylinder volume = π × 3² × 10 = 90π. One sphere has volume (4/3)π × 1³. Number = 90π ÷ ((4/3)π) = 67.5, so 67 complete spheres can be made.");
  A(M, "SS3", "Bearings & Distances", "A hiker walks 8 km due east and then 15 km due north. Calculate the distance from the starting point and the three-figure bearing of the hiker from the start.", ["17 km; 028°", "17 km; 062°", "23 km; 028°", "23 km; 062°"], 0, "Distance = √(8² + 15²) = 17 km. Bearing is measured clockwise from north. tan θ = east/north = 8/15, so θ ≈ 28°. Bearing = 028°.");
  A(M, "SS3", "Quadratic Equations", "A rectangle has perimeter 34 cm and area 60 cm². Find its dimensions.", ["5 cm by 12 cm", "6 cm by 10 cm", "4 cm by 15 cm", "3 cm by 20 cm"], 0, "A perimeter of 34 cm means length + width = 17. The dimensions must also multiply to 60. The pair 12 and 5 has sum 17 and product 60, so the dimensions are 12 cm by 5 cm.");
  A(M, "SS3", "Indices & Logarithms", "Given log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, evaluate log₁₀ 72 correct to 3 decimal places.", ["1.556", "1.857", "1.477", "2.079"], 1, "72 = 2³ × 3², so log 72 = 3 log 2 + 2 log 3 = 3(0.3010) + 2(0.4771) = 1.8572. To 3 decimal places, the answer is 1.857.");
  A(M, "SS3", "Coordinate Geometry", "A straight line passes through (−3, 7) and (5, −1). Find its equation and its x-intercept.", ["y = −x + 4; x-intercept 4", "y = x + 4; x-intercept −4", "y = −x + 7; x-intercept 7", "y = 2x + 1; x-intercept −0.5"], 0, "Gradient = (−1 − 7)/(5 − (−3)) = −1. Using y = −x + c and the point (−3, 7), c = 4. Set y = 0 to obtain x = 4.");
  A(M, "SS3", "Probability", "A bag contains 5 red, 3 blue and 2 green counters. Two counters are drawn at random without replacement. Find the probability that both are blue.", ["1/15", "1/10", "1/5", "2/15"], 0, "P(first blue) = 3/10 and P(second blue given first blue) = 2/9. Multiply: 3/10 × 2/9 = 6/90 = 1/15.");
  A(M, "SS3", "Circle Geometry", "A tangent touches a circle at T. The radius OT is 7 cm. A point P lies on the tangent and TP = 24 cm. Find OP.", ["17 cm", "25 cm", "31 cm", "49 cm"], 1, "The radius is perpendicular to the tangent at T, so triangle OTP is right-angled. OP = √(7² + 24²) = √625 = 25 cm.");
  A(M, "SS2", "Quadratic Equations", "Solve x² − 7x + 12 = 0.", ["x = 2 or 6", "x = 3 or 4", "x = −3 or −4", "x = 1 or 12"], 1, "Factorise as (x − 3)(x − 4) = 0, so x = 3 or 4.");
  A(M, "SS2", "Indices & Logarithms", "Evaluate log₁₀ 1000.", ["2", "3", "10", "100"], 1, "Since 10³ = 1000, log₁₀ 1000 = 3.");
  A(M, "SS3", "Trigonometry", "If sin θ = 1/2 and θ is acute, θ equals:", ["30°", "45°", "60°", "90°"], 0, "The acute angle whose sine is 1/2 is 30°.");
  A(M, "SS3", "Statistics", "Find the median of 3, 9, 5, 7, 1.", ["3", "5", "7", "9"], 1, "Arrange the values as 1, 3, 5, 7, 9; the middle value is 5.");

  /* ----- English Language ----- */
  A(E, "SS1", "Grammar", "Choose the sentence with correct subject–verb agreement.", ["The list of items are on the desk.", "The list of items is on the desk.", "The list of items were on the desk.", "The list of items have been on the desk."], 1, "The subject is the singular noun “list”, so the singular verb “is” is required.");
  A(E, "SS1", "Vocabulary", "In “The path was narrow, so only one person could pass at a time,” what does “narrow” mean?", ["Very long", "Not wide", "Extremely steep", "Completely blocked"], 1, "The context indicates that the path was not wide.");
  A(E, "SS2", "Grammar", "Choose the correct reported speech: He said, “I am tired.”", ["He said that I am tired.", "He said that he was tired.", "He says he was tired.", "He said he is tiring."], 1, "In reported speech, the pronoun and tense normally shift: “I am” becomes “he was”.");
  A(E, "SS2", "Figures of Speech", "“The classroom was a zoo” is an example of:", ["Simile", "Metaphor", "Alliteration", "Irony"], 1, "It directly describes one thing as another, so it is a metaphor.");
  A(E, "SS3", "Vocabulary", "Choose the word nearest in meaning to “reluctant”.", ["Eager", "Unwilling", "Careless", "Proud"], 1, "Reluctant means unwilling or hesitant to do something.");
  A(E, "SS3", "Sentence Completion", "Neither the teacher nor the students ___ present.", ["was", "is", "were", "has"], 2, "With neither…nor, the verb agrees with the nearer subject; “students” is plural, so “were” is correct.");

  /* ----- Physics ----- */
  A(P, "SS1", "Mechanics", "A cyclist travels 150 m in 30 s at constant speed. Calculate the speed.", ["3 m/s", "5 m/s", "30 m/s", "180 m/s"], 1, "Speed = distance ÷ time = 150 ÷ 30 = 5 m/s.");
  A(P, "SS1", "Heat", "Which method of heat transfer can occur through a vacuum?", ["Conduction", "Convection", "Radiation", "Conduction and convection only"], 2, "Radiation transfers energy by electromagnetic waves and does not need a material medium.");
  A(P, "SS2", "Mechanics", "A 4 kg body accelerates at 3 m/s². Find the resultant force.", ["7 N", "12 N", "1.33 N", "24 N"], 1, "Newton’s second law gives F = ma = 4 × 3 = 12 N.");
  A(P, "SS2", "Waves", "A wave has frequency 20 Hz and wavelength 3 m. Its speed is:", ["6.67 m/s", "17 m/s", "23 m/s", "60 m/s"], 3, "Wave speed v = fλ = 20 × 3 = 60 m/s.");
  A(P, "SS3", "Electricity", "A 6 Ω resistor is connected to 12 V. What current flows?", ["0.5 A", "2 A", "6 A", "72 A"], 1, "Ohm’s law: I = V/R = 12/6 = 2 A.");
  A(P, "SS3", "Light", "The bending of light as it passes from air into glass is called:", ["Reflection", "Diffraction", "Refraction", "Dispersion only"], 2, "Refraction is the change in direction caused by a change in wave speed between media.");

  /* ----- Chemistry ----- */
  A(C, "SS1", "Atomic Structure", "An atom has atomic number 13 and mass number 27. How many neutrons does it contain?", ["13", "14", "27", "40"], 1, "Neutrons = mass number − atomic number = 27 − 13 = 14.");
  A(C, "SS1", "Periodic Table", "Elements in the same group generally have similar chemical properties because they have similar numbers of:", ["Neutrons", "Occupied shells", "Outer-shell electrons", "Nucleons"], 2, "Outer-shell electron arrangements strongly influence chemical behaviour.");
  A(C, "SS2", "Stoichiometry", "How many moles are in 18 g of water? (H₂O = 18 g/mol)", ["0.5 mol", "1 mol", "2 mol", "18 mol"], 1, "Moles = mass ÷ molar mass = 18 ÷ 18 = 1 mol.");
  A(C, "SS2", "Acids Bases & Salts", "Which pH value indicates an acidic solution at room temperature?", ["2", "7", "9", "14"], 0, "A pH below 7 is acidic at room temperature.");
  A(C, "SS3", "Organic Chemistry", "The functional group in ethanol is:", ["–COOH", "–OH", "–CHO", "–NH₂"], 1, "Ethanol is an alcohol and contains the hydroxyl group, –OH.");
  A(C, "SS3", "Electrochemistry", "Oxidation is best described as:", ["Gain of electrons", "Loss of electrons", "Gain of neutrons", "Loss of protons only"], 1, "In electron-transfer terms, oxidation is loss of electrons.");

  /* ----- Biology ----- */
  A(B, "SS1", "Cell Biology", "Which cell structure regulates the movement of many substances into and out of a cell?", ["Cell membrane", "Ribosome", "Nucleolus", "Chromosome"], 0, "The selectively permeable cell membrane regulates exchange with the surroundings.");
  A(B, "SS1", "Nutrition", "Which reagent is commonly used to test a food sample for starch?", ["Benedict’s solution", "Iodine solution", "Biuret reagent", "Ethanol only"], 1, "Iodine solution turns blue-black when starch is present.");
  A(B, "SS3", "Genetics", "If T is dominant over t, which genotype is heterozygous?", ["TT", "Tt", "tt", "None"], 1, "A heterozygote has two different alleles: T and t.");
  A(B, "SS2", "Ecology", "Green plants are called producers because they:", ["Feed on animals", "Make organic food using light energy", "Decompose dead matter", "Absorb ready-made food only"], 1, "Producers make organic food, usually by photosynthesis.");
  A(B, "SS3", "Reproduction", "Fertilisation in humans usually occurs in the:", ["Uterus", "Oviduct (fallopian tube)", "Cervix", "Vagina"], 1, "The sperm and egg usually meet in the oviduct.");
  A(B, "SS2", "Human Systems", "Which blood component is mainly responsible for clotting?", ["Red blood cells", "Platelets", "Plasma water only", "Neurons"], 1, "Platelets help form clots that reduce blood loss.");

  /* ----- Further Mathematics ----- */
  A(F, "SS1", "Algebra", "Expand (x + 4)(x − 2).", ["x² + 2x − 8", "x² − 2x + 8", "x² + 6x − 8", "x² − 8"], 0, "Multiply term by term: x² − 2x + 4x − 8 = x² + 2x − 8.");
  A(F, "SS1", "Functions", "If f(x) = 3x − 2, find f(5).", ["8", "13", "15", "17"], 1, "f(5) = 3(5) − 2 = 13.");
  A(F, "SS2", "Matrices", "For A = [[1, 2], [3, 4]], what is det(A)?", ["−2", "2", "10", "−10"], 0, "The determinant is ad − bc = (1 × 4) − (2 × 3) = −2.");
  A(F, "SS2", "Vectors", "The magnitude of the vector (3, 4) is:", ["5", "7", "12", "25"], 0, "Magnitude = √(3² + 4²) = √25 = 5.");
  A(F, "SS3", "Probability", "A fair coin is tossed twice. The probability of two heads is:", ["1/2", "1/3", "1/4", "3/4"], 2, "The equally likely outcomes are HH, HT, TH, TT; only one of the four is HH.");

  /* ----- Computer Science ----- */
  A(K, "SS1", "Hardware", "Which computer component performs most arithmetic and logical operations?", ["Monitor", "Keyboard", "CPU", "Speaker"], 2, "The CPU executes instructions and performs arithmetic and logical operations.");
  A(K, "SS1", "Data Representation", "What is the decimal equivalent of binary 1101₂?", ["11", "12", "13", "14"], 2, "1101₂ = 8 + 4 + 0 + 1 = 13.");
  A(K, "SS2", "Algorithms", "In a flowchart, which symbol usually represents a decision?", ["Oval", "Diamond", "Rectangle", "Parallelogram"], 1, "A diamond represents a decision or condition with branching paths.");
  A(K, "SS2", "Programming", "A variable in a program is used to:", ["Store a value that can be referenced", "Print paper", "Cool the processor", "Connect a monitor only"], 0, "A variable names a storage location or value used by a program.");
  A(K, "SS3", "Databases", "A primary key in a table should uniquely identify each:", ["Column heading", "Record", "Database file only", "Query language"], 1, "A primary key uniquely identifies each record in a table.");
  A(K, "SS3", "Networking", "Which device forwards data between different networks?", ["Router", "Keyboard", "Scanner", "Plotter"], 0, "A router directs packets between networks.");

  /* ----- Economics ----- */
  A(N, "SS1", "Demand & Supply", "Other things being equal, what normally happens to quantity demanded when the price of a good rises?", ["It rises", "It falls", "It always doubles", "It becomes unlimited"], 1, "The law of demand says a higher price is generally associated with a lower quantity demanded, other things equal.");
  A(N, "SS1", "Production", "Which factor of production includes tools and machinery?", ["Land", "Labour", "Capital", "Entrepreneurship"], 2, "Capital includes produced assets such as tools, machinery and equipment used in production.");
  A(N, "SS2", "Market Structures", "A market with one seller and no close substitutes is called:", ["Perfect competition", "Monopoly", "Oligopoly", "Monopsony"], 1, "A monopoly has a single seller with substantial control over supply.");
  A(N, "SS2", "Money & Banking", "Which is a major function of the central bank?", ["Selling every household’s goods", "Issuing currency and managing monetary policy", "Setting every worker’s salary", "Producing all crops"], 1, "A central bank issues currency and implements monetary policy.");
  A(N, "SS3", "National Income", "GDP measures the value of final goods and services produced:", ["By citizens anywhere only", "Within a country during a period", "Only by government offices", "Only for export"], 1, "Gross domestic product measures final output produced within a country over a period.");
  A(N, "SS3", "Demand & Supply", "If supply increases while demand stays constant, equilibrium price will generally:", ["Rise", "Fall", "Stay fixed in every case", "Become zero in every case"], 1, "An increase in supply usually lowers the equilibrium price, other things equal.");

  /* ----- Government ----- */
  A(G, "SS1", "Citizenship", "Which action is an example of a civic responsibility in a democratic society?", ["Destroying public property", "Obeying lawful regulations", "Preventing others from voting", "Ignoring every court order"], 1, "Respecting lawful regulations supports orderly public life.");
  A(G, "SS1", "Constitution", "A constitution primarily sets out the:", ["Rules and framework for governing a state", "Daily timetable of every school", "Prices of all goods in markets", "Private opinions of every citizen"], 0, "A constitution establishes the framework of government, its institutions, powers and citizens’ rights.");
  A(G, "SS2", "Political Institutions", "The main function of the judiciary is to:", ["Interpret laws and administer justice", "Make all school rules", "Conduct every election directly", "Print currency"], 0, "The judiciary interprets laws and resolves legal disputes.");
  A(G, "SS2", "Electoral Systems", "A secret ballot is designed mainly to protect voters’:", ["Privacy and freedom of choice", "Income tax records", "School attendance", "Driving skills"], 0, "A secret ballot helps voters choose without others knowing their vote.");
  A(G, "SS3", "Public Administration", "The civil service mainly helps government to:", ["Implement policies and provide administrative continuity", "Replace all elected officials", "Make every private business decision", "Conduct court trials"], 0, "Civil servants support the administration and implementation of public policy.");
  A(G, "SS3", "Constitution", "Separation of powers divides governmental authority among the:", ["Three arms of government", "Three largest towns", "Political parties only", "Media houses"], 0, "Legislative, executive and judicial powers are separated to limit concentration of power.");

  /* ----- Geography ----- */
  A(H, "SS1", "Map Reading", "On a map with scale 1:25,000, what ground distance is represented by 4 cm?", ["100 m", "250 m", "1 km", "10 km"], 2, "1 cm represents 250 m, so 4 cm represents 1,000 m = 1 km.");
  A(H, "SS1", "Weather & Climate", "Which instrument measures wind speed?", ["Barometer", "Anemometer", "Rain gauge", "Thermometer"], 1, "An anemometer measures wind speed; a barometer measures atmospheric pressure.");
  A(H, "SS2", "Population", "Population density is calculated as:", ["Area ÷ population", "Population ÷ area", "Births ÷ rainfall", "Area × temperature"], 1, "Population density equals the number of people divided by land area.");
  A(H, "SS2", "Agriculture", "Which factor is especially important for the growth of most crops?", ["Suitable soil and water", "Only road signs", "Magnetic declination", "Ocean salinity everywhere"], 0, "Most crops need suitable soil nutrients and sufficient water, alongside other conditions.");
  A(H, "SS3", "Geomorphology", "The wearing away and removal of rock or soil by agents such as water is:", ["Erosion", "Condensation", "Evaporation", "Deposition only"], 0, "Erosion involves detachment and transport of material by water, wind, ice or gravity.");
  A(H, "SS3", "Weather & Climate", "Lines joining places of equal atmospheric pressure on a weather map are:", ["Isobars", "Isotherms", "Contours", "Latitudes"], 0, "Isobars connect locations with equal atmospheric pressure.");
})();
