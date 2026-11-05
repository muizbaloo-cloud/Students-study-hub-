/* pastpapers.js: WAEC Mathematics past questions carried over from the old app, listed by year.
   Objective questions that can be answered from the text also go into the quiz bank (exam "WAEC").
   Items marked flag: the printed question is faulty or needs its diagram, so they are shown but never marked/quizzed. */
(function () {
  const L = [];
  const SRC = "Supplied 2023 WASSCE Mathematics PDF";
  function pp(year, paper, number, type, topic, prompt, extra) {
    L.push(Object.assign({ id: year + "-" + paper.replace(/\D/g, "") + "-" + String(number).replace(/[^a-zA-Z0-9]/g, ""), subject: "Mathematics", exam: "WAEC", year: year, paper: paper, number: String(number), type: type, topic: topic, prompt: prompt }, extra || {}));
  }
  const OB = (n, topic, prompt, options, ans, exp, extra) => pp("2023", "Paper 1", n, "Objective", topic, prompt, Object.assign({ options: options, answer: ans, explanation: exp, sourceLabel: SRC, quiz: true }, extra || {}));
  const FLAG = (n, topic, prompt, flag, options) => pp("2023", "Paper 1", n, "Objective", topic, prompt, { options: options, flag: flag, quiz: false, sourceLabel: SRC });
  const TH = (year, n, topic, prompt, extra) => pp(year, "Paper 2", n, "Theory", topic, prompt, extra);

  /* ---------- 2023 Paper 1 (objectives) ---------- */
  OB(1, "Approximation", "Evaluate, correct to three decimal places: (4.314 × 0.000056) ÷ 0.0067.", ["0.361", "0.036", "0.037", "0.004"], 1, "4.314 × 0.000056 = 0.000241584. Dividing by 0.0067 gives 0.036057…, which is 0.036 to three decimal places.");
  OB(2, "Sets", "There are 30 students. 15 study woodwork, 13 study metalwork and 6 study neither. How many study woodwork but not metalwork?", ["5", "9", "11", "13"], 2, "At least one subject: 30 − 6 = 24. Both: 15 + 13 − 24 = 4. Woodwork only: 15 − 4 = 11.");
  FLAG(3, "Indices & Logarithms", "Solve 2^(2x) + 2^x = (√2)^10. (Options as printed: 1/3, 1/2, 1/2, 1/4.)", "As printed, let t = 2ˣ. Then t² + t = 32, and its positive root is not among the listed options. The paper’s text seems to be misprinted, so this item is not marked.", ["1/3", "1/2", "1/2", "1/4"]);
  OB(4, "Surds", "Solve 1 + √(x − 3) = 4.", ["6", "12", "30", "66"], 1, "Subtract 1: √(x − 3) = 3. Square both sides: x − 3 = 9, so x = 12.");
  FLAG(5, "Number Bases", "Express 413₅ in base 5.", "As printed, 413₅ is already in base 5, so there is nothing to convert. The worked solution in the source converts 413₇ (= 206) to 1311₅, so the base in the question is probably a misprint. Not marked.");
  FLAG(6, "Indices & Logarithms", "Solve log₂ x + log_(1/2) x = 2.", "Since log_(1/2) x = −log₂ x, the left side is 0 for every x > 0, so the equation as printed has no solution. The options in the source seem to belong to another question. Not marked.");
  OB(7, "Linear Equations & Inequalities", "Mr. Manu is four times as old as his son Adu. Seven years ago the sum of their ages was 76 years. How old is Adu now?", ["12 years", "15 years", "18 years", "22 years"], 2, "Let Adu be x, so Mr. Manu is 4x. Seven years ago: (x − 7) + (4x − 7) = 76, so 5x = 90 and x = 18.");
  OB(8, "Algebra", "Factorise completely: x² − (y + z)².", ["(x − y + z)(x − y − z)", "(x + y + z)(x − y − z)", "(x + y − z)(x + y + z)", "(x − y − z)²"], 1, "Difference of two squares: a² − b² = (a − b)(a + b), so [x − (y + z)][x + (y + z)] = (x − y − z)(x + y + z).");
  OB(9, "Quadratic Equations", "Find the roots of 3m² − 2m − 65 = 0.", ["13/3 and 5", "13/3 and −5", "−13/3 and 5", "−13/3 and −5"], 2, "Factorise: (3m + 13)(m − 5) = 0, so m = −13/3 or m = 5.");
  OB(10, "Variation", "M varies jointly as n² and √q. If M = 24 when n = 2 and q = 4, find M when n = 5 and q = 9.", ["288", "400", "300", "225"], 3, "M = kn²√q. From 24 = k × 4 × 2, k = 3. Then M = 3 × 25 × 3 = 225.");
  OB(11, "Ratio & Proportion", "If m : n = 2⅓ : 1⅕ and n : q = 1½ : 1⅓, find q : m.", ["16 : 35", "35 : 16", "18 : 35", "35 : 18"], 0, "m : n = 7/3 : 6/5 = 35 : 18. n : q = 3/2 : 4/3 = 9 : 8. Make n the same in both: m : n : q = 35 : 18 : 16, so q : m = 16 : 35.");
  OB(12, "Simultaneous Equations", "One-third of the sum of two numbers is 12. Twice their difference is 12. Find the numbers.", ["21 and 15", "20 and 16", "22 and 14", "23 and 13"], 0, "a + b = 36 and a − b = 6, so a = 21 and b = 15.");
  OB(13, "Quadratic Equations", "Find the quadratic equation whose roots are 2/3 and 3/4.", ["y² + y − 6 = 0", "12y² − 17y + 6 = 0", "12y² + 17y − 6 = 0", "12y² − y + 6 = 0"], 1, "Sum of roots = 2/3 + 3/4 = 17/12 and product = 1/2. So y² − (17/12)y + 1/2 = 0, i.e. 12y² − 17y + 6 = 0. (Options corrected from the printed paper.)");
  OB(14, "Algebra", "Make x the subject of the formula y = (ax² + b) ÷ (3z), taking x as positive.", ["x = √(3zyb/a)", "x = √((3zy + b)/a)", "x = √((3zy − b)/a)", "x = √((3z²y + b)/a)"], 2, "3zy = ax² + b, so ax² = 3zy − b and x = √((3zy − b)/a).");
  OB(15, "Fractions, Decimals & Percentages", "The price of a shoe was decreased by 22%. If the new price was 27.30, what was the original price?", ["62.30", "42.30", "72.00", "35.00"], 3, "The new price is 78% of the original, so the original = 27.30 ÷ 0.78 = 35.00.");
  OB(16, "Mensuration", "A solid cylinder has radius 8 cm and height 14 cm. Find its total surface area, using π = 22/7, to two decimal places.", ["1106.28 cm²", "1016.29 cm²", "1106.29 cm²", "1206.27 cm²"], 2, "Total surface area = 2πr(r + h) = 2 × 22/7 × 8 × 22 = 1106.2857… ≈ 1106.29 cm².");
  FLAG(17, "Circle Geometry", "In a circle with centre O, NT = ST and ∠NTS = 36°. Find the angle marked z.", "The diagram showing where z is marked is not available, so the answer cannot be given safely. Not marked.");
  OB(18, "Mensuration", "A sphere has radius 3 cm. Find its volume in terms of π.", ["27π cm³", "108π cm³", "36π cm³", "30π cm³"], 2, "V = (4/3)πr³ = (4/3)π(27) = 36π cm³.");
  OB(19, "Number Bases", "Arrange 110₂, 31₄ and 42₅ in ascending order of magnitude.", ["110₂, 31₄, 42₅", "110₂, 42₅, 31₄", "31₄, 42₅, 110₂", "42₅, 31₄, 110₂"], 0, "110₂ = 6, 31₄ = 13 and 42₅ = 22. In ascending order: 110₂, 31₄, 42₅.");
  OB(20, "Approximation", "A notebook of true length 15 cm was measured as 16.8 cm. Find the percentage error to two decimal places.", ["12.00%", "11.71%", "11.0%", "10.71%"], 0, "Percentage error = |16.8 − 15| ÷ 15 × 100% = 12.00%.");
  FLAG(21, "Plane Geometry & Polygons", "Find m in the diagram.", "The question depends entirely on a diagram that is not available here. Not marked.");
  OB(22, "Coordinate Geometry", "A line through (6, −3) is parallel to the line through (2, 4) and (−3, 9). Find its equation.", ["y = −½x − 10", "y = −x + 3", "y = ½x − 6", "y = ½x + 6"], 1, "The gradient through (2, 4) and (−3, 9) is (9 − 4)/(−3 − 2) = −1. A parallel line through (6, −3): y + 3 = −(x − 6), so y = −x + 3. (Options corrected from the printed paper.)");
  OB(23, "Mensuration", "A cylindrical tank has diameter 140 cm. If 200 litres of water is poured in, find the height of the water to the nearest centimetre. (π = 22/7)", ["91 cm", "57 cm", "13 cm", "7 cm"], 2, "200 litres = 200 000 cm³. Radius = 70 cm. Height = 200000 ÷ ((22/7) × 4900) ≈ 12.99, so 13 cm.");
  OB(24, "Trigonometry", "A 58 m building is 110 m away. An observer is 2 m tall. Find the angle of elevation of the top of the building from the observer’s eye.", ["28°", "27°", "26°", "20°"], 1, "Height difference = 58 − 2 = 56 m. tan θ = 56/110, so θ ≈ 27°.");
  OB(25, "Statistics", "Find the mean deviation of 14, 15, 16, 17, 18 and 19.", ["1.7", "1.5", "2.5", "3.5"], 1, "Mean = 16.5. The absolute deviations are 2.5, 1.5, 0.5, 0.5, 1.5, 2.5, which add up to 9. Mean deviation = 9 ÷ 6 = 1.5.");
  OB(26, "Plane Geometry & Polygons", "The interior angle of a regular polygon is six times its exterior angle. Find the number of sides.", ["12", "14", "13", "10"], 1, "Interior + exterior = 180°, so 7 × exterior = 180°. Number of sides = 360° ÷ (180°/7) = 14.");
  OB(27, "Mensuration", "The diagonal of a square is 12 cm. Find its area.", ["36 cm²", "48 cm²", "72 cm²", "18 cm²"], 2, "Area = (diagonal)² ÷ 2 = 144 ÷ 2 = 72 cm².");
  OB(28, "Mathematical Logic", "Let p be “Siah is from Foya” and q be “Foya is in Lofa”. Write “If Siah is from Foya, then Foya is in Lofa” in symbols.", ["q ⇒ p", "p ⇔ q", "p ⇒ q", "¬q ⇒ p"], 2, "“If p, then q” is the implication p ⇒ q.");
  OB(29, "Coordinate Geometry", "Classify the triangle with vertices (3, −3), (6, 2) and (0, 4).", ["Isosceles triangle", "Equilateral triangle", "Right triangle", "Scalene triangle"], 3, "Squared side lengths: from (3, −3) to (6, 2): 9 + 25 = 34; from (6, 2) to (0, 4): 36 + 4 = 40; from (3, −3) to (0, 4): 9 + 49 = 58. All differ, and 34 + 40 ≠ 58, so the triangle is scalene (not right-angled).");

  /* ---------- 2023 Paper 2 (theory) ---------- */
  const T23 = (n, topic, prompt) => TH("2023", n, topic, prompt, { sourceLabel: SRC });
  T23("5 (check numbering)", "Trigonometry", "A boy stands at M on level ground; T is the foot of a vertical building and P is its top. The angle of elevation of P from M is 66°. He moves directly backwards to C and sees P at an angle of elevation of 53°. Given that MT = 50 m: (a) illustrate the information in a diagram; (b) calculate (i) the height of the building; (ii) the distance MC. Give answers correct to one decimal place.");
  T23("6(a)", "Sets", "M = {n : 2n − 3 ≤ 37}, where n is a counting number. (i) List all the elements of M. (ii) Find the probability that a randomly selected element of M is (α) a multiple of 3; (β) a factor of 10.");
  T23("6(b)", "Ratio & Proportion", "A shop owner shared an end-of-year bonus between Kontor and Gapson in the ratio of their ages. Gapson’s age is one and a half times that of Kontor, who is 20 years old. (Check the original paper: the printed text repeats the name Kontor here.) Kontor received Le 200,000. Find (i) the total amount shared; (ii) Gapson’s share.");
  T23("7(a)", "Simultaneous Equations", "The sum of three numbers is 81. The second number is twice the first and the third is 6 more than the second. Find the three numbers.");
  T23("7(b)", "Coordinate Geometry", "Given P(3, 5) and Q(−5, 7), R(x, y) is the midpoint of PQ. Find the equation of the line through R perpendicular to PQ.");
  T23("8", "Quadratic Equations", "Complete the table of values and draw the graph of y = 2x² − x − 4 for −3 ≤ x ≤ 3. Use your graph to find (i) the roots of the equation; (ii) the range of values of x for which y increases as x increases; (iii) the minimum point.");
  T23("9", "Statistics", "The table shows the heights (m) of trees in a forest: height 3, 4, 5, 6, 7, 8 with frequency 4, 6, 4, 5, 6, 2. Find (i) the median height; (ii) the mean; (iii) the standard deviation. (Give the mean and standard deviation correct to one decimal place.)");
  T23("10", "Bearings & Distances", "Chief X lives 60 m from the palace P on a bearing of 057°. Chief Y lives on a bearing of 150° from P, and X and Y are 180 m apart. Draw a diagram and find (i) the bearing of X from Y; (ii) the distance PY, correct to 3 significant figures.");
  T23("11(a)", "Plane Geometry & Polygons", "Regular polygons P and Q are such that P has twice as many sides as Q. The difference between the exterior angles of Q and P is 45°. Find the number of sides of P.");
  T23("11(b)", "Mensuration", "The area of a semicircle is 32π cm². Find, in terms of π, the perimeter of the semicircle.");
  T23("12(a)", "Circle Geometry", "P, Q, R and S are points on a circle with centre O. QR is parallel to OS, ∠QOR = 2m, ∠QPR = n and ∠SOR = 54°. Find m and n. (The original diagram is needed to confirm the layout.)", { flag: "This question needs the original diagram, which is not included here." });
  T23("12(b)", "Mensuration", "The length of a rectangle is 4 cm more than its width. Its perimeter is 40 cm. Find its area.");
  T23("13(a)", "Mensuration", "A sector of a circle has centre O and radius 7 m, with ∠MON = 60°. NT is perpendicular to OM, with N on the arc and T on OM. Find the area of the shaded region bounded by arc NM, NT and TM, correct to one decimal place. (π = 22/7)");
  T23("13(b)", "Coordinate Geometry", "The x- and y-intercepts of a straight line are −3/4 and 2/7 respectively. Find the equation of the line.");

  /* ---------- 2011 ---------- */
  pp("2011", "Paper 1", 1, "Objective", "Fractions, Decimals & Percentages", "A money lender collects $200 simple interest on a capital after 2 years at 5%. Calculate the capital invested.", { options: ["$1,000.00", "$2,000.00", "$3,000.00", "$4,000.00"], answer: 1, explanation: "I = PRT/100, so P = 100 × 200 ÷ (5 × 2) = $2,000.", quiz: true });
  pp("2011", "Paper 1", 2, "Objective", "Indices & Logarithms", "Simplify: log₁₀(2.25) + 4 log₁₀(2) − 2 log₁₀(0.6).", { options: ["1", "2", "3", "4"], answer: 1, explanation: "Combine the logs: log₁₀(2.25 × 2⁴ ÷ 0.6²) = log₁₀(2.25 × 16 ÷ 0.36) = log₁₀(100) = 2.", quiz: true });
  TH("2011", "1(a)", "Indices & Logarithms", "Find the value of x in the expression: 3^(2x+1) ÷ [3^(3x−4) × 3^(6−7x)] = 27^x.");
  TH("2011", "1(b)", "Indices & Logarithms", "Without using tables or a calculator, simplify: (1/3) log₅(125/8) − 2 log₅(2/5) + log₅(80/125). All logarithms are in base 10.");
  TH("2011", "2(a)", "Indices & Logarithms", "Solve the equations 8 = 2^(x+y) and 1 = 3^(x−y) simultaneously.");
  TH("2011", "2(b)", "Ratio & Proportion", "If (3x + 2y)/(5x − 4y) = 9/4, find the ratio x : y.");
  TH("2011", "3(a)", "Mensuration", "A cube of side 4 cm has the same volume as a cone with diameter 7 cm. Calculate, correct to the nearest cm, the height of the cone. Take π = 22/7.");
  TH("2011", "3(b)", "Mensuration", "In the diagram, O is the centre of the circle of radius 14 cm. If the length of the minor arc XY is 36 cm, calculate the area of the minor sector OXY. Take π = 22/7.", { diagram: "circle-arc" });

  /* ---------- 2013 ---------- */
  TH("2013", "1(a)", "Indices & Logarithms", "Evaluate: 6(1 − 7/16)^(−1/2) × 2^(−1).");
  TH("2013", "1(b)", "Plane Geometry & Polygons", "The interior angle of a regular polygon is 108° greater than the exterior angle. How many sides has the polygon?");
  TH("2013", "2(a)", "Mensuration", "The diagram shows a triangular prism with QR = MN = OP = 10 cm and NR = QM = 8 cm. If ∠RON = 90° and ∠RNO = 30°, calculate, correct to 3 significant figures, the volume of the prism.", { diagram: "prism" });
  TH("2013", "2(b)", "Trigonometry", "A bird on top of a tree sights a prey 18 m away on the same horizontal ground as the foot of the tree. If the height of the tree is 8 m, calculate, correct to the nearest degree, the angle of depression through which the bird sights the prey.");
  TH("2013", "3(a)", "Statistics", "The table gives the number of applicants (in thousands) for five university courses: Engineering 29, Medicine 42, Accountancy 85, Education 12, Economics 140. Draw a bar chart to illustrate the data.");

  /* ---------- 2014 ---------- */
  TH("2014", "1(b)", "Plane Geometry & Polygons", "(Not drawn to scale.) In the diagram, EF is parallel to AB. If ∠AEF = 3x°, ∠ABC = 120° and ∠CHG = 7x°, find ∠GHB. Use the official source page for the original diagram.", { answer: "75°", source: "https://www.waeconline.org.ng/e-learning/Mathematics/maths223mq1.html", sourceLabel: "Official WAEC 2014 question and diagram" });

  /* ---------- 2018 ---------- */
  TH("2018", 1, "Fractions, Decimals & Percentages", "A car was bought for ₦900,000. Its value fell by 30% in the first year, then by 22% of its value at the start of each following year. Find its value on 28 February 2018, to the nearest ₦100. (A faithful paraphrase of the official question.)", { answer: "₦299,000", source: "https://www.waeconline.org.ng/e-learning/Mathematics/maths227mq1.html", sourceLabel: "Official WAEC 2018 question and examiner solution" });

  window.PAST_PAPERS = L;

  /* Objective items that can be marked also go into the quiz bank. */
  L.forEach(function (p) {
    if (p.type === "Objective" && p.quiz && p.options) {
      window.QBANK.push({ id: "w" + p.id, subject: "Mathematics", level: "SS3", topic: p.topic, exam: "WAEC", year: p.year, q: p.prompt, options: p.options.slice(), answer: p.answer, explanation: p.explanation });
    }
  });
})();
