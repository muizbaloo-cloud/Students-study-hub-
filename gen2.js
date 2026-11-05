/* gen2.js (part 2 of 2): Physics, Chemistry, Computer Science, Economics, Geography generators and the public API.
   Needs gen.js to be loaded first. */
(function () {
  const { sup, sub, n2, gcd, frac, money, pad3, poly, cx, mulberry32, build, REG, reg } = window.__GEN;
  const P = "Physics", C = "Chemistry", K = "Computer Science", E = "Economics", G = "Geography";

  /* ===================== PHYSICS ===================== */
  reg(P, "Motion", "SS1", (ri, pick, b) => {
    const d = ri(2, 30) * 10, t = ri(2, 10), v = d / t;
    if (!Number.isInteger(v) && String(v).length > 6) return null;
    return b(`A car covers ${d} m in ${t} s at constant speed. Find its speed.`, n2(v) + " m/s", [n2(d * t) + " m/s", n2(t / d) + " m/s", n2(d + t) + " m/s"], `Speed = distance ÷ time = ${d}/${t} = ${n2(v)} m/s.`);
  });
  reg(P, "Motion", "SS1", (ri, pick, b) => {
    const kmh = pick([18, 36, 54, 72, 90, 108]), v = kmh * 1000 / 3600;
    return b(`Convert ${kmh} km/h to m/s.`, v + " m/s", [(kmh / 3.6 * 3.6 / 1.8) + " m/s", (kmh * 3.6) + " m/s", (kmh / 6) + " m/s", (v + 5) + " m/s"], `Divide km/h by 3.6: ${kmh} ÷ 3.6 = ${v} m/s.`);
  });
  reg(P, "Motion", "SS2", (ri, pick, b) => {
    const a = ri(2, 8) * 2, t = ri(2, 9);
    return b(`A body starts from rest and accelerates at ${a} m/s². How far does it travel in ${t} s?`, (a * t * t / 2) + " m", [(a * t * t) + " m", (a * t) + " m", (a * t / 2) + " m", (a * t * t / 4) + " m"], `s = ½at² = ½ × ${a} × ${t}² = ${a * t * t / 2} m.`);
  });
  reg(P, "Forces", "SS1", (ri, pick, b) => {
    const m = ri(2, 40), a = ri(2, 9);
    return b(`A force acts on a ${m} kg mass and produces an acceleration of ${a} m/s². Find the force.`, (m * a) + " N", [(m + a) + " N", n2(m / a) + " N", n2(a / m) + " N"], `F = ma = ${m} × ${a} = ${m * a} N.`);
  });
  reg(P, "Forces", "SS1", (ri, pick, b) => {
    const m = ri(2, 90);
    return b(`Find the weight of a ${m} kg object. (g = 10 m/s²)`, (m * 10) + " N", [m + " N", (m / 10) + " N", (m * 100) + " N", (m * 9) + " N"], `W = mg = ${m} × 10 = ${m * 10} N.`);
  });
  reg(P, "Work Energy & Power", "SS1", (ri, pick, b) => {
    const f = ri(2, 40), d = ri(2, 25), t = ri(2, 10);
    const w = ri(0, 2);
    if (w === 0) return b(`A force of ${f} N moves a body ${d} m in the direction of the force. Find the work done.`, (f * d) + " J", [(f + d) + " J", n2(f / d) + " J", (f * d * 2) + " J"], `Work = force × distance = ${f} × ${d} = ${f * d} J.`);
    if (w === 1) return b(`A machine does ${f * d * t} J of work in ${t} s. Find its power.`, (f * d) + " W", [(f * d * t * t) + " W", (f * d * t * t / 2) + " W", (f * d + t) + " W"], `Power = work ÷ time = ${f * d * t}/${t} = ${f * d} W.`);
    const v = ri(2, 12), m = ri(1, 10) * 2;
    return b(`Find the kinetic energy of a ${m} kg mass moving at ${v} m/s.`, (m * v * v / 2) + " J", [(m * v * v) + " J", (m * v / 2) + " J", (m * v) + " J"], `KE = ½mv² = ½ × ${m} × ${v}² = ${m * v * v / 2} J.`);
  });
  reg(P, "Work Energy & Power", "SS1", (ri, pick, b) => {
    const m = ri(2, 30), h = ri(2, 20);
    return b(`Find the potential energy gained by a ${m} kg mass raised through ${h} m. (g = 10 m/s²)`, (m * h * 10) + " J", [(m * h) + " J", (m * h * 5) + " J", (m * h * 100) + " J"], `PE = mgh = ${m} × 10 × ${h} = ${m * h * 10} J.`);
  });
  reg(P, "Pressure", "SS1", (ri, pick, b) => {
    const f = ri(2, 50) * 10, a = pick([2, 4, 5, 10, 20, 25]);
    return b(`A force of ${f} N acts on an area of ${a} m². Find the pressure.`, n2(f / a) + " Pa", [(f * a) + " Pa", n2(a / f) + " Pa", n2(f / a / 10) + " Pa"], `Pressure = force ÷ area = ${f}/${a} = ${n2(f / a)} Pa.`);
  });
  reg(P, "Pressure", "SS1", (ri, pick, b) => {
    const h = ri(2, 30);
    return b(`Find the pressure due to a column of water ${h} m deep. (Density of water = 1000 kg/m³, g = 10 m/s²)`, (h * 10000) + " Pa", [(h * 1000) + " Pa", (h * 100) + " Pa", (h * 100000) + " Pa"], `P = ρgh = 1000 × 10 × ${h} = ${h * 10000} Pa.`);
  });
  reg(P, "Heat", "SS1", (ri, pick, b) => {
    const m = ri(1, 8), dt = ri(5, 60);
    return b(`How much heat is needed to raise the temperature of ${m} kg of water by ${dt} °C? (Specific heat capacity of water = 4200 J/kg°C)`, (m * 4200 * dt) + " J", [(m * 420 * dt) + " J", (m * 4200 / dt) + " J", (4200 * dt) + " J"], `Q = mcΔθ = ${m} × 4200 × ${dt} = ${m * 4200 * dt} J.`);
  });
  reg(P, "Heat", "SS1", (ri, pick, b) => {
    const c = ri(0, 100);
    return b(`Convert ${c} °C to kelvin.`, (c + 273) + " K", [(c - 273) + " K", (c + 373) + " K", (c * 273) + " K"], `T(K) = θ(°C) + 273 = ${c + 273} K.`);
  });
  reg(P, "Gas Laws", "SS2", (ri, pick, b) => {
    const p2 = pick([2, 4, 5, 10]), v1 = ri(2, 10) * 10, p1 = p2 * ri(2, 4), v2 = p1 * v1 / p2;
    if (!Number.isInteger(v2)) return null;
    return b(`A gas has a volume of ${v1} cm³ at a pressure of ${p1} atm. What is its volume at ${p2} atm if the temperature is constant?`, v2 + " cm³", [(v1 * p2 / p1) + " cm³", (v1 + p1 - p2) + " cm³", (v1 * p1 * p2) + " cm³"], `Boyle's law: P₁V₁ = P₂V₂, so V₂ = ${p1} × ${v1} ÷ ${p2} = ${v2} cm³.`);
  });
  reg(P, "Gas Laws", "SS2", (ri, pick, b) => {
    const t1 = pick([200, 250, 300]), f = pick([2, 3]), v1 = ri(2, 10) * 10;
    return b(`A gas occupies ${v1} cm³ at ${t1} K. What volume does it occupy at ${t1 * f} K if the pressure is constant?`, (v1 * f) + " cm³", [(v1 / f) + " cm³", (v1 + f) + " cm³", (v1 * f * f) + " cm³"], `Charles' law: V₁/T₁ = V₂/T₂, so V₂ = ${v1} × ${t1 * f} ÷ ${t1} = ${v1 * f} cm³.`);
  });
  reg(P, "Electricity", "SS2", (ri, pick, b) => {
    const i = ri(1, 9), r = ri(2, 30), w = ri(0, 2);
    if (w === 0) return b(`A current of ${i} A flows through a ${r} Ω resistor. Find the potential difference across it.`, (i * r) + " V", [n2(r / i) + " V", (i + r) + " V", n2(i / r) + " V"], `V = IR = ${i} × ${r} = ${i * r} V.`);
    if (w === 1) return b(`A ${i * r} V supply drives a current through a ${r} Ω resistor. Find the current.`, i + " A", [(i * r * r) + " A", (i * r + r) + " A", n2(r / (i * r)) + " A"], `I = V/R = ${i * r}/${r} = ${i} A.`);
    return b(`An appliance draws ${i} A from a ${r * 10} V supply. Find its power.`, (i * r * 10) + " W", [n2(r * 10 / i) + " W", (i + r * 10) + " W", (i * r) + " W"], `P = IV = ${i} × ${r * 10} = ${i * r * 10} W.`);
  });
  reg(P, "Electricity", "SS2", (ri, pick, b) => {
    const pr = pick([[6, 3, 2], [12, 4, 3], [10, 10, 5], [6, 6, 3], [20, 5, 4], [30, 6, 5], [12, 6, 4], [15, 10, 6]]);
    return b(`Two resistors of ${pr[0]} Ω and ${pr[1]} Ω are connected in parallel. Find the total resistance.`, pr[2] + " Ω", [(pr[0] + pr[1]) + " Ω", (pr[0] * pr[1]) + " Ω", (pr[2] + 1) + " Ω"], `1/R = 1/${pr[0]} + 1/${pr[1]}, so R = (${pr[0]} × ${pr[1]})/(${pr[0]} + ${pr[1]}) = ${pr[2]} Ω.`);
  });
  reg(P, "Waves", "SS2", (ri, pick, b) => {
    const f = ri(2, 50) * 10, l = pick([0.5, 1, 2, 4, 0.2, 5]);
    return b(`A wave has a frequency of ${f} Hz and a wavelength of ${l} m. Find its speed.`, n2(f * l) + " m/s", [n2(f / l) + " m/s", n2(l / f) + " m/s", n2(f + l) + " m/s"], `v = fλ = ${f} × ${l} = ${n2(f * l)} m/s.`);
  });
  reg(P, "Waves", "SS2", (ri, pick, b) => {
    const f = pick([2, 4, 5, 8, 10, 20, 25, 50]);
    return b(`Find the period of a wave of frequency ${f} Hz.`, n2(1 / f) + " s", [f + " s", n2(f / 2) + " s", n2(1 / (f * 2)) + " s"], `T = 1/f = 1/${f} = ${n2(1 / f)} s.`);
  });
  reg(P, "Sound", "SS2", (ri, pick, b) => {
    const t = ri(1, 8) / 2 * 2, d = 340 * t / 2;
    return b(`An echo is heard ${t} s after a shout. If the speed of sound in air is 340 m/s, how far away is the reflecting surface?`, d + " m", [(340 * t) + " m", (340 * t / 4) + " m", (340 + t) + " m"], `The sound travels to the surface and back: distance = (340 × ${t}) ÷ 2 = ${d} m.`);
  });
  reg(P, "Light", "SS2", (ri, pick, b) => {
    const v = pick([2, 1.5, 2.5, 1.2]), n = 3 / v;
    return b(`The speed of light in a medium is ${v} × 10⁸ m/s. Find the refractive index of the medium. (Speed of light in a vacuum = 3 × 10⁸ m/s)`, n2(n), [n2(v), n2(n + 1), n2(v / 3), n2(3 * v)], `n = c ÷ v = 3/${v} = ${n2(n)}.`);
  });
  reg(P, "Radioactivity", "SS3", (ri, pick, b) => {
    const n = ri(2, 5), N = ri(1, 8) * 64;
    return b(`A radioactive sample has ${N} g of a nuclide. How much remains after ${n} half-lives?`, n2(N / Math.pow(2, n)) + " g", [n2(N / n) + " g", n2(N / (2 * n)) + " g", n2(N / Math.pow(2, n - 1)) + " g"], `Each half-life halves the amount: ${N} ÷ 2${sup(n)} = ${n2(N / Math.pow(2, n))} g.`);
  });
  reg(P, "Scalars & Vectors", "SS1", (ri, pick, b) => {
    const k = ri(1, 5), tr = pick([[3, 4, 5], [5, 12, 13], [8, 6, 10]]);
    return b(`Two perpendicular forces of ${tr[0] * k} N and ${tr[1] * k} N act on a body. Find the magnitude of the resultant.`, (tr[2] * k) + " N", [((tr[0] + tr[1]) * k) + " N", (tr[2] * k + 1) + " N", (Math.abs(tr[1] - tr[0]) * k) + " N"], `R = √(${tr[0] * k}² + ${tr[1] * k}²) = ${tr[2] * k} N.`);
  });
  reg(P, "Simple Machines", "SS1", (ri, pick, b) => {
    const e = ri(2, 20) * 5, ma = ri(2, 6), load = e * ma;
    return b(`A machine lifts a load of ${load} N with an effort of ${e} N. Find its mechanical advantage.`, ma, [n2(1 / ma), ma + 1, ma * 2, load - e], `MA = load ÷ effort = ${load}/${e} = ${ma}.`);
  });
  reg(P, "Simple Machines", "SS1", (ri, pick, b) => {
    const eff = pick([50, 60, 75, 80]), vr = ri(2, 5) * 5, ma = eff * vr / 100;
    if (!Number.isInteger(ma * 4)) return null;
    return b(`A machine has a mechanical advantage of ${n2(ma)} and a velocity ratio of ${vr}. Find its efficiency.`, eff + "%", [n2(vr / ma) + "%", (eff + 10) + "%", (eff - 10) + "%"], `Efficiency = MA/VR × 100% = ${n2(ma)}/${vr} × 100 = ${eff}%.`);
  });

  /* ===================== CHEMISTRY ===================== */
  const CMP = [["H₂O", 18, "H = 1, O = 16"], ["CO₂", 44, "C = 12, O = 16"], ["NaOH", 40, "Na = 23, O = 16, H = 1"], ["H₂SO₄", 98, "H = 1, S = 32, O = 16"], ["CaCO₃", 100, "Ca = 40, C = 12, O = 16"], ["NH₃", 17, "N = 14, H = 1"], ["CH₄", 16, "C = 12, H = 1"], ["HCl", 36.5, "H = 1, Cl = 35.5"], ["MgO", 40, "Mg = 24, O = 16"], ["KOH", 56, "K = 39, O = 16, H = 1"], ["Na₂CO₃", 106, "Na = 23, C = 12, O = 16"], ["HNO₃", 63, "H = 1, N = 14, O = 16"]];
  reg(C, "Chemical Formulae & Equations", "SS1", (ri, pick, b) => {
    const c = pick(CMP);
    return b(`Calculate the relative molecular mass of ${c[0]}. (${c[2]})`, n2(c[1]), [n2(c[1] + 2), n2(c[1] - 2), n2(c[1] * 2), n2(c[1] + 10)], `Add the atomic masses of all atoms in the formula: ${c[0]} = ${n2(c[1])}.`);
  });
  reg(C, "Mole Concept", "SS1", (ri, pick, b) => {
    const c = pick(CMP), n = pick([0.5, 1, 2, 3, 0.25, 4]);
    return b(`What is the mass of ${n} mole(s) of ${c[0]}? (${c[2]})`, n2(n * c[1]) + " g", [n2(c[1] / n) + " g", n2(c[1] + n) + " g", n2(n * c[1] * 2) + " g"], `Mass = moles × molar mass = ${n} × ${n2(c[1])} = ${n2(n * c[1])} g.`);
  });
  reg(C, "Mole Concept", "SS2", (ri, pick, b) => {
    const c = pick(CMP), n = pick([0.5, 1, 2, 3, 0.25, 4]), m = n * c[1];
    return b(`How many moles are present in ${n2(m)} g of ${c[0]}? (${c[2]})`, n2(n), [n2(m * c[1]), n2(n * 2), n2(n + 1), n2(n / 2)], `Moles = mass ÷ molar mass = ${n2(m)} ÷ ${n2(c[1])} = ${n2(n)}.`);
  });
  reg(C, "Mole Concept", "SS2", (ri, pick, b) => {
    const n = pick([0.5, 2, 3, 0.1, 0.25]);
    return b(`How many molecules are present in ${n} mole of a substance? (Avogadro constant = 6 × 10²³ mol⁻¹)`, n2(n * 6) + " × 10²³", [n2(n / 6) + " × 10²³", n2(n * 6) + " × 10²²", n2(n + 6) + " × 10²³"], `Number of molecules = moles × Avogadro constant = ${n} × 6 × 10²³ = ${n2(n * 6)} × 10²³.`);
  });
  reg(C, "Stoichiometry", "SS2", (ri, pick, b) => {
    const k = ri(1, 6);
    if (ri(0, 1)) { const m = 24 * k; return b(`2Mg + O₂ → 2MgO. What mass of magnesium oxide is formed when ${m} g of magnesium burns completely? (Mg = 24, O = 16)`, (40 * k) + " g", [(48 * k) + " g", (24 * k) + " g", (80 * k) + " g"], `2 mol Mg (48 g) gives 2 mol MgO (80 g). ${m} g Mg is ${k} × 24 g, giving ${40 * k} g MgO.`); }
    const m = 25 * k * 4;
    return b(`CaCO₃ → CaO + CO₂. What mass of carbon(IV) oxide is released when ${m} g of calcium carbonate decomposes completely? (Ca = 40, C = 12, O = 16)`, (44 * k) + " g", [(56 * k) + " g", (100 * k) + " g", (22 * k) + " g"], `100 g CaCO₃ gives 44 g CO₂, so ${m} g gives ${m / 100} × 44 = ${44 * k} g.`);
  });
  reg(C, "Stoichiometry", "SS3", (ri, pick, b) => {
    const n = pick([0.25, 0.5, 2, 3, 1.5]);
    return b(`What volume does ${n} mole of any gas occupy at s.t.p.? (Molar volume = 22.4 dm³)`, n2(n * 22.4) + " dm³", [n2(22.4 / n) + " dm³", n2(n * 22.4 * 2) + " dm³", n2(n + 22.4) + " dm³"], `Volume = moles × 22.4 = ${n} × 22.4 = ${n2(n * 22.4)} dm³.`);
  });
  reg(C, "Gas Laws", "SS2", (ri, pick, b) => {
    const p2 = pick([1, 2, 4, 5]), v1 = ri(2, 10) * 10, p1 = p2 * ri(2, 4), v2 = p1 * v1 / p2;
    return b(`A gas occupies ${v1} dm³ at ${p1} atm and constant temperature. What volume does it occupy at ${p2} atm?`, v2 + " dm³", [(v1 * p2 / p1) + " dm³", (v1 + p1 - p2) + " dm³", (v1 * p1 * p2) + " dm³"], `Boyle's law: P₁V₁ = P₂V₂, so V₂ = ${p1} × ${v1} ÷ ${p2} = ${v2} dm³.`);
  });
  reg(C, "Gas Laws", "SS2", (ri, pick, b) => {
    const t = ri(0, 100);
    return b(`Convert ${t} °C to kelvin.`, (t + 273) + " K", [(t - 273) + " K", (t + 373) + " K", (t * 273) + " K"], `T(K) = t(°C) + 273 = ${t + 273} K.`);
  });
  reg(C, "Acids Bases & Salts", "SS2", (ri, pick, b) => {
    const n = ri(1, 13), w = ri(0, 1);
    if (!w) return b(`Find the pH of a solution in which [H⁺] = 1 × 10⁻${n} mol/dm³.`, n, [14 - n, n + 1, n - 1 < 0 ? n + 2 : n - 1, -n], `pH = −log[H⁺] = ${n}.`);
    return b(`A solution has a pH of ${n}. What is its pOH at 25 °C?`, 14 - n, [n, 14 + n, 7 - n < 0 ? n + 7 : 7 - n], `pH + pOH = 14, so pOH = 14 − ${n} = ${14 - n}.`);
  });
  reg(C, "Acids Bases & Salts", "SS2", (ri, pick, b) => {
    const M1 = ri(1, 4) / 2, v1 = ri(2, 10) * 10, v2 = v1 * pick([2, 4, 5]);
    return b(`${v1} cm³ of ${M1} mol/dm³ acid is diluted to ${v2} cm³. Find the new concentration.`, n2(M1 * v1 / v2) + " mol/dm³", [n2(M1 * v2 / v1) + " mol/dm³", n2(M1) + " mol/dm³", n2(M1 + v1 / v2) + " mol/dm³"], `C₁V₁ = C₂V₂, so C₂ = ${M1} × ${v1} ÷ ${v2} = ${n2(M1 * v1 / v2)} mol/dm³.`);
  });
  reg(C, "Acids Bases & Salts", "SS2", (ri, pick, b) => {
    const m = ri(2, 12) * 5, v = pick([2, 4, 5, 10]);
    return b(`${m} g of a substance is dissolved in ${v} dm³ of solution. Find the concentration in g/dm³.`, n2(m / v) + " g/dm³", [n2(m * v) + " g/dm³", n2(v / m) + " g/dm³", n2(m + v) + " g/dm³"], `Concentration = mass ÷ volume = ${m}/${v} = ${n2(m / v)} g/dm³.`);
  });
  reg(C, "Atomic Structure", "SS1", (ri, pick, b) => {
    const z = ri(3, 30), a = z * 2 + ri(0, 6);
    return b(`An atom has atomic number ${z} and mass number ${a}. How many neutrons does it have?`, a - z, [a + z, z, a, a - z + 1], `Neutrons = mass number − atomic number = ${a} − ${z} = ${a - z}.`);
  });
  reg(C, "Atomic Structure", "SS1", (ri, pick, b) => {
    const z = ri(5, 30), c = ri(1, 3);
    return b(`An atom of atomic number ${z} loses ${c} electron${c > 1 ? "s" : ""} to form an ion. How many electrons does the ion have?`, z - c, [z + c, z, z - c - 1, c], `Losing ${c} electron${c > 1 ? "s" : ""}: ${z} − ${c} = ${z - c}.`);
  });
  reg(C, "Hydrocarbons", "SS3", (ri, pick, b) => {
    const n = ri(2, 10), k = ri(0, 2), nm = ["alkane", "alkene", "alkyne"][k], h = [2 * n + 2, 2 * n, 2 * n - 2][k];
    if (k === 2 && n < 2) return null;
    const f = (n, h) => "C" + sub(n) + "H" + sub(h);
    return b(`What is the molecular formula of the ${nm} with ${n} carbon atoms?`, f(n, h), [f(n, 2 * n + 2 - (k === 0 ? 2 : 0) + (k === 0 ? 0 : 0) === h ? 2 * n : 2 * n + 2), f(n, h + 2), f(n, h - 2 > 0 ? h - 2 : h + 4), f(n + 1, h)], `The general formula of ${nm}s is ${["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂"][k]}. For n = ${n}: ${f(n, h)}.`);
  });
  reg(C, "Oxidation & Reduction", "SS2", (ri, pick, b) => {
    const t = pick([["sulphur", "H₂SO₄", "+6"], ["manganese", "KMnO₄", "+7"], ["chromium", "K₂Cr₂O₇", "+6"], ["nitrogen", "HNO₃", "+5"], ["chlorine", "KClO₃", "+5"], ["nitrogen", "NH₃", "−3"], ["iron", "Fe₂O₃", "+3"], ["carbon", "CO₂", "+4"]]);
    return b(`What is the oxidation number of ${t[0]} in ${t[1]}?`, t[2], ["+6", "+7", "+5", "+3", "+4", "−3", "+2", "+1"].filter((x) => x !== t[2]).sort(() => 0.5 - Math.random()).slice(0, 5), `Using the rule that the oxidation numbers in a neutral compound add up to zero (H = +1, O = −2, K = +1), ${t[0]} in ${t[1]} is ${t[2]}.`);
  });
  reg(C, "Electrochemistry", "SS3", (ri, pick, b) => {
    const i = ri(1, 10), t = ri(2, 30) * 10;
    return b(`A current of ${i} A flows for ${t} s. How much charge passes?`, (i * t) + " C", [n2(t / i) + " C", (i + t) + " C", (i * t * 60) + " C"], `Q = It = ${i} × ${t} = ${i * t} C.`);
  });

  /* ===================== COMPUTER SCIENCE ===================== */
  reg(K, "Number Systems", "SS1", (ri, pick, b) => {
    const n = ri(5, 63), s = n.toString(2);
    return b(`Convert the binary number ${s} to decimal.`, n, [n + 1, n - 1, n + 2, n * 2], `Add the place values of the 1 bits: ${s} = ${n}.`);
  });
  reg(K, "Number Systems", "SS1", (ri, pick, b) => {
    const n = ri(5, 60), s = n.toString(2);
    return b(`Convert the decimal number ${n} to binary.`, s, [(n + 1).toString(2), (n - 1).toString(2), (n + 3).toString(2), (n * 2).toString(2)], `Divide by 2 repeatedly and read the remainders from the bottom up: ${s}.`);
  });
  reg(K, "Number Systems", "SS1", (ri, pick, b) => {
    const x = ri(1, 15), y = ri(1, 15), s = x + y;
    return b(`Add the binary numbers ${x.toString(2)} and ${y.toString(2)}.`, s.toString(2), [(s + 1).toString(2), (s - 1).toString(2), (x * y).toString(2), (s + 2).toString(2)], `${x} + ${y} = ${s}, which is ${s.toString(2)} in binary.`);
  });
  reg(K, "Data Representation", "SS1", (ri, pick, b) => {
    const n = ri(2, 10);
    if (ri(0, 1)) return b(`How many different values can be represented using ${n} bits?`, Math.pow(2, n), [n * 2, Math.pow(2, n) - 1, n * n, Math.pow(2, n + 1)], `With n bits there are 2ⁿ combinations: 2${sup(n)} = ${Math.pow(2, n)}.`);
    return b(`How many bits are there in ${n} bytes?`, n * 8, [n * 4, n * 10, n * 16, n + 8], `1 byte = 8 bits, so ${n} bytes = ${n * 8} bits.`);
  });
  reg(K, "Boolean Logic", "SS2", (ri, pick, b) => {
    const A = ri(0, 1), B = ri(0, 1), g = pick(["AND", "OR", "XOR", "NAND", "NOR"]);
    const f = { AND: A & B, OR: A | B, XOR: A ^ B, NAND: 1 - (A & B), NOR: 1 - (A | B) }[g];
    return b(`What is the output of an ${g} gate when A = ${A} and B = ${B}?`, f, [1 - f, "undefined", "A", "B"].slice(0, 2).concat(["2", "−1"]), `${g} with inputs ${A} and ${B} gives ${f}.`);
  });
  reg(K, "Programming", "SS2", (ri, pick, b) => {
    const a = ri(7, 60), d = ri(2, 9);
    if (ri(0, 1)) return b(`What is the value of ${a} MOD ${d}?`, a % d, [Math.floor(a / d), a % d + 1, a - d, (a % d) + d], `MOD gives the remainder when ${a} is divided by ${d}: ${a % d}.`);
    return b(`What is the value of ${a} DIV ${d}?`, Math.floor(a / d), [a % d, Math.floor(a / d) + 1, Math.floor(a / d) - 1 < 0 ? Math.floor(a / d) + 2 : Math.floor(a / d) - 1, a - d], `DIV gives the whole-number quotient of ${a} ÷ ${d}: ${Math.floor(a / d)}.`);
  });
  reg(K, "Algorithms", "SS2", (ri, pick, b) => {
    const a = ri(0, 10), d = ri(1, 6), n = ri(3, 8);
    return b(`What does this pseudocode print?\n  x ← ${a}\n  repeat ${n} times:\n      x ← x + ${d}\n  print x`, a + n * d, [a + (n - 1) * d, a + (n + 1) * d, n * d, a + n + d], `x starts at ${a} and ${d} is added ${n} times: ${a} + ${n} × ${d} = ${a + n * d}.`);
  });
  reg(K, "Spreadsheets", "SS1", (ri, pick, b) => {
    const v = [ri(2, 30), ri(2, 30), ri(2, 30), ri(2, 30)], f = pick(["SUM", "AVERAGE", "MAX", "MIN"]);
    const s = v.reduce((x, y) => x + y, 0), ans = { SUM: s, AVERAGE: s / 4, MAX: Math.max.apply(null, v), MIN: Math.min.apply(null, v) }[f];
    return b(`Cells A1 to A4 contain ${v.join(", ")}. What does =${f}(A1:A4) return?`, n2(ans), [n2(s), n2(s / 4), n2(Math.max.apply(null, v)), n2(Math.min.apply(null, v)), n2(s + 1)].filter((x) => x !== n2(ans)), `${f} of ${v.join(", ")} = ${n2(ans)}.`);
  });

  /* ===================== ECONOMICS ===================== */
  reg(E, "Cost & Revenue", "SS1", (ri, pick, b) => {
    const p = ri(2, 20) * 50, q = ri(2, 30), fc = ri(2, 20) * 100, vc = ri(1, 10) * 50 * q % 5000, tc = fc + vc, tr = p * q;
    const w = ri(0, 2);
    if (w === 0) return b(`A firm sells ${q} units at ${money(p)} each. Find its total revenue.`, money(tr), [money(p + q), money(p / q), money(tr + p)], `TR = price × quantity = ${money(p)} × ${q} = ${money(tr)}.`);
    if (w === 1) return b(`A firm has fixed costs of ${money(fc)} and variable costs of ${money(vc)}. Find its total cost.`, money(tc), [money(tc - fc), money(fc * vc), money(Math.abs(fc - vc))], `TC = FC + VC = ${money(fc)} + ${money(vc)} = ${money(tc)}.`);
    const prof = tr - tc;
    return b(`A firm's total revenue is ${money(tr)} and its total cost is ${money(tc)}. Find its profit or loss.`, (prof >= 0 ? "Profit of " : "Loss of ") + money(Math.abs(prof)), [(prof >= 0 ? "Loss of " : "Profit of ") + money(Math.abs(prof)), "Profit of " + money(tr + tc), "Break-even (no profit or loss)"], `Profit = TR − TC = ${money(tr)} − ${money(tc)} = ${prof >= 0 ? "" : "−"}${money(Math.abs(prof))}.`);
  });
  reg(E, "Cost & Revenue", "SS1", (ri, pick, b) => {
    const q = ri(2, 20), ac = ri(2, 20) * 10, tc = ac * q;
    return b(`The total cost of producing ${q} units is ${money(tc)}. Find the average cost per unit.`, money(ac), [money(tc * q), money(tc + q), money(ac + q)], `AC = TC ÷ Q = ${money(tc)} ÷ ${q} = ${money(ac)}.`);
  });
  reg(E, "Elasticity", "SS1", (ri, pick, b) => {
    const pp = pick([5, 10, 20]), pq = ri(1, 6) * 10 * 1, ped = pq / pp;
    const cls = ped > 1 ? "Elastic" : ped < 1 ? "Inelastic" : "Unitary elastic";
    return b(`When the price of a good rises by ${pp}%, the quantity demanded falls by ${pq}%. Calculate the price elasticity of demand (ignore the sign).`, n2(ped), [n2(pp / pq), n2(pp + pq), n2(pq - pp), n2(pp * pq / 10)], `PED = % change in quantity ÷ % change in price = ${pq}/${pp} = ${n2(ped)} (${cls.toLowerCase()}).`);
  });
  reg(E, "Demand & Supply", "SS1", (ri, pick, b) => {
    const P0 = ri(2, 10) * 10, bb = ri(1, 4), c = ri(1, 4), A = P0 * (bb + c);
    return b(`The demand function is Qd = ${A} − ${bb}P and the supply function is Qs = ${c}P, where P is price in naira. Find the equilibrium price.`, money(P0), [money(P0 + 10), money(P0 - 5 > 0 ? P0 - 5 : P0 + 20), money(A), money(c * P0)], `At equilibrium Qd = Qs: ${A} − ${bb}P = ${c}P, so ${A} = ${bb + c}P and P = ${P0}.`);
  });
  reg(E, "National Income", "SS3", (ri, pick, b) => {
    const c = ri(50, 90) * 10, i = ri(10, 30) * 10, g = ri(10, 30) * 10, x = ri(10, 30) * 10, m = ri(10, 30) * 10, gdp = c + i + g + x - m;
    return b(`Given consumption ${money(c)}m, investment ${money(i)}m, government spending ${money(g)}m, exports ${money(x)}m and imports ${money(m)}m, find GDP using the expenditure approach.`, money(gdp) + "m", [money(c + i + g + x + m) + "m", money(c + i + g) + "m", money(gdp + m) + "m"], `GDP = C + I + G + (X − M) = ${c} + ${i} + ${g} + (${x} − ${m}) = ${gdp}.`);
  });
  reg(E, "Inflation & Unemployment", "SS2", (ri, pick, b) => {
    const p1 = ri(2, 10) * 100, r = pick([5, 10, 15, 20, 25]), p2 = p1 * (100 + r) / 100;
    return b(`The price of a basket of goods rose from ${money(p1)} to ${money(p2)}. Find the rate of inflation.`, r + "%", [(r + 5) + "%", n2(100 * r / (100 + r)) + "%", (r * 2) + "%"], `Inflation rate = (${p2} − ${p1})/${p1} × 100 = ${r}%.`);
  });
  reg(E, "Population & Labour", "SS3", (ri, pick, b) => {
    const emp = ri(40, 90) * 10, un = pick([10, 20, 30, 40, 50, 60]) * 1, lf = emp + un, rate = un / lf * 100;
    return b(`In an economy, ${emp} thousand people are employed and ${un} thousand are unemployed but looking for work. Find the unemployment rate.`, n2(rate) + "%", [n2(un / emp * 100) + "%", n2(emp / lf * 100) + "%", n2(un) + "%"], `Labour force = ${emp} + ${un} = ${lf}. Unemployment rate = ${un}/${lf} × 100 = ${n2(rate)}%.`);
  });
  reg(E, "Public Finance", "SS2", (ri, pick, b) => {
    const p = ri(1, 25) * 200;
    return b(`Value Added Tax (VAT) in Nigeria is 7.5%. How much VAT is charged on goods priced at ${money(p)} before VAT?`, money(p * 0.075), [money(p * 0.75), money(p * 0.0075), money(p * 0.075 + p)], `VAT = 7.5% of ${money(p)} = 0.075 × ${p} = ${money(p * 0.075)}.`);
  });
  reg(E, "Money & Banking", "SS2", (ri, pick, b) => {
    const pr = ri(2, 20) * 1000, r = pick([5, 8, 10, 12]), t = ri(1, 5), I = pr * r * t / 100;
    return b(`Find the simple interest on ${money(pr)} at ${r}% per annum for ${t} year${t > 1 ? "s" : ""}.`, money(I), [money(I + pr), money(I / t), money(pr * r / 10)], `I = PRT/100 = ${pr} × ${r} × ${t} ÷ 100 = ${money(I)}.`);
  });
  reg(E, "International Trade", "SS2", (ri, pick, b) => {
    const x = ri(10, 90) * 10, m = ri(10, 90) * 10;
    if (x === m) return null;
    const bt = x - m;
    return b(`A country exports goods worth ${money(x)}m and imports goods worth ${money(m)}m. What is its balance of trade?`, (bt > 0 ? "Surplus of " : "Deficit of ") + money(Math.abs(bt)) + "m", [(bt > 0 ? "Deficit of " : "Surplus of ") + money(Math.abs(bt)) + "m", "Surplus of " + money(x + m) + "m", "Balanced (zero)"], `Balance of trade = exports − imports = ${x} − ${m} = ${bt}, a ${bt > 0 ? "surplus" : "deficit"}.`);
  });

  /* ===================== GEOGRAPHY ===================== */
  reg(G, "Scale & Bearings", "SS1", (ri, pick, b) => {
    const rf = pick([[25000, 0.25], [50000, 0.5], [100000, 1], [20000, 0.2]]), cm = ri(2, 20);
    return b(`A map has a scale of 1 : ${rf[0]}. A distance of ${cm} cm on the map represents what distance on the ground?`, n2(cm * rf[1]) + " km", [n2(cm * rf[1] * 10) + " km", n2(cm * rf[1] / 10) + " km", n2(cm / rf[1]) + " km"], `1 cm represents ${rf[0]} cm = ${n2(rf[1])} km. So ${cm} cm = ${cm} × ${n2(rf[1])} = ${n2(cm * rf[1])} km.`);
  });
  reg(G, "Latitude & Longitude", "SS1", (ri, pick, b) => {
    const lon = pick([15, 30, 45, 60, 75, 90]), dir = pick(["E", "W"]), h = (12 + (dir === "E" ? 1 : -1) * lon / 15 + 24) % 24;
    const tm = (x) => `${(x % 12) || 12}:00 ${x % 24 >= 12 ? "pm" : "am"}`;
    return b(`When it is 12 noon at Greenwich (0°), what is the local time at longitude ${lon}°${dir}?`, tm(h), [tm((h + 2) % 24), tm((24 + 12 + (dir === "E" ? -1 : 1) * lon / 15) % 24), tm((h + 1) % 24), tm((h + 23) % 24)], `The Earth turns 15° per hour. ${lon}° ÷ 15 = ${lon / 15} hours ${dir === "E" ? "ahead of (later than)" : "behind (earlier than)"} Greenwich, giving ${tm(h)}.`);
  });
  reg(G, "Population", "SS2", (ri, pick, b) => {
    const area = ri(2, 40) * 10, d = ri(2, 50) * 10, pop = area * d;
    return b(`A region has a population of ${pop.toLocaleString("en-US")} and an area of ${area} km². Find its population density.`, d + " persons per km²", [(pop + area) + " persons per km²", n2(area / pop) + " persons per km²", (d * 10) + " persons per km²"], `Density = population ÷ area = ${pop}/${area} = ${d} persons per km².`);
  });
  reg(G, "Population", "SS3", (ri, pick, b) => {
    const bi = ri(25, 45), de = ri(8, 20), nat = (bi - de) / 10;
    return b(`A country has a birth rate of ${bi} per 1000 and a death rate of ${de} per 1000. Find the natural increase as a percentage.`, n2(nat) + "%", [n2(nat * 10) + "%", n2((bi + de) / 10) + "%", n2(nat / 10) + "%"], `Natural increase = (${bi} − ${de}) per 1000 = ${bi - de} per 1000 = ${n2(nat)}%.`);
  });
  reg(G, "Map Interpretation", "SS3", (ri, pick, b) => {
    const h = pick([25, 40, 50, 100]), k = ri(2, 20), d = h * k;
    return b(`A road rises ${h} m over a horizontal distance of ${d} m. Express its gradient as 1 in n.`, "1 in " + k, ["1 in " + (k * 2), "1 in " + (k + h), "1 in " + h, "1 in " + (k + 1)], `Gradient = vertical rise : horizontal distance = ${h} : ${d} = 1 : ${k}.`);
  });
  reg(G, "Weather & Climate", "SS1", (ri, pick, b) => {
    const mx = ri(28, 40), mn = ri(15, 26);
    return b(`The highest temperature in a day is ${mx} °C and the lowest is ${mn} °C. Find the diurnal (daily) range of temperature.`, (mx - mn) + " °C", [((mx + mn) / 2) + " °C", (mx + mn) + " °C", (mx - mn + 2) + " °C"], `Range = maximum − minimum = ${mx} − ${mn} = ${mx - mn} °C.`);
  });
  reg(G, "Weather & Climate", "SS3", (ri, pick, b) => {
    const t0 = ri(24, 34), h = pick([1000, 2000, 3000, 4000]), t = t0 - 6.5 * h / 1000;
    return b(`The temperature at sea level is ${t0} °C. Using a lapse rate of 6.5 °C per 1000 m, find the temperature at a height of ${h} m.`, n2(t) + " °C", [n2(t0 + 6.5 * h / 1000) + " °C", n2(t0 - h / 1000) + " °C", n2(t0 - 6.5) + " °C", n2(t + 6.5) + " °C"], `Temperature falls by 6.5 °C for every 1000 m: ${t0} − 6.5 × ${h / 1000} = ${n2(t)} °C.`);
  });

  /* ---------- public API ---------- */
  const cache = {};
  const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
  window.generateBank = function (subject, perGenerator) {
    if (cache[subject]) return cache[subject];
    const out = [], seen = new Set(), tries = perGenerator || 10;
    REG.filter((g) => g.subject === subject).forEach((g, gi) => {
      let made = 0;
      for (let k = 0; k < tries * 3 && made < tries; k++) {
        const r = mulberry32(hash(subject + g.topic) + gi * 7919 + k * 104729 + 1);
        const ri = (a, b) => a + Math.floor(r() * (b - a + 1));
        const pick = (arr) => arr[Math.floor(r() * arr.length)];
        let q = null;
        try { q = g.fn(ri, pick, (qq, c, w, e) => build(r, qq, c, w, e), r); } catch (e) { q = null; }
        if (!q || seen.has(q.q)) continue;
        seen.add(q.q);
        made++;
        out.push(Object.assign({ id: "g" + out.length + "-" + hash(subject).toString(36), subject: subject, level: g.level, topic: g.topic, exam: "Practice", year: "", generated: true }, q));
      }
    });
    cache[subject] = out;
    return out;
  };
  window.GEN_COUNT = () => REG.length;
})();
